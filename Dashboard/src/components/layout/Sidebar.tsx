import { FC } from "react";
import {
  GraduationCap,
  BarChart3,
  Users,
  BookOpen,
  Building2,
  UserCog,
  School,
  Briefcase,
  Receipt,
  Settings,
} from "lucide-react";
import { Route, NavItem } from "../../types";

interface SidebarProps {
  currentRoute: Route;
  onRouteChange: (route: Route) => void;
}

export const Sidebar: FC<SidebarProps> = ({ currentRoute, onRouteChange }) => {
  const navItems: NavItem[] = [
    { name: "Dashboard", route: "dashboard", icon: "BarChart3" },
    { name: "Students", route: "students", icon: "GraduationCap" },
    { name: "Teachers", route: "teachers", icon: "Users" },
    { name: "Pedagogies", route: "pedagogies", icon: "School" },
    { name: "Admins", route: "admins", icon: "UserCog" },
    { name: "Departments", route: "departments", icon: "Building2" },
    { name: "Internships", route: "internships", icon: "Briefcase" },
    { name: "Recovery", route: "recovery", icon: "Receipt" },
    { name: "Settings", route: "settings", icon: "Settings" },
  ];

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "BarChart3":
        return <BarChart3 size={20} />;
      case "GraduationCap":
        return <GraduationCap size={20} />;
      case "Users":
        return <Users size={20} />;
      case "School":
        return <School size={20} />;
      case "UserCog":
        return <UserCog size={20} />;
      case "Building2":
        return <Building2 size={20} />;
      case "Briefcase":
        return <Briefcase size={20} />;
      case "Receipt":
        return <Receipt size={20} />;
      case "Settings":
        return <Settings size={20} />;
      default:
        return <BarChart3 size={20} />;
    }
  };

  return (
    <div className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r border-gray-200">
        <div className="flex items-center flex-shrink-0 px-4 mb-5">
          <GraduationCap size={28} className="text-blue-600 mr-2" />
          <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
        <div className="flex flex-col flex-grow px-3 mt-5">
          <nav className="flex-1 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.route}
                onClick={() => onRouteChange(item.route)}
                className={`
                  flex items-center px-3 py-2 text-sm font-medium rounded-md w-full
                  transition-all duration-200 ease-in-out
                  ${
                    currentRoute === item.route
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }
                `}
              >
                <span
                  className={`mr-3 ${
                    currentRoute === item.route
                      ? "text-blue-600"
                      : "text-gray-500"
                  }`}
                >
                  {renderIcon(item.icon)}
                </span>
                {item.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};
