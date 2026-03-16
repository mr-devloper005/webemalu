import { Heart, MessageCircle, Bookmark, TrendingUp, Award, Eye } from "lucide-react";

interface ActivityItem {
  id: string;
  type: 'article' | 'clap' | 'comment' | 'bookmark' | 'milestone';
  title: string;
  description?: string;
  timestamp: string;
  metadata?: {
    views?: number;
    claps?: number;
    comments?: number;
  };
}

interface ActivityTimelineProps {
  activities: ActivityItem[];
}

const ActivityTimeline = ({ activities }: ActivityTimelineProps) => {
  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'article':
        return <TrendingUp className="w-4 h-4" />;
      case 'clap':
        return <Heart className="w-4 h-4" />;
      case 'comment':
        return <MessageCircle className="w-4 h-4" />;
      case 'bookmark':
        return <Bookmark className="w-4 h-4" />;
      case 'milestone':
        return <Award className="w-4 h-4" />;
      default:
        return <Eye className="w-4 h-4" />;
    }
  };

  const getActivityColor = (type: ActivityItem['type']) => {
    switch (type) {
      case 'article':
        return 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400';
      case 'clap':
        return 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400';
      case 'comment':
        return 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400';
      case 'bookmark':
        return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'milestone':
        return 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400';
      default:
        return 'bg-gray-100 text-gray-600 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (activities.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
          <Eye className="w-6 h-6 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground">No recent activity</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <div key={activity.id} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
              {getActivityIcon(activity.type)}
            </div>
            {index < activities.length - 1 && (
              <div className="w-0.5 h-8 bg-border mt-2"></div>
            )}
          </div>
          <div className="flex-1 pb-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <h4 className="font-medium text-sm">{activity.title}</h4>
                {activity.description && (
                  <p className="text-muted-foreground text-sm mt-1">{activity.description}</p>
                )}
                {activity.metadata && (
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    {activity.metadata.views !== undefined && (
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {activity.metadata.views.toLocaleString()}
                      </span>
                    )}
                    {activity.metadata.claps !== undefined && (
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {activity.metadata.claps.toLocaleString()}
                      </span>
                    )}
                    {activity.metadata.comments !== undefined && (
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        {activity.metadata.comments.toLocaleString()}
                      </span>
                    )}
                  </div>
                )}
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {formatTimestamp(activity.timestamp)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityTimeline;
