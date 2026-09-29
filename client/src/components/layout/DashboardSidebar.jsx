import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  BriefcaseBusiness,
  ChartNoAxesColumnIncreasing,
  Map,
  FolderKanban,
  Bot,
  User,
  Settings,
  Code2,
} from "lucide-react";

const DashboardSidebar = () => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Skills",
      path: "/dashboard/skills",
      icon: ChartNoAxesColumnIncreasing,
    },
    {
      name: "Resume ATS",
      path: "/dashboard/resume",
      icon: FileText,
    },
    {
      name: "Job Match",
      path: "/dashboard/jobs",
      icon: BriefcaseBusiness,
    },
    {
      name: "Learning Plan",
      path: "/dashboard/learning-plan",
      icon: Map,
    },
    {
      name: "Projects",
      path: "/dashboard/projects",
      icon: FolderKanban,
    },
    {
      name: "AI Mentor",
      path: "/dashboard/mentor",
      icon: Bot,
    },
  ];

  const bottomMenuItems = [
    {
      name: "Profile",
      path: "/profile",
      icon: User,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-[268px] flex-col border-r border-gray-100 bg-white">

      {/* ================= LOGO ================= */}
      <div className="flex h-[85px] items-center px-[29px]">
        <div className="flex items-center gap-[12px]">

          {/* Green logo */}
          <div
            className="flex h-[39px] w-[39px] items-center justify-center bg-[#16A34A] text-white"
            style={{
              clipPath:
                "polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0% 50%)",
            }}
          >
            <Code2 size={21} strokeWidth={2.5} />
          </div>

          {/* Brand */}
          <h1 className="text-[24px] font-bold tracking-[-0.61px] text-[#1F2937]">
            Skill<span className="text-[#16A34A]">Forge</span>
          </h1>
        </div>
      </div>

      {/* ================= NAVIGATION ================= */}
      <nav className="flex-1 overflow-y-auto px-[15px] py-[15px]">

        <div className="space-y-[5px]">

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/dashboard"}
                className={({ isActive }) =>
                  `
                  group flex h-[50px] items-center gap-[15px] rounded-[9px]
                  px-[17px] text-[16px] font-medium
                  transition-all duration-150
                  ${
                    isActive
                      ? "bg-[#ECF8F1] text-[#16A34A]"
                      : "text-[#475569] hover:bg-gray-50 hover:text-[#16A34A]"
                  }
                  `
                }
              >
                <Icon
                  size={22}
                  strokeWidth={1.8}
                  className="shrink-0"
                />

                <span>{item.name}</span>
              </NavLink>
            );
          })}

        </div>
      </nav>

      {/* ================= BOTTOM MENU ================= */}
      <div className="px-[15px] pb-5">

        <div className="space-y-[5px]">

          {bottomMenuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `
                  flex h-[50px] items-center gap-[15px] rounded-[9px]
                  px-[17px] text-[16px] font-medium
                  transition-all duration-150
                  ${
                    isActive
                      ? "bg-[#ECF8F1] text-[#16A34A]"
                      : "text-[#475569] hover:bg-gray-50 hover:text-[#16A34A]"
                  }
                  `
                }
              >
                <Icon
                  size={22}
                  strokeWidth={1.8}
                  className="shrink-0"
                />

                <span>{item.name}</span>
              </NavLink>
            );
          })}

        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
