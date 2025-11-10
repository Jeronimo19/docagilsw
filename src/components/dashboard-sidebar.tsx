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
  isOpen: boolean;  // ← NUEVO: Para mobile toggle
  onClose: () => void;  // ← NUEVO: Cerrar en mobile
}

export function DashboardSidebar({ items, isOpen, onClose }: DashboardSidebarProps) {
  return (
    <>
      {/* Overlay para mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden" 
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 border-r border-slate-200 bg-slate-500 p-4 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto",
        isOpen ? "translate-x-0" : "-translate-x-full"  // ← Slide in/out en mobile
      )}>
        <nav className="space-y-2">
          {items.map((item, index) => (
            <Link
              key={`${item.label}-${index}`}
              to={item.href}
              onClick={(e) => {
                if (item.onClick) item.onClick(e);
                onClose();  // ← Cierra en mobile al clickear
              }}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 text-white transition-all hover:bg-slate-700 hover:scale-105 focus:bg-slate-700 focus:outline-none",
                "focus:outline-none"
              )}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}