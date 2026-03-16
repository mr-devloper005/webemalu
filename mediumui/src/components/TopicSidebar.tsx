import { Link } from "react-router-dom";
import { topics } from "@/data/articles";
import { seedUsers } from "@/data/users";
import ImageWithFallback from "@/components/ImageWithFallback";

const TopicSidebar = () => {
  const trendingTopics = topics.slice(0, 7);
  const recommendedAuthors = seedUsers.slice(0, 3);

  return (
    <aside className="space-y-8">
      {/* Trending Topics */}
      <div>
        <h3 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">
          Discover more of what matters to you
        </h3>
        <div className="flex flex-wrap gap-2">
          {trendingTopics.map((topic) => (
            <Link key={topic} to={`/topics?t=${topic}`} className="tag-badge">
              {topic}
            </Link>
          ))}
        </div>
      </div>

      {/* Recommended Authors */}
      <div>
        <h3 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">
          Who to follow
        </h3>
        <div className="space-y-4">
          {recommendedAuthors.map((author) => (
            <Link
              key={author.id}
              to={`/profile/${author.id}`}
              className="flex items-start gap-3 group"
            >
              <ImageWithFallback
                src={author.avatar}
                alt={author.name}
                className="w-9 h-9 rounded-full object-cover flex-shrink-0"
              />
              <div className="min-w-0">
                <p className="font-medium text-sm group-hover:text-primary transition-colors">
                  {author.name}
                </p>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                  {author.bio}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default TopicSidebar;
