import { NavLink } from "react-router-dom";

function Sidebar() {
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block rounded-lg px-4 py-3 font-medium transition-colors ${
      isActive
        ? "bg-gray-700 text-white shadow-sm"
        : "text-gray-300 hover:bg-gray-800 hover:text-white"
    }`;

  return (
    <aside className="w-64 h-screen shrink-0 bg-gray-900 text-white overflow-y-auto">
      <div className="p-6 text-xl font-bold">
        My App
      </div>

      <nav className="space-y-1 px-4">
        <NavLink
          to="/"
          end
          className={getNavLinkClass}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/users"
          className={getNavLinkClass}
        >
          Users
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;