import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, saveRegisteredUser, updateUserInStorage, getUserById } from "@/data/users";

interface AuthContextType {
  currentUser: User | null;
  signIn: (email: string, password: string) => boolean;
  signUp: (name: string, email: string, password: string) => boolean;
  signOut: () => void;
  updateProfile: (updates: Partial<User>) => void;
  toggleFollow: (userId: string) => void;
  isFollowing: (userId: string) => boolean;
  toggleMute: (userId: string) => void;
  isMuted: (userId: string) => boolean;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  signIn: () => false,
  signUp: () => false,
  signOut: () => {},
  updateProfile: () => {},
  toggleFollow: () => {},
  isFollowing: () => false,
  toggleMute: () => {},
  isMuted: () => false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [followingList, setFollowingList] = useState<string[]>([]);
  const [mutedList, setMutedList] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("webemalu_user");
    if (saved) {
      try {
        const user: User = JSON.parse(saved);
        setCurrentUser(user);
        // load follow list for this user
        const stored = localStorage.getItem(`webemalu_following_${user.id}`) || "[]";
        try {
          setFollowingList(JSON.parse(stored));
        } catch {
          setFollowingList([]);
        }
        // load muted list for this user
        const mutedStored = localStorage.getItem(`webemalu_muted_${user.id}`) || "[]";
        try {
          setMutedList(JSON.parse(mutedStored));
        } catch {
          setMutedList([]);
        }
      } catch {}
    }
  }, []);

  const signIn = (email: string, _password: string) => {
    // Look up in registered users
    const registered: User[] = JSON.parse(localStorage.getItem("webemalu_registered_users") || "[]");
    const username = email.split("@")[0].toLowerCase();
    const user = registered.find(
      (u) => u.username.toLowerCase() === username || u.name.toLowerCase().includes(username)
    );
    if (user) {
      setCurrentUser(user);
      localStorage.setItem("webemalu_user", JSON.stringify(user));
      // load follow list
      const stored = localStorage.getItem(`webemalu_following_${user.id}`) || "[]";
      try {
        setFollowingList(JSON.parse(stored));
      } catch {
        setFollowingList([]);
      }
      // load muted list
      const mutedStored = localStorage.getItem(`webemalu_muted_${user.id}`) || "[]";
      try {
        setMutedList(JSON.parse(mutedStored));
      } catch {
        setMutedList([]);
      }
      return true;
    }
    // No match found - create a new account on the fly for demo
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: username.charAt(0).toUpperCase() + username.slice(1),
      username,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=random&size=150`,
      bio: "New to Webemalu. Writing my first stories.",
      followers: 0,
      following: 0,
    };
    saveRegisteredUser(newUser);
    setCurrentUser(newUser);
    localStorage.setItem("webemalu_user", JSON.stringify(newUser));
    setFollowingList([]);
    setMutedList([]);
    return true;
  };

  const signUp = (name: string, email: string, _password: string) => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      username: email.split("@")[0],
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&size=150`,
      bio: "New to Webemalu. Writing my first stories.",
      followers: 0,
      following: 0,
    };
    saveRegisteredUser(newUser);
    setCurrentUser(newUser);
    localStorage.setItem("webemalu_user", JSON.stringify(newUser));
    return true;
  };

  const signOut = () => {
    setCurrentUser(null);
    setFollowingList([]);
    setMutedList([]);
    localStorage.removeItem("webemalu_user");
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updates };
    setCurrentUser(updated);
    localStorage.setItem("webemalu_user", JSON.stringify(updated));
    updateUserInStorage(updated);
  };

  const toggleFollow = (userId: string) => {
    if (!currentUser) return;
    const key = `webemalu_following_${currentUser.id}`;
    let list: string[] = [];
    try {
      list = JSON.parse(localStorage.getItem(key) || "[]");
    } catch {}

    const isFollowing = list.includes(userId);
    const updatedList = isFollowing ? list.filter((id) => id !== userId) : [...list, userId];
    localStorage.setItem(key, JSON.stringify(updatedList));
    setFollowingList(updatedList);

    // adjust counts
    const currentVersion = { ...currentUser };
    if (isFollowing) {
      currentVersion.following = Math.max(0, currentVersion.following - 1);
    } else {
      currentVersion.following = currentVersion.following + 1;
    }
    setCurrentUser(currentVersion);
    localStorage.setItem("webemalu_user", JSON.stringify(currentVersion));
    updateUserInStorage(currentVersion);

    const target = getUserById(userId);
    if (target) {
      const updatedTarget = { ...target };
      if (isFollowing) {
        updatedTarget.followers = Math.max(0, updatedTarget.followers - 1);
      } else {
        updatedTarget.followers = updatedTarget.followers + 1;
      }
      updateUserInStorage(updatedTarget);
    }
  };

  const isFollowing = (userId: string) => followingList.includes(userId);

  const toggleMute = (userId: string) => {
    if (!currentUser) return;
    const key = `webemalu_muted_${currentUser.id}`;
    let list: string[] = [];
    try {
      list = JSON.parse(localStorage.getItem(key) || "[]");
    } catch {}

    const isMuted = list.includes(userId);
    const updatedList = isMuted ? list.filter((id) => id !== userId) : [...list, userId];
    localStorage.setItem(key, JSON.stringify(updatedList));
    setMutedList(updatedList);
  };

  const isMuted = (userId: string) => mutedList.includes(userId);

  return (
    <AuthContext.Provider value={{
      currentUser,
      signIn,
      signUp,
      signOut,
      updateProfile,
      toggleFollow,
      isFollowing,
      toggleMute,
      isMuted,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
