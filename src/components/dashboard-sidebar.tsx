import React from "react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";  // ← Cambiado: React Router
import type { ClassValue } from "clsx";  // Si cn usa clsx, instala si no

interface SidebarItem {
  label: string;
  href: string;
  icon: string;
}

interface DashboardSidebarProps {
  items: SidebarItem[];
}

export function DashboardSidebar({ items }: DashboardSidebarProps) {
  const location = useLocation();  // ← Nuevo: Pa' active link en React Router

  return (
    <aside className="w-64 border-r border-gray-200 bg-[#3B82F6] p-4">
      <nav className="space-y-2">
        {items.map((item) => (
          <Link
            key={item.href}
            to={item.href}  // ← Cambiado: to= pa' React Router
            className={cn(
              "flex items-center gap-3 rounded-lg px-4 py-3 text-white transition-all hover:bg-white/20",
              location.pathname === item.href && "bg-white/30 font-semibold",  // ← Active con useLocation
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