import { useState } from "react";
import Icon from "@/components/ui/icon";
import RichEditor from "./RichEditor";

interface Props {
  onClose: () => void;
  onSave: (task: { title: string; desc: string; html: string; time: string; priority: string; tag: string }) => void;
}

const PRIORITIES = [
  { value: "high", label: "Срочный", color: "#F87171", glow: "rgba(248,113,113,0.4)" },
  { value: "medium", label: "Средний", color: "#FBBF24", glow: "rgba(251,191,36,0.4)" },
  { value: "low", label: "Обычный", color: "#34D399", glow: "rgba(52,211,153,0.4)" },
];

const TAGS = ["Продажи", "Встречи", "Документы", "CRM", "Отчёты", "Звонки"];

export default function NewTaskSheet({ onClose, onSave }: Props) {
  const [title, setTitle] = useState("");
  const [html, setHtml] = useState("");
  const [priority, setPriority] = useState("medium");
  const [tag, setTag] = useState("Продажи");
  const [deadline, setDeadline] = useState("");
  const [errors, setErrors] = useState<{ title?: boolean }>({});

  const handleSave = () => {
    if (!title.trim()) {
      setErrors({ title: true });
      return;
    }
    const plain = new DOMParser().parseFromString(html, "text/html").body.textContent || "";
    onSave({ title: title.trim(), desc: plain.slice(0, 80), html, time: deadline || "Без срока", priority, tag });
    onClose();
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Sheet */}
      <div
        className="absolute bottom-0 left-0 right-0 rounded-t-3xl overflow-hidden flex flex-col"
        style={{
          background: "hsl(225 18% 10%)",
          border: "1px solid rgba(255,255,255,0.1)",
          maxHeight: "92vh",
          animation: "slideUpSheet 0.35s cubic-bezier(0.16,1,0.3,1) forwards",
        }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 shrink-0">
          <h2 className="text-white font-bold text-lg" style={{ fontFamily: "'Golos Text', sans-serif" }}>
            Новая задача
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 glass rounded-xl flex items-center justify-center"
          >
            <Icon name="X" size={16} className="text-white/50" />
          </button>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto scrollbar-hide px-5 pb-4 space-y-4">
          {/* Title */}
          <div>
            <label className="text-white/50 text-xs font-medium mb-1.5 block">Название *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => { setTitle(e.target.value); setErrors({}); }}
              placeholder="Кратко опишите задачу..."
              className={`w-full glass rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm outline-none transition-all ${
                errors.title ? "ring-1 ring-red-500" : "focus:ring-1 focus:ring-purple-500/60"
              }`}
            />
            {errors.title && (
              <p className="text-red-400 text-xs mt-1">Укажите название задачи</p>
            )}
          </div>

          {/* Rich Description */}
          <div>
            <label className="text-white/50 text-xs font-medium mb-1.5 block">Описание</label>
            <RichEditor
              content={html}
              onChange={setHtml}
              placeholder="Подробное описание, ссылки, чек-лист..."
            />
          </div>

          {/* Priority */}
          <div>
            <label className="text-white/50 text-xs font-medium mb-2 block">Приоритет</label>
            <div className="flex gap-2">
              {PRIORITIES.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setPriority(p.value)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 ${
                    priority === p.value ? "scale-105" : "opacity-50"
                  }`}
                  style={
                    priority === p.value
                      ? { background: p.color + "25", border: `1.5px solid ${p.color}60`, color: p.color, boxShadow: `0 0 12px ${p.glow}` }
                      : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: p.color }
                  }
                >
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: p.color }} />
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tag */}
          <div>
            <label className="text-white/50 text-xs font-medium mb-2 block">Категория</label>
            <div className="flex gap-2 flex-wrap">
              {TAGS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTag(t)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    tag === t
                      ? "gradient-primary text-white neon-glow-purple"
                      : "glass text-white/50"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Deadline */}
          <div>
            <label className="text-white/50 text-xs font-medium mb-1.5 block">Срок выполнения</label>
            <div className="relative">
              <Icon name="Calendar" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="datetime-local"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full glass rounded-xl pl-10 pr-4 py-3 text-white/70 text-sm outline-none focus:ring-1 focus:ring-purple-500/60"
                style={{ colorScheme: "dark" }}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-5 pb-8 pt-3 flex gap-3 shrink-0 border-t border-white/10">
          <button
            onClick={onClose}
            className="flex-1 glass text-white/60 font-medium py-3.5 rounded-xl active:scale-95 transition-all"
          >
            Отмена
          </button>
          <button
            onClick={handleSave}
            className="flex-1 gradient-primary text-white font-semibold py-3.5 rounded-xl neon-glow-purple active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Icon name="Check" size={16} />
            Создать задачу
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideUpSheet {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .rich-editor .ProseMirror {
          outline: none;
          min-height: 120px;
          color: rgba(255,255,255,0.8);
        }
        .rich-editor .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          color: rgba(255,255,255,0.25);
          float: left;
          height: 0;
          pointer-events: none;
        }
        .rich-editor .ProseMirror strong { color: rgba(255,255,255,0.95); }
        .rich-editor .ProseMirror em { color: rgba(255,255,255,0.7); font-style: italic; }
        .rich-editor .ProseMirror h2 { font-size: 1rem; font-weight: 700; color: white; margin: 8px 0 4px; font-family: 'Golos Text', sans-serif; }
        .rich-editor .ProseMirror ul { list-style: disc; padding-left: 1.25rem; color: rgba(255,255,255,0.7); }
        .rich-editor .ProseMirror ol { list-style: decimal; padding-left: 1.25rem; color: rgba(255,255,255,0.7); }
        .rich-editor .ProseMirror li { margin: 2px 0; }
        .rich-editor .ProseMirror blockquote { border-left: 3px solid rgba(139,92,246,0.6); padding-left: 12px; color: rgba(255,255,255,0.5); font-style: italic; margin: 6px 0; }
        .rich-editor .ProseMirror code { background: rgba(139,92,246,0.15); border: 1px solid rgba(139,92,246,0.3); border-radius: 4px; padding: 1px 5px; font-size: 0.8em; color: #a78bfa; }
        .rich-editor .ProseMirror s { color: rgba(255,255,255,0.35); }
        .rich-editor .ProseMirror p { margin: 3px 0; line-height: 1.5; }
      `}</style>
    </div>
  );
}
