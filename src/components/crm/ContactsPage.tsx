import { useState } from "react";
import Icon from "@/components/ui/icon";

const CONTACTS = [
  { id: 1, name: "Дмитрий Иванов", company: "ООО Техпром", role: "Директор", phone: "+7 905 123-45-67", email: "d.ivanov@techprom.ru", deals: 3, color: "#8B5CF6", lastContact: "2 дня назад", status: "hot" },
  { id: 2, name: "Алексей Сидоров", company: "ИП Сидоров", role: "Владелец", phone: "+7 916 234-56-78", email: "a.sidorov@mail.ru", deals: 1, color: "#06B6D4", lastContact: "Вчера", status: "warm" },
  { id: 3, name: "Марина Козлова", company: "Альфа-строй", role: "Финансовый директор", phone: "+7 926 345-67-89", email: "kozlova@alpha.ru", deals: 2, color: "#10B981", lastContact: "Сегодня", status: "hot" },
  { id: 4, name: "Сергей Петров", company: "Бета-технологии", role: "Менеджер", phone: "+7 903 456-78-90", email: "s.petrov@beta.com", deals: 1, color: "#F59E0B", lastContact: "5 дней назад", status: "cold" },
  { id: 5, name: "Ольга Смирнова", company: "Гамма-групп", role: "CEO", phone: "+7 919 567-89-01", email: "smirnova@gamma.ru", deals: 4, color: "#EC4899", lastContact: "Сегодня", status: "hot" },
  { id: 6, name: "Андрей Николаев", company: "Дельта-сервис", role: "IT директор", phone: "+7 911 678-90-12", email: "a.nikolaev@delta.ru", deals: 0, color: "#6366F1", lastContact: "2 недели назад", status: "cold" },
];

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  hot: { label: "Горячий", color: "#F87171" },
  warm: { label: "Тёплый", color: "#FBBF24" },
  cold: { label: "Холодный", color: "#60A5FA" },
};

export default function ContactsPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number | null>(null);

  const filtered = CONTACTS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.company.toLowerCase().includes(search.toLowerCase())
  );

  const contact = selected !== null ? CONTACTS.find(c => c.id === selected) : null;

  if (contact) {
    return (
      <div className="px-4 animate-slide-up">
        <button
          onClick={() => setSelected(null)}
          className="flex items-center gap-2 text-white/60 text-sm mb-4 hover:text-white transition-colors"
        >
          <Icon name="ChevronLeft" size={18} />
          Назад
        </button>

        <div className="glass rounded-2xl p-5 mb-4">
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl"
              style={{ background: contact.color + "30", border: `2px solid ${contact.color}50` }}
            >
              {contact.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div className="flex-1">
              <h2 className="text-white font-bold text-lg" style={{ fontFamily: "'Golos Text', sans-serif" }}>{contact.name}</h2>
              <p className="text-white/50 text-sm">{contact.role}</p>
              <p className="text-white/40 text-xs">{contact.company}</p>
            </div>
            <div
              className="px-2.5 py-1 rounded-full text-xs font-medium"
              style={{ background: STATUS_LABELS[contact.status].color + "20", color: STATUS_LABELS[contact.status].color }}
            >
              {STATUS_LABELS[contact.status].label}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4">
            <button className="glass rounded-xl py-3 flex flex-col items-center gap-1">
              <Icon name="Phone" size={18} className="text-green-400" />
              <span className="text-white/50 text-xs">Звонок</span>
            </button>
            <button className="glass rounded-xl py-3 flex flex-col items-center gap-1">
              <Icon name="MessageCircle" size={18} className="text-blue-400" />
              <span className="text-white/50 text-xs">Сообщение</span>
            </button>
            <button className="glass rounded-xl py-3 flex flex-col items-center gap-1">
              <Icon name="Mail" size={18} className="text-purple-400" />
              <span className="text-white/50 text-xs">Письмо</span>
            </button>
          </div>

          <div className="space-y-3">
            {[
              { icon: "Phone", label: "Телефон", value: contact.phone },
              { icon: "Mail", label: "Email", value: contact.email },
              { icon: "Building2", label: "Компания", value: contact.company },
              { icon: "Clock", label: "Последний контакт", value: contact.lastContact },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="w-8 h-8 glass rounded-lg flex items-center justify-center">
                  <Icon name={item.icon} size={14} className="text-white/50" />
                </div>
                <div>
                  <div className="text-white/40 text-xs">{item.label}</div>
                  <div className="text-white text-sm">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-4">
          <h3 className="text-white font-semibold mb-3" style={{ fontFamily: "'Golos Text', sans-serif" }}>
            Сделки ({contact.deals})
          </h3>
          {contact.deals === 0 ? (
            <p className="text-white/30 text-sm text-center py-3">Нет активных сделок</p>
          ) : (
            <p className="text-white/40 text-sm">{contact.deals} активных сделок на сумму</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="px-4">
      {/* Search */}
      <div className="glass rounded-xl flex items-center gap-3 px-4 py-3 mb-4 animate-slide-up stagger-1">
        <Icon name="Search" size={18} className="text-white/30 shrink-0" />
        <input
          type="text"
          placeholder="Поиск контактов..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent text-white placeholder-white/30 text-sm outline-none"
        />
      </div>

      {/* Stats */}
      <div className="flex gap-3 mb-4 animate-slide-up stagger-2">
        {[
          { label: "Всего", value: CONTACTS.length, color: "text-white" },
          { label: "Горячих", value: CONTACTS.filter(c => c.status === "hot").length, color: "text-red-400" },
          { label: "Тёплых", value: CONTACTS.filter(c => c.status === "warm").length, color: "text-amber-400" },
        ].map(s => (
          <div key={s.label} className="flex-1 glass rounded-xl py-3 text-center">
            <div className={`text-xl font-bold ${s.color}`} style={{ fontFamily: "'Golos Text', sans-serif" }}>{s.value}</div>
            <div className="text-white/40 text-xs">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Contacts List */}
      <div className="space-y-2">
        {filtered.map((contact, i) => (
          <button
            key={contact.id}
            onClick={() => setSelected(contact.id)}
            className={`w-full glass rounded-xl p-3.5 hover-lift animate-slide-up stagger-${Math.min(i + 3, 6)} text-left`}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0"
                style={{ background: contact.color + "25", border: `1.5px solid ${contact.color}40` }}
              >
                {contact.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium text-sm">{contact.name}</span>
                  <div
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: STATUS_LABELS[contact.status].color, boxShadow: `0 0 6px ${STATUS_LABELS[contact.status].color}80` }}
                  />
                </div>
                <div className="text-white/40 text-xs truncate">{contact.role} · {contact.company}</div>
                <div className="text-white/25 text-xs">{contact.lastContact}</div>
              </div>
              <div className="shrink-0 text-right">
                {contact.deals > 0 && (
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: contact.color + "25", color: contact.color }}>
                    {contact.deals} сделк{contact.deals === 1 ? "а" : "и"}
                  </span>
                )}
                <Icon name="ChevronRight" size={14} className="text-white/20 mt-1 ml-auto" />
              </div>
            </div>
          </button>
        ))}
      </div>

      <button className="mt-4 w-full gradient-primary text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 neon-glow-purple active:scale-95 transition-all">
        <Icon name="UserPlus" size={18} />
        Добавить контакт
      </button>
    </div>
  );
}
