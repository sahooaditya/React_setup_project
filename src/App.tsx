import { Suspense, useEffect, useState } from "react";

import AppRoutes from "./routes/AppRoutes";

import "./app.css";
import "./styles/variables.css";
import "./styles/transition.css";

import { useAppSelector } from "./hooks/useAppSelector";

import GoToTop from "./components/common/GoToTop";
import ScrollTopButton from "./components/common/ScrollTopButton";
import CookieConsent from "./components/common/CookieConsent";
import Loader from "./components/common/Loader";

function App() {
  const mode = useAppSelector((state) => state.theme.mode);

  /* INITIAL LOADING */

  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 2000); // 🔥 2 second loading

    return () => clearTimeout(timer);
  }, []);

  /* THEME */

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  /* SHOW LOADER */

  if (initialLoading) {
    return <Loader />;
  }

  return (
    <div className="app">
      <div className="page-wrapper">
        {/* AUTO TOP */}
        <GoToTop />

        {/* ROUTES */}
        <Suspense fallback={<Loader />}>
          <AppRoutes />
        </Suspense>

        {/* FLOATING BUTTON */}
        <ScrollTopButton />

        {/* COOKIE */}
        <CookieConsent />
      </div>
    </div>
  );
}

export default App;
