import { NavLink } from "react-router-dom";

interface SidebarMenuRoutes {
  to: string;
  icon: string;
  title: string;
  description: string;
  // component: JSX.Element;
}

export const SiebarMenuItem = (menuRoutes: SidebarMenuRoutes) => {
  const { description, icon, title, to } = menuRoutes;

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "flex justify-center items-center bg-gray-800 rounded-md p-2 transition-colors"
          : "flex justify-center items-center hover:bg-gray-800 rounded-md p-2 transition-colors"
      }
    >
      <i className={`${icon} text-xl mr-4 text-indigo-400`}>
        <div className="flex flex-col flex-grow">
          <span className="text-white text-sm font-semibold">{title}</span>
          <span className="text-gray-400 text-[10px]">{description}</span>
        </div>
      </i>
    </NavLink>
  );
};
