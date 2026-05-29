import { useState } from "react";
import Icon from "@/components/ui/icon";

const STATS = [
  { label: "Сделок", value: "47", color: "#8B5CF6" },
  { label: "Выиграно", value: "31", color: "#10B981" },
  { label: "В работе", value: "16", color: "#06B6D4" },
];

const SETTINGS = [
  { icon: "User", label: "Личные данные", desc: "Имя, должность, контакты" },
  { icon: "Bell", label: "Уведомления", desc: "Push, email, звонки", badge: "3" },
  { icon: "Shield", label: "Безопасность", desc: "Пароль, 2FA" },
  { icon: "Palette", label: "Оформление", desc: "Тема, язык" },
  { icon: "Link", label: "Интеграции", desc: "Email, Telegram, телефония" },
  { icon: "HelpCircle", label: "Поддержка", desc: "FAQ, написать нам" },
];

const NOTIFICATIONS_CONFIG = [
  { label: "Дедлайны задач", desc: "За 1 час до срока", enabled: true },
  { label: "Новые лиды", desc: "При поступлении", enabled: true },
  { label: "Обновления сделок", desc: "При смене этапа", enabled: true },
  { label: "Отчёты", desc: "Еженедельно по пятницам", enabled: false },
  { label: "Активность команды", desc: "Изменения и комментарии", enabled: false },
];

export default function ProfilePage() {
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifs, setNotifs] = useState(NOTIFICATIONS_CONFIG);

  const toggleNotif = (i: number) => {
    setNotifs(notifs.map((n, idx) => idx === i ? { ...n, enabled: !n.enabled } : n));
  };

  if (notifOpen) {
    return (
      <div className="px-4 animate-slide-up">
        <button
          onClick={() => setNotifOpen(false)}
          className="flex items-center gap-2 text-white/60 text-sm mb-4"
        >
          <Icon name="ChevronLeft" size={18} />
          Назад
        </button>
        <h2 className="text-white font-bold text-xl mb-5" style={{ fontFamily: "'Golos Text', sans-serif" }}>
          Push-уведомления
        </h2>
        <div className="glass rounded-2xl overflow-hidden divide-y divide-white/5">
          {notifs.map((n, i) => (
            <div key={n.label} className="flex items-center gap-3 p-4">
              <div className="flex-1">
                <div className="text-white text-sm font-medium">{n.label}</div>
                <div className="text-white/40 text-xs">{n.desc}</div>
              </div>
              <button
                onClick={() => toggleNotif(i)}
                className={`relative w-11 h-6 rounded-full transition-all duration-300 shrink-0 ${
                  n.enabled ? "gradient-primary" : "bg-white/10"
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${
                    n.enabled ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
        <p className="text-white/30 text-xs text-center mt-4 px-4">
          Уведомления приходят на ваш телефон и на email
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 space-y-4">
      {/* Avatar & Info */}
      <div className="glass rounded-2xl p-5 animate-slide-up stagger-1">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center neon-glow-purple">
              <span className="text-white font-bold text-xl">АК</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-400 border-2 border-background" style={{ boxShadow: "0 0 8px rgba(52,211,153,0.8)" }} />
          </div>
          <div className="flex-1">
            <h2 className="text-white font-bold text-lg" style={{ fontFamily: "'Golos Text', sans-serif" }}>Александр Кузнецов</h2>
            <p className="text-white/50 text-sm">Руководитель отдела продаж</p>
            <p className="text-white/30 text-xs">a.kuznetsov@company.ru</p>
          </div>
          <button className="w-9 h-9 glass rounded-xl flex items-center justify-center">
            <Icon name="Edit2" size={15} className="text-white/50" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {STATS.map((s) => (
            <div key={s.label} className="glass rounded-xl py-3 text-center">
              <div className="font-bold text-lg" style={{ color: s.color, fontFamily: "'Golos Text', sans-serif" }}>{s.value}</div>
              <div className="text-white/40 text-xs">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="glass rounded-2xl p-4 animate-slide-up stagger-2">
        <h3 className="text-white font-semibold mb-3" style={{ fontFamily: "'Golos Text', sans-serif" }}>Достижения</h3>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
          {[
            { emoji: "🏆", label: "Лучший месяц", sub: "Май 2026" },
            { emoji: "⚡", label: "Быстрый старт", sub: "30 сделок" },
            { emoji: "🎯", label: "Снайпер", sub: "85% побед" },
            { emoji: "🚀", label: "Рекорд", sub: "₽2.4М/мес" },
          ].map((a) => (
            <div key={a.label} className="shrink-0 glass rounded-xl p-3 text-center w-20">
              <div className="text-2xl mb-1">{a.emoji}</div>
              <div className="text-white/70 text-xs font-medium leading-tight">{a.label}</div>
              <div className="text-white/30 text-xs">{a.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="glass rounded-2xl overflow-hidden divide-y divide-white/5 animate-slide-up stagger-3">
        {SETTINGS.map((s) => (
          <button
            key={s.label}
            onClick={() => s.label === "Уведомления" ? setNotifOpen(true) : undefined}
            className="w-full flex items-center gap-3 p-4 hover:bg-white/5 transition-colors text-left"
          >
            <div className="w-9 h-9 glass rounded-xl flex items-center justify-center shrink-0">
              <Icon name={s.icon} size={16} className="text-white/60" />
            </div>
            <div className="flex-1">
              <div className="text-white text-sm font-medium">{s.label}</div>
              <div className="text-white/40 text-xs">{s.desc}</div>
            </div>
            {s.badge && (
              <span className="w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
                {s.badge}
              </span>
            )}
            <Icon name="ChevronRight" size={16} className="text-white/20 shrink-0" />
          </button>
        ))}
      </div>

      {/* Logout */}
      <button className="w-full glass text-red-400 font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all border border-red-500/20 animate-slide-up stagger-4">
        <Icon name="LogOut" size={18} />
        Выйти из аккаунта
      </button>
    </div>
  );
}
