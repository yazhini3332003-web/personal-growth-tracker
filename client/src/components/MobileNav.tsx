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
  HiOutlineAcademicCap,
  HiOutlineBeaker,
  HiOutlineCube,
  HiOutlineColorSwatch,
  HiOutlineBookOpen,
  HiOutlineCash,
} from "react-icons/hi";

type NavItem = { name: string; href: string; icon: React.ComponentType<{ className?: string }> };

const sections: { label: string; items: NavItem[] }[] = [
  {
    label: "Overview",
    items: [
      { name: "Dashboard", href: "/", icon: HiOutlineHome },
      { name: "Analytics", href: "/analytics", icon: HiOutlineChartBar },
    ],
  },
  {
    label: "Planning",
    items: [
      { name: "Goals", href: "/goals", icon: HiOutlineClipboardList },
      { name: "Categories", href: "/categories", icon: HiOutlineViewGrid },
      { name: "Tasks", href: "/tasks", icon: HiOutlineCalendar },
      { name: "Tracker", href: "/tracker", icon: HiOutlineCalendar },
      { name: "Money", href: "/money", icon: HiOutlineCash },
    ],
  },
  {
    label: "Learning",
    items: [
      { name: "AI Learning", href: "/ai-learning", icon: HiOutlineAcademicCap },
      { name: "Learning Lab", href: "/learning-lab", icon: HiOutlineBeaker },
      { name: "Blender Lab", href: "/blender-lab", icon: HiOutlineCube },
    ],
  },
  {
    label: "Creative",
    items: [
      { name: "Art Hub", href: "/art-hub", icon: HiOutlineColorSwatch },
      { name: "Books Hub", href: "/books-hub", icon: HiOutlineBookOpen },
    ],
  },
  {
    label: "More",
    items: [
      { name: "AI Updates", href: "/ai-updates", icon: HiOutlineLightBulb },
      { name: "Investment", href: "/investment", icon: HiOutlineCurrencyDollar },
      { name: "Settings", href: "/settings", icon: HiOutlineCog },
    ],
  },
];

const MobileNav: React.FC = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="md:hidden">
      <div className="bg-[#0B1120] px-4 py-3 flex items-center justify-between border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">P</span>
          </div>
          <span className="text-white font-semibold text-sm">Growth Tracker</span>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="text-gray-400 p-1 hover:text-white transition-colors"
        >
          {open ? (
            <HiOutlineX className="h-5 w-5" />
          ) : (
            <HiOutlineMenu className="h-5 w-5" />
          )}
        </button>
      </div>
      {open && (
        <div className="bg-[#0B1120] border-b border-white/[0.06] px-3 py-3 space-y-3 max-h-[80vh] overflow-y-auto">
          {sections.map((section) => (
            <div key={section.label}>
              <p className="px-2.5 mb-1 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                {section.label}
              </p>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-2.5 px-2.5 py-[7px] text-[13px] font-medium rounded-md transition-all ${
                        isActive
                          ? "bg-white/[0.08] text-white"
                          : "text-gray-400 hover:bg-white/[0.04] hover:text-gray-200"
                      }`}
                    >
                      <item.icon className={`h-4 w-4 flex-shrink-0 ${isActive ? "text-blue-400" : "text-gray-500"}`} />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileNav;
