import { User } from "@/data/users";
import EditProfileDialog from "@/components/EditProfileDialog";
import { useAuth } from "@/contexts/AuthContext";
import ImageWithFallback from "@/components/ImageWithFallback";
import { Calendar, MapPin, Link2, Badge } from "lucide-react";

interface ProfileHeaderProps {
  user: User;
  isOwnProfile?: boolean;
  isFollowing?: boolean;
  onToggleFollow?: () => void;
  joinDate?: string;
  location?: string;
  website?: string;
  articlesCount?: number;
  totalViews?: number;
  totalClaps?: number;
}

const ProfileHeader = ({ 
  user, 
  isOwnProfile, 
  isFollowing, 
  onToggleFollow,
  joinDate = "January 2024",
  location = "San Francisco, CA",
  website = "",
  articlesCount = 0,
  totalViews = 0,
  totalClaps = 0
}: ProfileHeaderProps) => {
  const { updateProfile } = useAuth();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          updateProfile({ avatar: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Cover Image and Profile Picture */}
      <div className="relative">
        <div className="h-32 sm:h-48 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-lg"></div>
        <div className="px-4 sm:px-6 -mt-12 sm:-mt-16">
          <div className="relative">
            <ImageWithFallback
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-background ring-4 ring-ring/20"
            />
            {isOwnProfile && (
              <div className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full cursor-pointer hover:opacity-90 transition-opacity">
                <input
                  type="file"
                  accept="image/*"
                  aria-label="Upload avatar on page"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                />
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="px-4 sm:px-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="space-y-2">
            <h1 className="font-display text-3xl sm:text-4xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
              {user.bio}
            </p>
            
            {/* Additional Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{location}</span>
                </div>
              )}
              {website && (
                <a 
                  href={website.startsWith('http') ? website : `https://${website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-primary transition-colors"
                >
                  <Link2 className="w-4 h-4" />
                  <span>{website.replace(/^https?:\/\//, '')}</span>
                </a>
              )}
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Joined {joinDate}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            {isOwnProfile ? (
              <EditProfileDialog />
            ) : (
              <>
                <button
                  onClick={onToggleFollow}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                    isFollowing 
                      ? "bg-secondary text-foreground hover:bg-secondary/80" 
                      : "bg-primary text-primary-foreground hover:opacity-90"
                  }`}
                >
                  {isFollowing ? "Following" : "Follow"}
                </button>
                <button className="px-6 py-2.5 border rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors">
                  Subscribe
                </button>
              </>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{user.followers.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{user.following.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Following</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{articlesCount.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Articles</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{totalClaps.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Total Claps</div>
          </div>
        </div>

        {/* Achievement Badges */}
        {isOwnProfile && (
          <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg border border-primary/20">
            <Badge className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Top Writer</span> in Technology • 
              <span className="font-medium text-foreground"> Rising Star</span> • 
              <span className="font-medium text-foreground"> 100+ Followers</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
