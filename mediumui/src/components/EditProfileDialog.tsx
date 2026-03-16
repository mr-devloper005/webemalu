import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Settings, Camera } from "lucide-react";
import { toast } from "sonner";
import ImageWithFallback from "@/components/ImageWithFallback";

const EditProfileDialog = () => {
  const { currentUser, updateProfile } = useAuth();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(currentUser?.name || "");
  const [bio, setBio] = useState(currentUser?.bio || "");
  const [avatar, setAvatar] = useState(currentUser?.avatar || "");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    updateProfile({ name: name.trim(), bio: bio.trim(), avatar: avatar.trim() || currentUser?.avatar });
    toast.success("Profile updated!");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => {
      setOpen(o);
      if (o && currentUser) {
        setName(currentUser.name);
        setBio(currentUser.bio);
        setAvatar(currentUser.avatar);
      }
    }}>
      <DialogTrigger asChild>
        <button className="px-5 py-2 border rounded-full text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
          <Settings className="w-4 h-4" />
          Edit profile
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">Edit Profile</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-4">
            <label className="relative cursor-pointer">
              <ImageWithFallback
                src={avatar || currentUser?.avatar}
                alt=""
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="absolute bottom-0 right-0 bg-background rounded-full p-1">
                <Camera className="w-4 h-4 text-muted-foreground" />
              </div>
              <input
                type="file"
                accept="image/*"
                aria-label="Upload avatar"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileChange}
              />
            </label>
            <div className="flex-1">
              <label htmlFor="avatar-url-input" className="text-sm font-medium mb-1.5 block">Avatar URL</label>
              <input
                id="avatar-url-input"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="https://..."
              />
            </div>
          </div>
          <div>
            <label htmlFor="name-input" className="text-sm font-medium mb-1.5 block">Name</label>
            <input
              id="name-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
          <div>
            <label htmlFor="bio-input" className="text-sm font-medium mb-1.5 block">Bio</label>
            <textarea
              id="bio-input"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 rounded-lg border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={() => setOpen(false)} className="px-4 py-2 rounded-full text-sm text-muted-foreground hover:text-foreground transition-colors">
              Cancel
            </button>
            <button onClick={handleSave} className="px-5 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
              Save
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
