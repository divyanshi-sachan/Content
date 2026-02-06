'use client';

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Share2,
  Sparkles,
  Library,
  Calendar,
  Users,
  Workflow,
  LayoutGrid
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard
  },
  {
    name: "Connections",
    href: "/dashboard/connections",
    icon: Share2
  },
  {
    name: "AI Studio",
    href: "/dashboard/ai-studio",
    icon: Sparkles
  },
  {
    name: "Content Library",
    href: "/dashboard/library",
    icon: Library
  },
  {
    name: "Content Calendar",
    href: "/dashboard/calendar",
    icon: Calendar
  },
  {
    name: "User Experience",
    href: "/dashboard/experience",
    icon: Users
  },
  {
    name: "Creation Workflow",
    href: "/dashboard/workflow",
    icon: Workflow
  },
  {
    name: "Content Types",
    href: "/dashboard/content-types",
    icon: LayoutGrid
  }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen flex-col bg-gray-900 border-r border-gray-800 w-64">
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-purple-500" />
          <span className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Content AI
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-4 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                isActive
                  ? "bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-white"
                  : "text-gray-400 hover:bg-gray-800/50 hover:text-white"
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 transition-colors",
                  isActive
                    ? "text-purple-500"
                    : "text-gray-400 group-hover:text-white"
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-800/50">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
          <div className="flex-1">
            <div className="text-sm font-medium text-white">User Name</div>
            <div className="text-xs text-gray-400">user@example.com</div>
          </div>
        </div>
      </div>
    </div>
  );
} 