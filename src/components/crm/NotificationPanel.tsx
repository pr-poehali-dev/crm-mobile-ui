import Icon from "@/components/ui/icon";

interface Props {
  onClose: () => void;
}

const NOTIFICATIONS = [
  { id: 1, type: "deal", icon: "TrendingUp", color: "#8B5CF6", title: "Сделка перешла на этап «Закрытие»", desc: "Альфа-строй · ₽920 000", time: "5 мин назад", unread: true },
  { id: 2, type: "task", icon: "Clock", color: "#F87171", title: "Дедлайн через 1 час!", desc: "Отправить КП клиенту · ООО Техпром", time: "10 мин назад", unread: true },
  { id: 3, type: "contact", icon: "UserPlus", color: "#06B6D4", title: "Новый лид добавлен", desc: "Сергей Петров · Бета-технологии", time: "32 мин назад", unread: true },
  { id: 4, type: "deal", icon: "DollarSign", color: "#10B981", title: "Сделка выиграна! 🎉", desc: "Гамма-групп · ₽1 200 000", time: "2 часа назад", unread: false },
  { id: 5, type: "task", icon: "CheckCircle", color: "#34D399", title: "Задача выполнена", desc: "Позвонить Петрову — завершена", time: "3 часа назад", unread: false },
  { id: 6, type: "system", icon: "Bell", color: "#F59E0B", title: "Еженедельный отчёт готов", desc: "Итоги 23–29 мая — откройте аналитику", time: "Вчера", unread: false },
];

export default function NotificationPanel({ onClose }: Props) {
  const unreadCount = NOTIFICATIONS.filter(n => n.unread).length;

  return (
    <div className="absolute inset-0 z-50 flex flex-col animate-slide-up">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" onClick={onClose} />
      <div className="relative flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <h2 className="text-white font-bold text-lg" style={{ fontFamily: "'Golos Text', sans-serif" }}>
              Уведомления
            </h2>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-purple-500/30 text-purple-400 text-xs font-bold">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button className="text-white/40 text-xs hover:text-white/70 transition-colors">
              Прочитать все
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 glass rounded-xl flex items-center justify-center"
            >
              <Icon name="X" size={16} className="text-white/60" />
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-3 space-y-2">
          {NOTIFICATIONS.map((n, i) => (
            <div
              key={n.id}
              className={`rounded-xl p-3.5 flex items-start gap-3 hover-lift transition-all ${
                n.unread ? "glass-strong" : "glass opacity-70"
              }`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: n.color + "20", border: `1px solid ${n.color}30` }}
              >
                <Icon name={n.icon} size={16} style={{ color: n.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={`text-sm font-medium leading-tight ${n.unread ? "text-white" : "text-white/60"}`}>
                    {n.title}
                  </p>
                  {n.unread && (
                    <div className="w-2 h-2 rounded-full bg-purple-400 shrink-0 mt-1" style={{ boxShadow: "0 0 8px rgba(167,139,250,0.8)" }} />
                  )}
                </div>
                <p className="text-white/40 text-xs mt-0.5 truncate">{n.desc}</p>
                <p className="text-white/25 text-xs mt-1">{n.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-white/10">
          <button className="w-full glass text-white/50 text-sm py-3 rounded-xl">
            Настройки уведомлений
          </button>
        </div>
      </div>
    </div>
  );
}
