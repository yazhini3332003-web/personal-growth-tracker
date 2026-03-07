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
      { name: "Daily Tracker", href: "/tracker", icon: HiOutlineCalendar },
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

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-52">
        <div className="flex flex-col h-screen sticky top-0 bg-[#0B1120] border-r border-white/[0.06]">
          {/* Logo */}
          <div className="flex items-center gap-2.5 px-4 py-4 flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-white text-sm font-bold">P</span>
            </div>
            <div className="leading-none">
              <h1 className="text-white font-semibold text-[13px]">Growth Tracker</h1>
              <p className="text-gray-500 text-[10px] mt-0.5">Personal</p>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto px-2 pb-4 space-y-4 scrollbar-thin">
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
                        className={`group flex items-center gap-2.5 px-2.5 py-[7px] text-[13px] font-medium rounded-md transition-all duration-150 ${
                          isActive
                            ? "bg-white/[0.08] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
                            : "text-gray-400 hover:bg-white/[0.04] hover:text-gray-200"
                        }`}
                      >
                        {isActive && (
                          <div className="absolute left-0 w-[3px] h-4 bg-blue-500 rounded-r-full" />
                        )}
                        <item.icon
                          className={`h-4 w-4 flex-shrink-0 ${
                            isActive
                              ? "text-blue-400"
                              : "text-gray-500 group-hover:text-gray-300"
                          }`}
                        />
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className="flex-shrink-0 px-3 py-3 border-t border-white/[0.06]">
            <div className="flex items-center gap-2 px-1">
              <div className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">P</span>
              </div>
              <span className="text-gray-400 text-[11px]">Priya</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
