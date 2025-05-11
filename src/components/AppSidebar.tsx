import { Link, useLocation } from "react-router-dom";
import {
  Search,
  Zap,
  History,
  MessageSquare,
  Settings,
  User,
  ShoppingBag,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Icon from "./ui/icon";
import { useAuth } from "./AuthProvider";

const AppSidebar = () => {
  const location = useLocation();
  const { username, logout } = useAuth();
  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { icon: "Search", label: "Поиск", path: "/" },
    { icon: "Zap", label: "IP Logger", path: "/logger" },
    { icon: "History", label: "Библиотека", path: "/library" },
    { icon: "Settings", label: "Настройки", path: "/settings" },
    { icon: "User", label: "Аккаунт", path: "/account" },
    { icon: "ShoppingBag", label: "Покупки", path: "/purchase" },
  ];

  return (
    <div className="w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border flex items-center gap-3">
        <div className="h-10 w-10 bg-accent rounded-md flex items-center justify-center font-bold text-white">
          РС
        </div>
        <span className="text-xl font-semibold">Rassvet</span>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="flex items-center gap-2 bg-background/10 rounded-md px-3 py-2 text-sidebar-foreground/70">
          <Icon name="Search" size={18} />
          <input
            type="text"
            placeholder="Поиск"
            className="bg-transparent border-none outline-none w-full placeholder:text-sidebar-foreground/50"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-2 flex-1">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 transition-colors",
                  isActive(item.path)
                    ? "bg-accent/20 text-accent"
                    : "text-sidebar-foreground hover:bg-accent/10",
                )}
              >
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-3 border-t border-sidebar-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-accent/20 rounded-full flex items-center justify-center">
              <Icon name="User" size={16} className="text-accent" />
            </div>
            <div className="text-sm">
              <div className="font-medium">{username || "Пользователь"}</div>
              <div className="text-xs text-sidebar-foreground/50">Активный</div>
            </div>
          </div>
          <button
            onClick={logout}
            className="p-1.5 rounded-md hover:bg-sidebar-accent/10 text-sidebar-foreground/70 hover:text-sidebar-foreground"
          >
            <Icon name="LogOut" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppSidebar;
