import { useState } from "react";
import Icon from "@/components/ui/icon";

const STAGES = ["Все", "Лид", "Переговоры", "Коммерческое", "Закрытие", "Выиграно"];

const DEALS = [
  { id: 1, company: "ООО Техпром", contact: "Дмитрий Иванов", amount: "₽450 000", stage: "Переговоры", stageIdx: 2, deadline: "15 июня", probability: 60, color: "#8B5CF6" },
  { id: 2, company: "ИП Сидоров А.В.", contact: "Алексей Сидоров", amount: "₽180 000", stage: "Коммерческое", stageIdx: 3, deadline: "20 июня", probability: 40, color: "#06B6D4" },
  { id: 3, company: "Альфа-строй", contact: "Марина Козлова", amount: "₽920 000", stage: "Закрытие", stageIdx: 4, deadline: "5 июня", probability: 85, color: "#10B981" },
  { id: 4, company: "Бета-технологии", contact: "Сергей Петров", amount: "₽230 000", stage: "Лид", stageIdx: 1, deadline: "30 июня", probability: 20, color: "#F59E0B" },
  { id: 5, company: "Гамма-групп", contact: "Ольга Смирнова", amount: "₽1 200 000", stage: "Выиграно", stageIdx: 5, deadline: "2 июня", probability: 100, color: "#34D399" },
];

export default function DealsPage() {
  const [filter, setFilter] = useState("Все");

  const filtered = filter === "Все" ? DEALS : DEALS.filter(d => d.stage === filter);
  const totalAmount = DEALS.reduce((s, d) => s + parseInt(d.amount.replace(/[^\d]/g, "")), 0);

  return (
    <div className="px-4">
      {/* Pipeline Summary */}
      <div className="glass rounded-2xl p-4 mb-4 animate-slide-up stagger-1">
        <div className="flex items-center justify-between mb-3">
          <span className="text-white/60 text-sm">Общая воронка</span>
          <span className="text-white font-bold text-lg" style={{ fontFamily: "'Golos Text', sans-serif" }}>
            ₽{(totalAmount / 1000000).toFixed(1)}М
          </span>
        </div>
        <div className="flex gap-1 h-2 rounded-full overflow-hidden">
          <div className="h-full rounded-full" style={{ width: "15%", background: "#F59E0B" }} />
          <div className="h-full rounded-full" style={{ width: "25%", background: "#8B5CF6" }} />
          <div className="h-full rounded-full" style={{ width: "20%", background: "#06B6D4" }} />
          <div className="h-full rounded-full" style={{ width: "20%", background: "#EC4899" }} />
          <div className="h-full rounded-full" style={{ width: "20%", background: "#10B981" }} />
        </div>
        <div className="flex items-center gap-4 mt-3">
          {["Лид", "Переговоры", "Закрытие", "Выиграно"].map((s, i) => (
            <div key={s} className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full" style={{ background: ["#F59E0B","#8B5CF6","#EC4899","#10B981"][i] }} />
              <span className="text-white/40 text-xs">{s}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stage Filters */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 mb-4 animate-slide-up stagger-2">
        {STAGES.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
              filter === s
                ? "gradient-deal text-white"
                : "glass text-white/50"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Deals List */}
      <div className="space-y-3">
        {filtered.map((deal, i) => (
          <div
            key={deal.id}
            className={`glass rounded-xl p-4 hover-lift animate-slide-up stagger-${Math.min(i + 3, 6)}`}
          >
            <div className="flex items-start gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0"
                style={{ background: deal.color + "25", border: `1.5px solid ${deal.color}50` }}
              >
                {deal.company[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-semibold text-sm">{deal.company}</div>
                <div className="text-white/40 text-xs">{deal.contact}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-white font-bold text-sm">{deal.amount}</div>
                <div className="text-white/40 text-xs">{deal.deadline}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded-full"
                    style={{ background: deal.color + "25", color: deal.color }}
                  >
                    {deal.stage}
                  </span>
                  <span className="text-white/50 text-xs">{deal.probability}%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${deal.probability}%`, background: deal.color }}
                  />
                </div>
              </div>
              <div className="flex gap-1 shrink-0">
                <button className="w-8 h-8 glass rounded-lg flex items-center justify-center">
                  <Icon name="Phone" size={14} className="text-white/50" />
                </button>
                <button className="w-8 h-8 glass rounded-lg flex items-center justify-center">
                  <Icon name="MessageCircle" size={14} className="text-white/50" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-4 w-full gradient-deal text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all" style={{ boxShadow: "0 0 20px rgba(236,72,153,0.3)" }}>
        <Icon name="Plus" size={18} />
        Новая сделка
      </button>
    </div>
  );
}
