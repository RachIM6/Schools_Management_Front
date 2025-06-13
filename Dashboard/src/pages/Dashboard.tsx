import { FC } from "react";
import {
  GraduationCap,
  Users,
  BookOpen,
  ClipboardCheck,
  TrendingUp,
  ArrowRight,
  Award,
  Calendar,
} from "lucide-react";
import { StatCard } from "../components/ui/StatCard";
import { LineChart } from "../components/ui/LineChart";
import { RecentActivity } from "../components/ui/RecentActivity";
import { UpcomingEvents } from "../components/ui/UpcomingEvents";
import { Stat } from "../types";

export const Dashboard: FC = () => {
  const stats: Stat[] = [
    {
      name: "Total Students",
      value: 1257,
      change: 12.5,
      icon: "User",
    },
    {
      name: "Total Courses",
      value: 42,
      change: 5.2,
      icon: "BookOpen",
    },
    {
      name: "Attendance Rate",
      value: "94%",
      change: 3.1,
      icon: "ClipboardCheck",
    },
    {
      name: "Overall GPA",
      value: "3.5",
      change: 0.2,
      icon: "TrendingUp",
    },
  ];

  const renderStatIcon = (iconName: string) => {
    switch (iconName) {
      case "User":
        return <Users className="h-6 w-6" />;
      case "BookOpen":
        return <BookOpen className="h-6 w-6" />;
      case "ClipboardCheck":
        return <ClipboardCheck className="h-6 w-6" />;
      case "TrendingUp":
        return <TrendingUp className="h-6 w-6" />;
      default:
        return <Users className="h-6 w-6" />;
    }
  };

  return (
    <div>
      {/* Key Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Comprehensive School Management
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Everything you need to manage your educational institution
              efficiently and effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                name={stat.name}
                value={stat.value}
                change={stat.change}
                icon={renderStatIcon(stat.icon)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 bg-white overflow-hidden shadow-lg rounded-xl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Academic Performance Trends
                  </h3>
                  <select className="text-sm border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                    <option>Last 6 Months</option>
                    <option>Last Quarter</option>
                    <option>This Year</option>
                  </select>
                </div>
                <LineChart />
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow-lg rounded-xl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Upcoming Events
                  </h3>
                  <button className="text-sm text-blue-600 hover:text-blue-700">
                    View Calendar
                  </button>
                </div>
                <UpcomingEvents />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-lg rounded-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Recent Activity
                </h3>
                <button className="text-sm text-blue-600 hover:text-blue-700">
                  View All
                </button>
              </div>
              <RecentActivity />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
