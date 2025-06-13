"use client";

import { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Building,
  Calendar,
  Briefcase,
  UserCog,
  Settings,
  LogOut,
} from "lucide-react";
import { useAdmin } from "../../context/AdminContext";

interface SidebarProps {}

export const Sidebar: FC<SidebarProps> = () => {
  const pathname = usePathname();
  const { logout } = useAdmin();

  // Navigation items
  const navItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Admins",
      href: "/admin/admins",
      icon: <UserCog className="h-5 w-5" />,
    },
    {
      name: "Students",
      href: "/admin/students",
      icon: <GraduationCap className="h-5 w-5" />,
    },
    {
      name: "Teachers",
      href: "/admin/teachers",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "Departments",
      href: "/admin/departments",
      icon: <Building className="h-5 w-5" />,
    },
    {
      name: "Schedules",
      href: "/admin/schedules",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      name: "Internship Agents",
      href: "/admin/internship-agents",
      icon: <Briefcase className="h-5 w-5" />,
    },
    {
      name: "Recovery Agents",
      href: "/admin/recovery-agents",
      icon: <UserCog className="h-5 w-5" />,
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex flex-col flex-grow border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-y-auto">
        <div className="flex items-center justify-center h-16 flex-shrink-0 px-4 bg-indigo-600 dark:bg-indigo-800">
          <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
        </div>
        <div className="mt-5 flex-grow flex flex-col">
          <nav className="flex-1 px-2 pb-4 space-y-1">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                  }`}
                >
                  <div
                    className={`mr-3 flex-shrink-0 ${
                      isActive
                        ? "text-indigo-500 dark:text-indigo-400"
                        : "text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300"
                    }`}
                  >
                    {item.icon}
                  </div>
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-800 p-4">
          <button
            onClick={logout}
            className="flex-shrink-0 w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
          >
            <LogOut className="mr-3 h-5 w-5 text-red-500 dark:text-red-400" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
