import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Icon from "@/components/ui/icon";

interface Props {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function RichEditor({ content, onChange, placeholder = "Опишите задачу..." }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder }),
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  if (!editor) return null;

  const ToolBtn = ({
    active,
    onClick,
    icon,
    title,
  }: {
    active?: boolean;
    onClick: () => void;
    icon: string;
    title: string;
  }) => (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => { e.preventDefault(); onClick(); }}
      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150 ${
        active ? "gradient-primary text-white" : "text-white/40 hover:text-white/80 hover:bg-white/10"
      }`}
    >
      <Icon name={icon} size={14} />
    </button>
  );

  return (
    <div className="glass rounded-xl overflow-hidden border border-white/10">
      {/* Toolbar */}
      <div className="flex items-center gap-1 px-2 py-2 border-b border-white/10 flex-wrap">
        <ToolBtn icon="Bold" title="Жирный" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()} />
        <ToolBtn icon="Italic" title="Курсив" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()} />
        <ToolBtn icon="Strikethrough" title="Зачеркнутый" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()} />
        <div className="w-px h-5 bg-white/15 mx-1" />
        <ToolBtn icon="Heading2" title="Заголовок" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} />
        <ToolBtn icon="List" title="Список" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()} />
        <ToolBtn icon="ListOrdered" title="Нумерованный список" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()} />
        <div className="w-px h-5 bg-white/15 mx-1" />
        <ToolBtn icon="Quote" title="Цитата" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()} />
        <ToolBtn icon="Code" title="Код" active={editor.isActive("code")} onClick={() => editor.chain().focus().toggleCode().run()} />
        <div className="w-px h-5 bg-white/15 mx-1" />
        <ToolBtn icon="Undo2" title="Отменить" onClick={() => editor.chain().focus().undo().run()} />
        <ToolBtn icon="Redo2" title="Повторить" onClick={() => editor.chain().focus().redo().run()} />
      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        className="rich-editor px-4 py-3 text-sm text-white/80 min-h-[120px] outline-none"
      />
    </div>
  );
}
