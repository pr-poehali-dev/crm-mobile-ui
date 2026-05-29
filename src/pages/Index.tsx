import { useState } from "react";
import Icon from "@/components/ui/icon";
import DashboardPage from "@/components/crm/DashboardPage";
import TasksPage from "@/components/crm/TasksPage";
import DealsPage from "@/components/crm/DealsPage";
import ContactsPage from "@/components/crm/ContactsPage";
import AnalyticsPage from "@/components/crm/AnalyticsPage";
import CalendarPage from "@/components/crm/CalendarPage";
import ProfilePage from "@/components/crm/ProfilePage";
import NotificationPanel from "@/components/crm/NotificationPanel";

type Tab = "home" | "tasks" | "deals" | "contacts" | "analytics" | "calendar" | "profile";

const NAV_ITEMS = [
  { id: "home", icon: "LayoutDashboard", label: "Главная" },
  { id: "tasks", icon: "CheckSquare", label: "Задачи" },
  { id: "deals", icon: "TrendingUp", label: "Сделки" },
  { id: "contacts", icon: "Users", label: "Контакты" },
  { id: "analytics", icon: "BarChart3", label: "Аналитика" },
] as const;

function getPageTitle(tab: Tab): string {
  const titles: Record<Tab, string> = {
    home: "Обзор",
    tasks: "Задачи",
    deals: "Сделки",
    contacts: "Контакты",
    analytics: "Аналитика",
    calendar: "Календарь",
    profile: "Профиль",
  };
  return titles[tab];
}

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [showNotifications, setShowNotifications] = useState(false);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="mesh-bg min-h-screen flex flex-col items-center justify-start">
      <div className="relative w-full max-w-[420px] min-h-screen flex flex-col overflow-hidden">
        {/* Status Bar */}
        <div className="flex items-center justify-between px-6 pt-4 pb-2 shrink-0">
          <span className="text-xs text-white/40 font-medium tracking-widest">9:41</span>
          <div className="flex items-center gap-1.5">
            <Icon name="Signal" size={14} className="text-white/40" />
            <Icon name="Wifi" size={14} className="text-white/40" />
            <Icon name="Battery" size={14} className="text-white/40" />
          </div>
        </div>

        {/* Header */}
        <header className="flex items-center justify-between px-5 py-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center neon-glow-purple">
              <span className="text-white font-bold text-sm">CRM</span>
            </div>
            <div>
              <h1
                className="text-white font-bold text-lg leading-none"
                style={{ fontFamily: "'Golos Text', sans-serif" }}
              >
                {getPageTitle(activeTab)}
              </h1>
              <p className="text-white/40 text-xs mt-0.5">Пятница, 29 мая</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowNotifications(true)}
              className="relative w-10 h-10 glass rounded-xl flex items-center justify-center hover-lift"
            >
              <Icon name="Bell" size={18} className="text-white/70" />
              <div className="notification-dot absolute top-2 right-2" />
            </button>
            <button
              onClick={() => handleTabChange("profile")}
              className="w-10 h-10 rounded-xl overflow-hidden gradient-primary flex items-center justify-center hover-lift"
            >
              <span className="text-white font-bold text-sm">АК</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto scrollbar-hide pb-28">
          <div key={activeTab} className="animate-fade-in">
            {activeTab === "home" && <DashboardPage onNavigate={handleTabChange} />}
            {activeTab === "tasks" && <TasksPage />}
            {activeTab === "deals" && <DealsPage />}
            {activeTab === "contacts" && <ContactsPage />}
            {activeTab === "analytics" && <AnalyticsPage />}
            {activeTab === "calendar" && <CalendarPage />}
            {activeTab === "profile" && <ProfilePage />}
          </div>
        </main>

        {/* Bottom Navigation */}
        <nav className="absolute bottom-0 left-0 right-0 glass-strong border-t border-white/10 px-2 pt-3 pb-6">
          <div className="flex items-center justify-around">
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id as Tab)}
                  className="flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all duration-200 relative"
                >
                  {isActive && (
                    <div className="absolute inset-0 rounded-xl gradient-primary opacity-20" />
                  )}
                  <div className={`transition-all duration-200 ${isActive ? "scale-110" : "scale-100"}`}>
                    <Icon
                      name={item.icon}
                      size={22}
                      className={isActive ? "text-purple-400" : "text-white/40"}
                    />
                  </div>
                  <span
                    className={`text-[10px] font-medium transition-colors duration-200 ${
                      isActive ? "text-purple-400" : "text-white/30"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
            <button
              onClick={() => handleTabChange("calendar")}
              className="flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all duration-200 relative"
            >
              {activeTab === "calendar" && (
                <div className="absolute inset-0 rounded-xl gradient-primary opacity-20" />
              )}
              <Icon
                name="Calendar"
                size={22}
                className={activeTab === "calendar" ? "text-purple-400" : "text-white/40"}
              />
              <span
                className={`text-[10px] font-medium ${
                  activeTab === "calendar" ? "text-purple-400" : "text-white/30"
                }`}
              >
                Календарь
              </span>
            </button>
          </div>
        </nav>

        {/* Notification Panel */}
        {showNotifications && (
          <NotificationPanel onClose={() => setShowNotifications(false)} />
        )}
      </div>
    </div>
  );
}
