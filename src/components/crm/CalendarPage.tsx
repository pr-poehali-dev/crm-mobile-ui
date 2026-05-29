import { useState } from "react";
import Icon from "@/components/ui/icon";

const DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const DATES = [
  { d: 26, cur: false }, { d: 27, cur: false }, { d: 28, cur: false }, { d: 29, cur: true },
  { d: 30, cur: false }, { d: 31, cur: false }, { d: 1, cur: false, next: true },
  { d: 2, cur: false, next: true }, { d: 3, cur: false, next: true }, { d: 4, cur: false, next: true },
  { d: 5, cur: false, next: true }, { d: 6, cur: false, next: true }, { d: 7, cur: false, next: true },
  { d: 8, cur: false, next: true },
];

const EVENTS = [
  { id: 1, time: "09:00", duration: "1 ч", title: "Созвон с командой", type: "meeting", color: "#8B5CF6", participants: 4 },
  { id: 2, time: "11:30", duration: "30 мин", title: "Демо для ООО Техпром", type: "demo", color: "#06B6D4", participants: 2 },
  { id: 3, time: "14:00", duration: "2 ч", title: "Переговоры Альфа-строй", type: "nego", color: "#10B981", participants: 3 },
  { id: 4, time: "16:30", duration: "45 мин", title: "Отчёт по KPI за май", type: "report", color: "#F59E0B", participants: 1 },
  { id: 5, time: "18:00", duration: "1 ч", title: "Планёрка отдела продаж", type: "meeting", color: "#EC4899", participants: 6 },
];

const UPCOMING = [
  { date: "30 мая", title: "Подписание договора", company: "Гамма-групп", color: "#10B981" },
  { date: "2 июня", title: "Презентация продукта", company: "Бета-технологии", color: "#8B5CF6" },
  { date: "5 июня", title: "Квартальный обзор", company: "Внутреннее", color: "#06B6D4" },
];

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(29);

  return (
    <div className="px-4 space-y-4">
      {/* Month Header */}
      <div className="flex items-center justify-between animate-slide-up stagger-1">
        <h2 className="text-white text-xl font-bold" style={{ fontFamily: "'Golos Text', sans-serif" }}>
          Май 2026
        </h2>
        <div className="flex gap-2">
          <button className="w-8 h-8 glass rounded-lg flex items-center justify-center">
            <Icon name="ChevronLeft" size={16} className="text-white/60" />
          </button>
          <button className="w-8 h-8 glass rounded-lg flex items-center justify-center">
            <Icon name="ChevronRight" size={16} className="text-white/60" />
          </button>
        </div>
      </div>

      {/* Week Calendar */}
      <div className="glass rounded-2xl p-4 animate-slide-up stagger-2">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAYS.map(d => (
            <div key={d} className="text-center text-white/30 text-xs font-medium py-1">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {DATES.map(({ d, cur, next }) => (
            <button
              key={`${d}-${next}`}
              onClick={() => setSelectedDate(d)}
              className={`
                relative aspect-square rounded-xl flex flex-col items-center justify-center text-sm font-medium transition-all duration-200
                ${selectedDate === d && !next ? "gradient-calendar text-white neon-glow-purple scale-110" : ""}
                ${cur && selectedDate !== d ? "text-white ring-1 ring-purple-500/50" : ""}
                ${next ? "text-white/20" : selectedDate !== d ? "text-white/70" : ""}
                ${selectedDate !== d ? "hover:bg-white/10" : ""}
              `}
              style={selectedDate === d && !next ? { boxShadow: "0 0 16px rgba(139,92,246,0.5)" } : {}}
            >
              {d}
              {[29, 30, 2, 5].includes(d) && selectedDate !== d && (
                <div className="absolute bottom-1 w-1 h-1 rounded-full bg-purple-400" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Today's Events */}
      <div className="animate-slide-up stagger-3">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-semibold" style={{ fontFamily: "'Golos Text', sans-serif" }}>
            События на {selectedDate} мая
          </h3>
          <span className="text-white/40 text-xs">{EVENTS.length} событий</span>
        </div>

        <div className="space-y-2">
          {EVENTS.map((event) => (
            <div key={event.id} className="glass rounded-xl p-3.5 flex items-center gap-3 hover-lift">
              <div className="flex flex-col items-center shrink-0 w-12">
                <span className="text-white font-semibold text-sm">{event.time}</span>
                <span className="text-white/30 text-xs">{event.duration}</span>
              </div>
              <div
                className="w-0.5 self-stretch rounded-full shrink-0"
                style={{ background: event.color, boxShadow: `0 0 8px ${event.color}60` }}
              />
              <div className="flex-1 min-w-0">
                <div className="text-white text-sm font-medium">{event.title}</div>
                <div className="flex items-center gap-2 mt-1">
                  <Icon name="Users" size={11} className="text-white/30" />
                  <span className="text-white/30 text-xs">{event.participants} участника</span>
                </div>
              </div>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: event.color + "20" }}
              >
                <Icon name={
                  event.type === "meeting" ? "Video" :
                  event.type === "demo" ? "Monitor" :
                  event.type === "nego" ? "Handshake" : "FileText"
                } size={14} style={{ color: event.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming */}
      <div className="animate-slide-up stagger-4">
        <h3 className="text-white font-semibold mb-3" style={{ fontFamily: "'Golos Text', sans-serif" }}>Ближайшие события</h3>
        <div className="space-y-2">
          {UPCOMING.map((ev) => (
            <div key={ev.title} className="glass rounded-xl p-3.5 flex items-center gap-3 hover-lift">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: ev.color + "20", border: `1px solid ${ev.color}40` }}
              >
                <Icon name="CalendarDays" size={16} style={{ color: ev.color }} />
              </div>
              <div className="flex-1">
                <div className="text-white text-sm font-medium">{ev.title}</div>
                <div className="text-white/40 text-xs">{ev.company}</div>
              </div>
              <span className="text-white/40 text-xs shrink-0">{ev.date}</span>
            </div>
          ))}
        </div>
      </div>

      <button className="w-full gradient-calendar text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all" style={{ boxShadow: "0 0 20px rgba(139,92,246,0.3)" }}>
        <Icon name="Plus" size={18} />
        Новое событие
      </button>
    </div>
  );
}
