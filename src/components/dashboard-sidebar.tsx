// src/components/dashboard-sidebar.tsx
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface SidebarItem {
  label: string;
  href: string;
  icon: string;
  onClick?: (e: React.MouseEvent) => void;
}

interface DashboardSidebarProps {
  items: SidebarItem[];
}

export function DashboardSidebar({ items }: DashboardSidebarProps) {
  return (
    <aside className="w-64 border-r border-slate-200 bg-slate-500 p-4">  {/* ← CAMBIO: bg-slate-800 (gris oscuro, no repite con header sky) */}
      <nav className="space-y-2">
        {items.map((item, index) => (
          <Link
            key={`${item.label}-${index}`}
            to={item.href}
            onClick={(e) => {
              if (item.onClick) item.onClick(e);
            }}
            className={cn(
              "flex items-center gap-3 rounded-lg px-4 py-3 text-white transition-all hover:bg-slate-700 hover:scale-105 focus:bg-slate-700 focus:outline-none",  // ← CAMBIO: hover bg-slate-700 para gris suave, sin repetición de sky
              "focus:outline-none"
            )}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}