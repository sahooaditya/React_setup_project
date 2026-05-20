import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import { adminMenu, userMenu } from "./sidebarMenu";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

import "./sidebar.css";

const Sidebar = () => {
  const location = useLocation();

  const { user } = useAppSelector((state) => state.auth);

  const [collapsed, setCollapsed] = useState(false);

  // ✅ Role based menu
  const menu = user?.role === "admin" ? adminMenu : userMenu;

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* TOGGLE BUTTON */}
      <div className="sidebar-toggle">
        <button onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <FaBars /> : <FaTimes />}
        </button>
      </div>

      {/* TOP */}
      <div className="sidebar-top">
        {!collapsed && <h2>Dashboard</h2>}

        <div className="profile-card">
          <div className="avatar">{user?.username?.charAt(0).toUpperCase()}</div>

          {!collapsed && (
            <div>
              <h4>{user?.username}</h4>
              <p>{user?.role}</p>
            </div>
          )}
        </div>
      </div>

      {/* MENU */}
      <nav className="sidebar-menu">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-link ${location.pathname === item.path ? "active" : ""}`}
          >
            <span className="sidebar-icon">{item.icon}</span>

            {!collapsed && <span>{item.label}</span>}

            {/* TOOLTIP */}
            {collapsed && <span className="sidebar-tooltip">{item.label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
