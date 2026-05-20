import Header from "./Header";
import Sidebar from "./Sidebar";
import "./dashboardLayout.css";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />

      <div className="dashboard-layout">
        <Sidebar />

        <main className="dashboard-content">{children}</main>
      </div>
    </>
  );
};

export default DashboardLayout;
