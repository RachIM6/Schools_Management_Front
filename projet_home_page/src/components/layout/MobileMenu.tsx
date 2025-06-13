"use client";

import { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
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

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const { logout } = useAdmin();

  // Navigation items (same as Sidebar)
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 md:hidden">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-gray-600 bg-opacity-75"
        onClick={onClose}
      ></div>

      {/* Mobile menu */}
      <div className="fixed inset-y-0 left-0 flex max-w-xs w-full bg-white dark:bg-gray-900 shadow-xl">
        <div className="w-full flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-800 bg-indigo-600 dark:bg-indigo-800">
            <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
            <button
              type="button"
              className="text-white hover:text-gray-200 focus:outline-none"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto pt-5 pb-4">
            <nav className="px-2 space-y-1">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                      isActive
                        ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                    }`}
                    onClick={onClose}
                  >
                    <div
                      className={`mr-4 flex-shrink-0 ${
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

          {/* Logout button */}
          <div className="flex-shrink-0 border-t border-gray-200 dark:border-gray-800 p-4">
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="flex items-center w-full px-2 py-2 text-base font-medium rounded-md text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
            >
              <LogOut className="mr-4 h-5 w-5 text-red-500 dark:text-red-400" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
