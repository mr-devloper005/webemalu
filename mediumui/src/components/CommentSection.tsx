import { comments as initialComments, Comment } from "@/data/comments";
import { getUserById } from "@/data/users";
import { useAuth } from "@/contexts/AuthContext";
import { Heart, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import ImageWithFallback from "@/components/ImageWithFallback";

interface CommentSectionProps {
  articleId: string;
}

const CommentSection = ({ articleId }: CommentSectionProps) => {
  const { currentUser } = useAuth();
  const [comments, setComments] = useState<Comment[]>(
    initialComments.filter((c) => c.articleId === articleId)
  );
  const [newComment, setNewComment] = useState("");
  const [likedComments, setLikedComments] = useState<string[]>([]);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  // load liked comments for current user
  useEffect(() => {
    if (currentUser) {
      const key = `medium_liked_comments_${currentUser.id}`;
      try {
        const list: string[] = JSON.parse(localStorage.getItem(key) || "[]");
        setLikedComments(list);
      } catch {
        setLikedComments([]);
      }
    } else {
      setLikedComments([]);
    }
  }, [currentUser]);

  const handleSubmit = (parentId?: string) => {
    if (!currentUser) {
      toast.error("Please sign in to comment");
      return;
    }
    const text = parentId ? replyText : newComment;
    if (!text.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }
    const comment: Comment = {
      id: `c-${Date.now()}`,
      articleId,
      userId: currentUser.id,
      content: text.trim(),
      createdAt: new Date().toISOString(),
      claps: 0,
      parentId,
    };
    setComments((prev) => [comment, ...prev]);
    if (parentId) {
      setReplyText("");
      setReplyingTo(null);
    } else {
      setNewComment("");
    }
    toast.success("Comment posted!");
  };

  const handleStartEdit = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditText(comment.content);
  };

  const cancelEdit = () => {
    setEditingCommentId(null);
    setEditText("");
  };

  const submitEdit = () => {
    if (!editText.trim() || !editingCommentId) {
      toast.error("Comment cannot be empty");
      return;
    }
    setComments((prev) =>
      prev.map((c) =>
        c.id === editingCommentId ? { ...c, content: editText } : c
      )
    );
    cancelEdit();
    toast.success("Comment updated");
  };

  const deleteComment = (commentId: string) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    setComments((prev) =>
      prev.filter((c) => c.id !== commentId && c.parentId !== commentId)
    );
    // cancel editing if we're deleting the one being edited
    if (editingCommentId === commentId) {
      cancelEdit();
    }
    // also remove from likedComments if present
    setLikedComments((prev) => prev.filter((id) => id !== commentId));
    toast("Comment deleted");
  };

  const toggleCommentClap = (commentId: string) => {
    if (!currentUser) return;
    const key = `medium_liked_comments_${currentUser.id}`;
    let list: string[] = [];
    try {
      list = JSON.parse(localStorage.getItem(key) || "[]");
    } catch {}
    const already = list.includes(commentId);
    const updatedList = already ? list.filter((i) => i !== commentId) : [...list, commentId];
    localStorage.setItem(key, JSON.stringify(updatedList));
    setLikedComments(updatedList);
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId ? { ...c, claps: c.claps + (already ? -1 : 1) } : c
      )
    );
  };

  return (
    <div className="space-y-6">
      <h3 className="font-display font-bold text-xl">
        Responses ({comments.length})
      </h3>

      <div className="border rounded-lg p-4">
        {currentUser ? (
          <div className="flex items-start gap-3">
            <ImageWithFallback src={currentUser.avatar} alt={currentUser.name} className="w-8 h-8 rounded-full object-cover" />
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="What are your thoughts?"
                className="w-full bg-transparent border-none outline-none resize-none text-sm placeholder:text-muted-foreground min-h-[60px]"
              />
              <div className="flex justify-end pt-2 border-t">
                <button onClick={handleSubmit} className="px-4 py-1.5 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
                  Respond
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground mb-2">Sign in to join the conversation</p>
            <Link to="/signin" className="text-primary text-sm font-medium hover:underline">Sign in</Link>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {comments
          .filter((c) => !c.parentId)
          .map((comment) => {
            const user = currentUser?.id === comment.userId
              ? currentUser
              : getUserById(comment.userId);
            if (!user) return null;
            const date = new Date(comment.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });
            const replies = comments.filter((c) => c.parentId === comment.id);
            return (
              <div key={comment.id} className="border-b pb-5">
              <div className="flex items-center gap-2 mb-2">
                <ImageWithFallback src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full object-cover" />
                <span className="text-sm font-medium">{user.name}</span>
                <span className="text-xs text-muted-foreground">{date}</span>
              </div>
              {editingCommentId === comment.id ? (
              <div className="mb-3">
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="w-full bg-transparent border border-muted-foreground rounded-md p-2 text-sm resize-none"
                  rows={3}
                />
                <div className="flex gap-2 mt-2">
                  <button onClick={submitEdit} className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-medium hover:opacity-90 transition-opacity">Save</button>
                  <button onClick={cancelEdit} className="px-3 py-1 bg-secondary text-foreground rounded-full text-xs font-medium hover:opacity-90 transition-opacity">Cancel</button>
                </div>
              </div>
            ) : (
              <p className="text-sm leading-relaxed mb-3">{comment.content}</p>
            )}
              <div className="flex flex-col">
            <div className="flex items-center gap-4 text-muted-foreground">
              <button
                onClick={() => toggleCommentClap(comment.id)}
                className={`flex items-center gap-1 text-xs transition-colors ${likedComments.includes(comment.id) ? "text-primary" : "hover:text-primary"}`}
              >
                <Heart className="w-3.5 h-3.5" fill={likedComments.includes(comment.id) ? "currentColor" : "none"} />
                <span>{comment.claps}</span>
              </button>
              <button
                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                className="flex items-center gap-1 text-xs hover:text-primary transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Reply</span>
              </button>
              {currentUser && currentUser.id === comment.userId && (
                <>
                  <button
                    onClick={() => handleStartEdit(comment)}
                    className="text-xs hover:text-primary transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteComment(comment.id)}
                    className="text-xs text-destructive hover:underline"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
            {replyingTo === comment.id && (
              <div className="mt-2 ml-6">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a reply..."
                  className="w-full bg-transparent border border-muted-foreground rounded-md p-2 text-sm resize-none"
                  rows={2}
                />
                <div className="flex justify-end mt-1">
                  <button
                    onClick={() => handleSubmit(comment.id)}
                    className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-medium hover:opacity-90 transition-opacity"
                  >
                    Post reply
                  </button>
                </div>
              </div>
            )}
          </div>
            {replies.length > 0 && (
              <div className="mt-4 ml-6 space-y-4">
                {replies.map((rep) => {
                  const rUser = currentUser?.id === rep.userId ? currentUser : getUserById(rep.userId);
                  if (!rUser) return null;
                  const rDate = new Date(rep.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" });
                  return (
                    <div key={rep.id} className="border-b pb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <ImageWithFallback src={rUser.avatar} alt={rUser.name} className="w-6 h-6 rounded-full object-cover" />
                        <span className="text-sm font-medium">{rUser.name}</span>
                        <span className="text-xs text-muted-foreground">{rDate}</span>
                      </div>
                      {editingCommentId === rep.id ? (
                    <div className="mb-2">
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full bg-transparent border border-muted-foreground rounded-md p-2 text-sm resize-none"
                        rows={2}
                      />
                      <div className="flex gap-2 mt-1">
                        <button onClick={submitEdit} className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-medium hover:opacity-90 transition-opacity">Save</button>
                        <button onClick={cancelEdit} className="px-3 py-1 bg-secondary text-foreground rounded-full text-xs font-medium hover:opacity-90 transition-opacity">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm leading-relaxed mb-2">{rep.content}</p>
                  )}
                      <div className="flex items-center gap-4 text-muted-foreground">
                        <button
                          onClick={() => toggleCommentClap(rep.id)}
                          className={`flex items-center gap-1 text-xs transition-colors ${likedComments.includes(rep.id) ? "text-primary" : "hover:text-primary"}`}
                        >
                          <Heart className="w-3.5 h-3.5" fill={likedComments.includes(rep.id) ? "currentColor" : "none"} />
                          <span>{rep.claps}</span>
                        </button>
                        {currentUser && currentUser.id === rep.userId && (
                          <>
                            <button
                              onClick={() => handleStartEdit(rep)}
                              className="text-xs hover:text-primary transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteComment(rep.id)}
                              className="text-xs text-destructive hover:underline"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommentSection;
