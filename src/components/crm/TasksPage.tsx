import { useState } from "react";
import Icon from "@/components/ui/icon";
import NewTaskSheet from "./NewTaskSheet";

const FILTERS = ["Все", "Срочные", "Сегодня", "Завтра", "Завершены"];

const TASKS = [
  { id: 1, title: "Отправить коммерческое предложение", desc: "ООО Техпром — ждут до 15:00", time: "Сегодня 15:00", priority: "high", done: false, tag: "Продажи" },
  { id: 2, title: "Провести демо-встречу с клиентом", desc: "Zoom-звонок, подготовить презентацию", time: "Сегодня 16:30", priority: "high", done: false, tag: "Встречи" },
  { id: 3, title: "Согласовать договор с юристом", desc: "Договор поставки на ₽450 000", time: "Завтра 10:00", priority: "medium", done: false, tag: "Документы" },
  { id: 4, title: "Обновить базу контактов", desc: "Добавить 12 новых лидов с выставки", time: "31 мая", priority: "low", done: false, tag: "CRM" },
  { id: 5, title: "Подготовить отчёт за май", desc: "Сводка по продажам для директора", time: "31 мая", priority: "medium", done: false, tag: "Отчёты" },
  { id: 6, title: "Позвонить Петрову", desc: "Уточнить статус оплаты счёта", time: "Вчера", priority: "low", done: true, tag: "Звонки" },
];

const TAG_COLORS: Record<string, string> = {
  "Продажи": "rgba(139,92,246,0.2)",
  "Встречи": "rgba(6,182,212,0.2)",
  "Документы": "rgba(245,158,11,0.2)",
  "CRM": "rgba(236,72,153,0.2)",
  "Отчёты": "rgba(16,185,129,0.2)",
  "Звонки": "rgba(99,102,241,0.2)",
};

const PRIORITY_COLOR: Record<string, string> = {
  high: "#F87171",
  medium: "#FBBF24",
  low: "#34D399",
};

export default function TasksPage() {
  const [filter, setFilter] = useState("Все");
  const [tasks, setTasks] = useState(TASKS);
  const [showNewTask, setShowNewTask] = useState(false);

  const toggle = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const handleSave = (task: { title: string; desc: string; html: string; time: string; priority: string; tag: string }) => {
    setTasks(prev => [
      { id: Date.now(), ...task, done: false },
      ...prev,
    ]);
  };

  return (
    <div className="px-4">
      {/* Summary */}
      <div className="glass rounded-2xl p-4 mb-4 flex items-center gap-4 animate-slide-up stagger-1">
        <div className="flex-1 text-center border-r border-white/10">
          <div className="text-2xl font-bold text-white" style={{ fontFamily: "'Golos Text', sans-serif" }}>12</div>
          <div className="text-white/40 text-xs mt-0.5">Активных</div>
        </div>
        <div className="flex-1 text-center border-r border-white/10">
          <div className="text-2xl font-bold text-red-400" style={{ fontFamily: "'Golos Text', sans-serif" }}>5</div>
          <div className="text-white/40 text-xs mt-0.5">Срочных</div>
        </div>
        <div className="flex-1 text-center">
          <div className="text-2xl font-bold text-green-400" style={{ fontFamily: "'Golos Text', sans-serif" }}>8</div>
          <div className="text-white/40 text-xs mt-0.5">Выполнено</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 mb-4 animate-slide-up stagger-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
              filter === f
                ? "gradient-primary text-white neon-glow-purple"
                : "glass text-white/50"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-2">
        {tasks.map((task, i) => (
          <div
            key={task.id}
            className={`glass rounded-xl p-4 hover-lift animate-slide-up stagger-${Math.min(i + 3, 6)} transition-opacity duration-300 ${task.done ? "opacity-50" : ""}`}
          >
            <div className="flex items-start gap-3">
              <button
                onClick={() => toggle(task.id)}
                className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${
                  task.done
                    ? "bg-green-500 border-green-500"
                    : "border-white/30"
                }`}
              >
                {task.done && <Icon name="Check" size={11} className="text-white" />}
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-sm font-medium ${task.done ? "line-through text-white/40" : "text-white"}`}
                  >
                    {task.title}
                  </span>
                </div>
                <p className="text-white/40 text-xs mb-2">{task.desc}</p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: PRIORITY_COLOR[task.priority], boxShadow: `0 0 6px ${PRIORITY_COLOR[task.priority]}80` }}
                    />
                    <span className="text-white/30 text-xs">{task.time}</span>
                  </div>
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-medium text-white/70"
                    style={{ background: TAG_COLORS[task.tag] || "rgba(255,255,255,0.1)" }}
                  >
                    {task.tag}
                  </span>
                </div>
              </div>
              <button className="text-white/20 hover:text-white/60 transition-colors ml-1">
                <Icon name="MoreVertical" size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Button */}
      <button
        onClick={() => setShowNewTask(true)}
        className="mt-4 w-full gradient-primary text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 neon-glow-purple active:scale-95 transition-all"
      >
        <Icon name="Plus" size={18} />
        Новая задача
      </button>

      {showNewTask && (
        <NewTaskSheet
          onClose={() => setShowNewTask(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}