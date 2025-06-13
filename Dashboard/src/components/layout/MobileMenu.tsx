import { FC } from "react";
import {
  X,
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

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentRoute: Route;
  onRouteChange: (route: Route) => void;
}

export const MobileMenu: FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  currentRoute,
  onRouteChange,
}) => {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 md:hidden">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Menu */}
      <div className="fixed inset-y-0 left-0 flex max-w-xs w-full bg-white shadow-xl">
        <div className="absolute top-0 right-0 -mr-12 pt-4">
          <button
            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            onClick={onClose}
          >
            <span className="sr-only">Close sidebar</span>
            <X className="h-6 w-6 text-white" />
          </button>
        </div>

        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4 mb-5">
            <GraduationCap size={28} className="text-blue-600 mr-2" />
            <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>

          <nav className="mt-5 flex-1 px-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.route}
                onClick={() => onRouteChange(item.route)}
                className={`
                  flex items-center px-3 py-3 text-base font-medium rounded-md w-full
                  transition-all duration-200 ease-in-out
                  ${
                    currentRoute === item.route
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }
                `}
              >
                <span
                  className={`mr-4 ${
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
