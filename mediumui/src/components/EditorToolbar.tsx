import {
  Bold, Italic, Underline, Strikethrough, List, ListOrdered,
  Quote, Code, Image, Link as LinkIcon, Heading1, Heading2, Minus
} from "lucide-react";

const tools = [
  { icon: Bold, label: "Bold" },
  { icon: Italic, label: "Italic" },
  { icon: Underline, label: "Underline" },
  { icon: Strikethrough, label: "Strikethrough" },
  { divider: true },
  { icon: Heading1, label: "Heading 1" },
  { icon: Heading2, label: "Heading 2" },
  { divider: true },
  { icon: List, label: "Bullet List" },
  { icon: ListOrdered, label: "Numbered List" },
  { icon: Quote, label: "Quote" },
  { icon: Code, label: "Code" },
  { divider: true },
  { icon: LinkIcon, label: "Link" },
  { icon: Image, label: "Image" },
  { icon: Minus, label: "Divider" },
];

interface EditorToolbarProps {
  onAction?: (label: string) => void;
}

const EditorToolbar = ({ onAction }: EditorToolbarProps) => {
  return (
    <div className="flex items-center gap-0.5 px-2 py-1.5 border-b bg-surface-elevated overflow-x-auto">
      {tools.map((tool, i) =>
        "divider" in tool ? (
          <div key={i} className="w-px h-5 bg-border mx-1" />
        ) : (
          <button
            key={i}
            title={tool.label}
            onClick={() => onAction && onAction(tool.label)}
            className="p-2 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            type="button"
          >
            {tool.icon && <tool.icon className="w-4 h-4" />}
          </button>
        )
      )}
    </div>
  );
};

export default EditorToolbar;
