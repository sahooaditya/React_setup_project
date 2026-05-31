import { useState } from "react";
import { FiBell, FiMenu, FiSearch, FiShield } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "./dashboardLayout.css";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);
  const pageTitle =
    location.pathname
      .split("/")
      .filter(Boolean)
      .pop()
      ?.replace(/-/g, " ") || "dashboard";

  return (
    <>
      <Header />

      <div className={`dashboard-layout ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="dashboard-bg dashboard-bg-one" />
        <div className="dashboard-bg dashboard-bg-two" />

        <button
          className="dashboard-mobile-toggle"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open dashboard menu"
        >
          <FiMenu />
        </button>

        <div className="dashboard-overlay" onClick={() => setSidebarOpen(false)} />

        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="dashboard-content">
          <div className="dashboard-topbar">
            <div className="dashboard-title-block">
              <span className="dashboard-eyebrow">Dashboard Workspace</span>
              <h1>{pageTitle}</h1>
              <p>Welcome back, {user?.username || "User"}. Manage your workspace from here.</p>
            </div>

            <div className="dashboard-tools">
              <div className="dashboard-search">
                <FiSearch />
                <input type="search" placeholder="Search dashboard" aria-label="Search dashboard" />
              </div>

              <span className="dashboard-role">
                <FiShield />
                {user?.role || "user"}
              </span>

              <button className="dashboard-icon-btn" aria-label="Notifications">
                <FiBell />
              </button>
            </div>
          </div>

          <div className="dashboard-content-shell">{children}</div>
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
