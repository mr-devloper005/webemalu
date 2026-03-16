import EditorToolbar from "@/components/EditorToolbar";
import { topics } from "@/data/articles";
import { useState, useRef, useEffect } from "react";
import { ImagePlus, X } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useArticles } from "@/contexts/ArticleContext";
import { toast } from "sonner";
import ImageWithFallback from "@/components/ImageWithFallback";

const Write = () => {
  const [title, setTitle] = useState("");
  const [contentHtml, setContentHtml] = useState("<p><br></p>");
  const [coverImage, setCoverImage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showTagPicker, setShowTagPicker] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const { currentUser } = useAuth();
  const { addArticle, updateArticle, getArticleById, deleteArticle } = useArticles();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : prev.length < 5 ? [...prev, tag] : prev
    );
  };

  // toolbar actions
  const applyMarkup = (label: string) => {
    const editor = contentRef.current;
    if (!editor) return;
    editor.focus();
    switch (label) {
      case "Bold":
        document.execCommand("bold");
        break;
      case "Italic":
        document.execCommand("italic");
        break;
      case "Underline":
        document.execCommand("underline");
        break;
      case "Strikethrough":
        document.execCommand("strikeThrough");
        break;
      case "Heading 1":
        document.execCommand("formatBlock", false, "h1");
        break;
      case "Heading 2":
        document.execCommand("formatBlock", false, "h2");
        break;
      case "Bullet List":
        document.execCommand("insertUnorderedList");
        break;
      case "Numbered List":
        document.execCommand("insertOrderedList");
        break;
      case "Quote":
        document.execCommand("formatBlock", false, "blockquote");
        break;
      case "Code":
        document.execCommand("insertHTML", false, `<code>${document.getSelection()?.toString() || "code"}</code>`);
        break;
      case "Link": {
        const url = prompt("Enter URL", "https://");
        if (url) document.execCommand("createLink", false, url);
        break;
      }
      case "Image": {
        const src = prompt("Image URL");
        if (src) document.execCommand("insertImage", false, src);
        break;
      }
      case "Divider":
        document.execCommand("insertHTML", false, "<hr />");
        break;
      default:
        break;
    }
    setContentHtml(editor.innerHTML);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // initialize if editing
  useEffect(() => {
    const editId = searchParams.get("edit");
    if (editId) {
      const art = getArticleById(editId);
      if (art) {
        setEditingId(editId);
        setTitle(art.title);
        setContentHtml(art.content || "");
        setCoverImage(art.coverImage);
        setSelectedTags(art.tags);
        if (contentRef.current) {
          contentRef.current.innerHTML = art.content || "";
        }
      }
    }
  }, [searchParams, getArticleById]);

  // whenever contentHtml updated programmatically update the div
  useEffect(() => {
    if (contentRef.current && document.activeElement !== contentRef.current) {
      contentRef.current.innerHTML = contentHtml || "";
    }
  }, [contentHtml]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") setCoverImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handlePublish = () => {
    if (!currentUser) {
      toast.error("You must be signed in to publish");
      navigate("/signin");
      return;
    }

    const text = contentRef.current?.innerText || "";
    if (!title.trim() || !text.trim()) {
      toast.error("Please add a title and some content before publishing.");
      return;
    }

    const wordCount = text.trim().split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));
    const articleBase = {
      title,
      subtitle: "",
      content: contentHtml,
      coverImage: coverImage || "https://via.placeholder.com/800x450?text=Cover",
      authorId: currentUser.id,
      publishedAt: new Date().toISOString(),
      readingTime,
      claps: editingId ? getArticleById(editingId)?.claps || 0 : 0,
      tags: selectedTags,
    };

    if (editingId) {
      const updated = { ...articleBase, id: editingId };
      updateArticle(updated);
      toast.success("Article updated!");
      navigate(`/article/${editingId}`);
    } else {
      const newArticle = { ...articleBase, id: `${Date.now()}` };
      addArticle(newArticle);
      toast.success("Article published!");
      navigate(`/article/${newArticle.id}`);
    }
    // ensure state reflects current html
    if (contentRef.current) {
      setContentHtml(contentRef.current.innerHTML);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-[720px] mx-auto px-4 sm:px-6 py-8"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-muted-foreground">{editingId ? "Edit post" : "Draft"}</span>
        <div className="flex items-center gap-2">
          {editingId && (
            <button
              onClick={() => {
                if (editingId && window.confirm("Delete this article?")) {
                  deleteArticle(editingId);
                  toast("Article deleted");
                  navigate("/");
                }
              }}
              className="px-4 py-1.5 bg-destructive text-destructive-foreground rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Delete
            </button>
          )}
          <button
            onClick={handlePublish}
            className="px-4 py-1.5 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
          >
            {editingId ? "Update" : "Publish"}
          </button>
        </div>
      </div>

      {/* Cover image */}
      <div className="mb-6">
        {coverImage && (
          <div className="relative mb-4">
            <ImageWithFallback src={coverImage} className="w-full rounded-sm" alt="cover preview" />
            <button
              onClick={() => setCoverImage("")}
              className="absolute top-2 right-2 p-1 bg-background/70 rounded-full text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        <button
          onClick={handleImageClick}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors border border-dashed rounded-lg px-4 py-8 w-full justify-center"
        >
          <ImagePlus className="w-5 h-5" />
          <span>{coverImage ? "Change cover image" : "Add a cover image"}</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Title */}
      <textarea
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full bg-transparent outline-none resize-none font-display text-3xl sm:text-4xl font-bold placeholder:text-muted-foreground/50 mb-4 leading-tight"
        rows={2}
      />

      {/* Toolbar */}
      <EditorToolbar onAction={applyMarkup} />

      {/* Content (rich text) */}
      <div
        ref={contentRef}
        role="textbox"
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => setContentHtml((e.target as HTMLDivElement).innerHTML)}
        className="w-full bg-transparent outline-none resize-none font-serif text-lg leading-[1.8] placeholder:text-muted-foreground/50 min-h-[400px] mt-4 prose prose-invert"
        dir="ltr"
        style={{ minHeight: "400px" }}
      />

      {/* Tags */}
      <div className="border-t pt-6 mt-6">
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <span className="text-sm font-medium">Tags:</span>
          {selectedTags.map((tag) => (
            <span key={tag} className="tag-badge flex items-center gap-1">
              {tag}
              <button onClick={() => toggleTag(tag)}>
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {selectedTags.length < 5 && (
            <button
              onClick={() => setShowTagPicker(!showTagPicker)}
              className="text-sm text-primary hover:underline"
            >
              + Add tag
            </button>
          )}
        </div>
        {showTagPicker && (
          <div className="flex flex-wrap gap-2 p-4 border rounded-lg">
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => toggleTag(topic)}
                className={`tag-badge text-xs ${selectedTags.includes(topic) ? "bg-primary text-primary-foreground" : ""}`}
              >
                {topic}
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Write;
