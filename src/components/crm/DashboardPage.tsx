import Icon from "@/components/ui/icon";

type Tab = "home" | "tasks" | "deals" | "contacts" | "analytics" | "calendar" | "profile";

interface Props {
  onNavigate: (tab: Tab) => void;
}

const QUICK_STATS = [
  { label: "Сделки", value: "24", sub: "+3 сегодня", icon: "TrendingUp", gradient: "gradient-deal", glow: "rgba(236,72,153,0.4)" },
  { label: "Задачи", value: "12", sub: "5 срочных", icon: "CheckSquare", gradient: "gradient-task", glow: "rgba(6,182,212,0.4)" },
  { label: "Контакты", value: "186", sub: "+12 за неделю", icon: "Users", gradient: "gradient-primary", glow: "rgba(139,92,246,0.4)" },
  { label: "Выручка", value: "₽2.4М", sub: "план 87%", icon: "Wallet", gradient: "gradient-analytics", glow: "rgba(245,158,11,0.4)" },
];

const RECENT_DEALS = [
  { name: "ООО Техпром", stage: "Переговоры", amount: "₽450 000", color: "#8B5CF6", progress: 60 },
  { name: "ИП Сидоров", stage: "Коммерческое", amount: "₽180 000", color: "#06B6D4", progress: 40 },
  { name: "Альфа-строй", stage: "Закрытие", amount: "₽920 000", color: "#10B981", progress: 85 },
];

const URGENT_TASKS = [
  { title: "Отправить КП клиенту", time: "сегодня 15:00", priority: "high" },
  { title: "Встреча с Ивановым", time: "завтра 10:00", priority: "medium" },
  { title: "Согласовать договор", time: "31 мая", priority: "low" },
];

export default function DashboardPage({ onNavigate }: Props) {
  return (
    <div className="px-4 pb-4">
      {/* Greeting Banner */}
      <div className="relative glass rounded-2xl p-5 mb-5 overflow-hidden animate-slide-up stagger-1">
        <div className="absolute inset-0 gradient-primary opacity-10" />
        <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-purple-500/10 blur-2xl" />
        <div className="relative">
          <p className="text-white/60 text-sm mb-1">Добро пожаловать,</p>
          <h2 className="text-white text-2xl font-bold" style={{ fontFamily: "'Golos Text', sans-serif" }}>
            Александр 👋
          </h2>
          <p className="text-white/50 text-sm mt-2">У вас <span className="text-purple-400 font-semibold">5 новых событий</span> сегодня</p>
        </div>
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => onNavigate("tasks")}
            className="flex-1 gradient-primary text-white text-sm font-semibold py-2.5 rounded-xl neon-glow-purple transition-all active:scale-95"
          >
            Мои задачи
          </button>
          <button
            onClick={() => onNavigate("deals")}
            className="flex-1 glass text-white/80 text-sm font-medium py-2.5 rounded-xl transition-all active:scale-95"
          >
            Сделки
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {QUICK_STATS.map((stat, i) => (
          <div
            key={stat.label}
            className={`glass rounded-2xl p-4 hover-lift animate-slide-up stagger-${i + 2}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className={`w-10 h-10 rounded-xl ${stat.gradient} flex items-center justify-center`}
                style={{ boxShadow: `0 0 16px ${stat.glow}` }}
              >
                <Icon name={stat.icon} size={18} className="text-white" />
              </div>
              <Icon name="ArrowUpRight" size={14} className="text-white/30 mt-1" />
            </div>
            <div className="text-2xl font-bold text-white mb-0.5" style={{ fontFamily: "'Golos Text', sans-serif" }}>
              {stat.value}
            </div>
            <div className="text-xs text-white/40">{stat.label}</div>
            <div className="text-xs text-green-400 mt-1 font-medium">{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Recent Deals */}
      <div className="mb-5 animate-slide-up stagger-3">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-semibold" style={{ fontFamily: "'Golos Text', sans-serif" }}>Актуальные сделки</h3>
          <button onClick={() => onNavigate("deals")} className="text-purple-400 text-xs font-medium">Все →</button>
        </div>
        <div className="space-y-2">
          {RECENT_DEALS.map((deal) => (
            <div key={deal.name} className="glass rounded-xl p-3.5 hover-lift">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs"
                    style={{ background: deal.color + "30", border: `1px solid ${deal.color}50` }}
                  >
                    {deal.name[0]}
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">{deal.name}</div>
                    <div className="text-white/40 text-xs">{deal.stage}</div>
                  </div>
                </div>
                <span className="text-white font-semibold text-sm">{deal.amount}</span>
              </div>
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${deal.progress}%`, background: deal.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Urgent Tasks */}
      <div className="animate-slide-up stagger-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-semibold" style={{ fontFamily: "'Golos Text', sans-serif" }}>Срочные задачи</h3>
          <button onClick={() => onNavigate("tasks")} className="text-purple-400 text-xs font-medium">Все →</button>
        </div>
        <div className="space-y-2">
          {URGENT_TASKS.map((task) => (
            <div key={task.title} className="glass rounded-xl p-3.5 flex items-center gap-3 hover-lift">
              <div className={`w-2 h-2 rounded-full shrink-0 ${
                task.priority === "high" ? "bg-red-400" :
                task.priority === "medium" ? "bg-amber-400" : "bg-green-400"
              }`} style={{ boxShadow: task.priority === "high" ? "0 0 8px rgba(248,113,113,0.8)" : undefined }} />
              <div className="flex-1 min-w-0">
                <div className="text-white text-sm font-medium truncate">{task.title}</div>
                <div className="text-white/40 text-xs">{task.time}</div>
              </div>
              <button className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center shrink-0">
                <Icon name="Check" size={12} className="text-white/40" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
