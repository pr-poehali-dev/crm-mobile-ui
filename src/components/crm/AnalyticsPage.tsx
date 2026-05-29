import Icon from "@/components/ui/icon";

const MONTHLY_DATA = [
  { month: "Янв", value: 65, amount: "1.3М" },
  { month: "Фев", value: 48, amount: "0.9М" },
  { month: "Мар", value: 72, amount: "1.5М" },
  { month: "Апр", value: 58, amount: "1.2М" },
  { month: "Май", value: 87, amount: "2.4М" },
];

const CHANNELS = [
  { name: "Входящие звонки", value: 35, color: "#8B5CF6" },
  { name: "Сайт / SEO", value: 28, color: "#06B6D4" },
  { name: "Рекомендации", value: 22, color: "#10B981" },
  { name: "Реклама", value: 15, color: "#F59E0B" },
];

const MANAGERS = [
  { name: "Александр К.", deals: 8, amount: "₽920К", percent: 92, color: "#8B5CF6" },
  { name: "Наталья П.", deals: 6, amount: "₽680К", percent: 68, color: "#06B6D4" },
  { name: "Игорь С.", deals: 5, amount: "₽540К", percent: 54, color: "#10B981" },
  { name: "Мария В.", deals: 5, amount: "₽480К", percent: 48, color: "#F59E0B" },
];

const maxVal = Math.max(...MONTHLY_DATA.map(d => d.value));

export default function AnalyticsPage() {
  return (
    <div className="px-4 space-y-4">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 animate-slide-up stagger-1">
        {[
          { label: "Выручка май", value: "₽2.4М", change: "+18%", up: true, gradient: "gradient-analytics", glow: "rgba(245,158,11,0.4)" },
          { label: "Конверсия", value: "24%", change: "+3%", up: true, gradient: "gradient-task", glow: "rgba(6,182,212,0.4)" },
          { label: "Средний чек", value: "₽320К", change: "-5%", up: false, gradient: "gradient-primary", glow: "rgba(139,92,246,0.4)" },
          { label: "Цикл сделки", value: "18 дней", change: "-2 дня", up: true, gradient: "gradient-deal", glow: "rgba(236,72,153,0.4)" },
        ].map((kpi) => (
          <div key={kpi.label} className="glass rounded-2xl p-4">
            <div className={`w-9 h-9 rounded-xl ${kpi.gradient} flex items-center justify-center mb-3`} style={{ boxShadow: `0 0 14px ${kpi.glow}` }}>
              <Icon name="TrendingUp" size={16} className="text-white" />
            </div>
            <div className="text-xl font-bold text-white mb-0.5" style={{ fontFamily: "'Golos Text', sans-serif" }}>{kpi.value}</div>
            <div className="text-white/40 text-xs">{kpi.label}</div>
            <div className={`text-xs font-semibold mt-1 ${kpi.up ? "text-green-400" : "text-red-400"}`}>
              {kpi.up ? "↑" : "↓"} {kpi.change}
            </div>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div className="glass rounded-2xl p-4 animate-slide-up stagger-2">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold" style={{ fontFamily: "'Golos Text', sans-serif" }}>Выручка по месяцам</h3>
          <span className="text-white/40 text-xs">2026</span>
        </div>
        <div className="flex items-end gap-2 h-28">
          {MONTHLY_DATA.map((d) => (
            <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-white/40 text-[10px]">{d.amount}</span>
              <div
                className="w-full rounded-t-lg relative overflow-hidden"
                style={{
                  height: `${(d.value / maxVal) * 80}px`,
                  background: d.month === "Май"
                    ? "linear-gradient(180deg, #8B5CF6, #06B6D4)"
                    : "rgba(255,255,255,0.08)",
                  boxShadow: d.month === "Май" ? "0 0 16px rgba(139,92,246,0.5)" : undefined,
                }}
              >
                {d.month === "Май" && (
                  <div className="absolute inset-0 shimmer" />
                )}
              </div>
              <span className={`text-[10px] font-medium ${d.month === "Май" ? "text-purple-400" : "text-white/30"}`}>{d.month}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
          <span className="text-white/40 text-xs">Цель: ₽2.8М</span>
          <div className="flex items-center gap-2">
            <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="progress-bar" style={{ width: "87%" }} />
            </div>
            <span className="text-white/60 text-xs font-medium">87%</span>
          </div>
        </div>
      </div>

      {/* Channels */}
      <div className="glass rounded-2xl p-4 animate-slide-up stagger-3">
        <h3 className="text-white font-semibold mb-4" style={{ fontFamily: "'Golos Text', sans-serif" }}>Источники лидов</h3>
        <div className="space-y-3">
          {CHANNELS.map((ch) => (
            <div key={ch.name}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-white/70 text-sm">{ch.name}</span>
                <span className="text-white font-semibold text-sm">{ch.value}%</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${ch.value}%`, background: ch.color, boxShadow: `0 0 8px ${ch.color}60` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Managers */}
      <div className="glass rounded-2xl p-4 animate-slide-up stagger-4">
        <h3 className="text-white font-semibold mb-4" style={{ fontFamily: "'Golos Text', sans-serif" }}>Рейтинг менеджеров</h3>
        <div className="space-y-3">
          {MANAGERS.map((m, i) => (
            <div key={m.name} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white/60" style={{ background: m.color + "25" }}>
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white/80 text-sm font-medium">{m.name}</span>
                  <span className="text-white font-semibold text-sm">{m.amount}</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${m.percent}%`, background: m.color }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
