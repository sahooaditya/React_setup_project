import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {/* <Sidebar /> */}
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
