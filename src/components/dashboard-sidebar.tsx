// src/components/dashboard-sidebar.tsx (FIX: Actualiza interface para onClick con e)
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface SidebarItem {
  label: string;
  href: string;
  icon: string;
  onClick?: (e: React.MouseEvent) => void;  // ← FIX: Acepta e para preventDefault
}

interface DashboardSidebarProps {
  items: SidebarItem[];
}

export function DashboardSidebar({ items }: DashboardSidebarProps) {
  return (
    <aside className="w-64 border-r border-gray-200 bg-[#3B82F6] p-4">
      <nav className="space-y-2">
        {items.map((item, index) => (
          <Link
            key={`${item.label}-${index}`}  // Key única
            to={item.href}
            onClick={(e) => {
              if (item.onClick) item.onClick(e);  // ← Llama onClick con e
            }}
            className={cn(
              "flex items-center gap-3 rounded-lg px-4 py-3 text-white transition-all hover:bg-white/20",
              "focus:bg-white/30 focus:outline-none"
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