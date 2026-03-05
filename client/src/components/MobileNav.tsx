import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineClipboardList,
  HiOutlineChartBar,
  HiOutlineCog,
  HiOutlineCalendar,
  HiOutlineViewGrid,
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineLightBulb,
  HiOutlineCurrencyDollar,
} from "react-icons/hi";

const navigation = [
  { name: "Dashboard", href: "/", icon: HiOutlineHome },
  { name: "Goals", href: "/goals", icon: HiOutlineClipboardList },
  { name: "Categories", href: "/categories", icon: HiOutlineViewGrid },
  { name: "Tasks", href: "/tasks", icon: HiOutlineCalendar },
  { name: "Tracker", href: "/tracker", icon: HiOutlineCalendar },
  { name: "Analytics", href: "/analytics", icon: HiOutlineChartBar },
  { name: "AI Updates", href: "/ai-updates", icon: HiOutlineLightBulb },
  { name: "Investment", href: "/investment", icon: HiOutlineCurrencyDollar },
  { name: "Settings", href: "/settings", icon: HiOutlineCog },
];

const MobileNav: React.FC = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="md:hidden">
      <div className="bg-primary-900 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-400 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">P</span>
          </div>
          <span className="text-white font-bold">Growth Tracker</span>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="text-white p-1"
        >
          {open ? (
            <HiOutlineX className="h-6 w-6" />
          ) : (
            <HiOutlineMenu className="h-6 w-6" />
          )}
        </button>
      </div>
      {open && (
        <div className="bg-primary-800 px-3 py-2 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                  isActive
                    ? "bg-primary-600 text-white"
                    : "text-primary-200 hover:bg-primary-700"
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MobileNav;
