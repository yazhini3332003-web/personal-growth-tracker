import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineClipboardList,
  HiOutlineChartBar,
  HiOutlineCog,
  HiOutlineCalendar,
  HiOutlineViewGrid,
  HiOutlineLightBulb,
  HiOutlineCurrencyDollar,
  HiOutlineAcademicCap,
  HiOutlineBeaker,
} from "react-icons/hi";

const navigation = [
  { name: "Dashboard", href: "/", icon: HiOutlineHome },
  { name: "Goals", href: "/goals", icon: HiOutlineClipboardList },
  { name: "Categories", href: "/categories", icon: HiOutlineViewGrid },
  { name: "Tasks", href: "/tasks", icon: HiOutlineCalendar },
  { name: "Daily Tracker", href: "/tracker", icon: HiOutlineCalendar },
  { name: "Analytics", href: "/analytics", icon: HiOutlineChartBar },
  { name: "AI Updates", href: "/ai-updates", icon: HiOutlineLightBulb },
  { name: "Investment", href: "/investment", icon: HiOutlineCurrencyDollar },
  { name: "AI Learning", href: "/ai-learning", icon: HiOutlineAcademicCap },
  { name: "Learning Lab", href: "/learning-lab", icon: HiOutlineBeaker },
  { name: "Settings", href: "/settings", icon: HiOutlineCog },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-60">
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-slate-900 border-r border-slate-800">
          <div className="flex items-center flex-shrink-0 px-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl font-bold">P</span>
              </div>
              <div>
                <h1 className="text-white font-bold text-lg leading-tight">
                  Personal Growth
                </h1>
                <p className="text-slate-400 text-xs">Tracker</p>
              </div>
            </div>
          </div>
          <nav className="flex-1 space-y-1 px-3">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-primary-600 text-white shadow-sm"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 flex-shrink-0 ${
                      isActive
                        ? "text-white"
                        : "text-slate-500 group-hover:text-white"
                    }`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
