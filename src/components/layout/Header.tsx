import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { headerRoutes } from "./HeaderRoutes";
import "./header.css";
import { toggleTheme } from "../../features/theme/themeSlice";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { logout } from "../../features/auth/authSlice";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const mode = useAppSelector((state) => state.theme.mode);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const timeoutRef = useRef<any>(null);
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveSubmenu(label);
  };
  const isMobile = window.innerWidth <= 768;
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveSubmenu(null);
    }, 200);
  };
  const [scrolled, setScrolled] = useState(false);

  /* SCROLL EFFECT */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <Link to="/" className="logo">
        AKS
      </Link>

      {/* Hamburger */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? "✖" : "☰"}
      </div>
      <nav className={`nav ${menuOpen ? "open" : ""}`}>
        {headerRoutes.map((route) => (
          <div
            key={route.label}
            className="nav-item"
            onMouseEnter={() => route.submenu && handleMouseEnter(route.label)}
            onMouseLeave={handleMouseLeave}
          >
            {/* ✅ yahi implement karna hai */}
            {route.submenu ? (
              <span
                className="menu-label"
                onClick={() => setActiveSubmenu(activeSubmenu === route.label ? null : route.label)}
              >
                {route.label}
              </span>
            ) : (
              <Link to={route.path} onClick={() => setMenuOpen(false)}>
                {route.label}
              </Link>
            )}

            {/* Submenu */}
            {route.submenu && activeSubmenu === route.label && (
              <div
                className="submenu"
                onMouseEnter={() => handleMouseEnter(route.label)}
                onMouseLeave={handleMouseLeave}
              >
                {route.submenu.map((sub) => (
                  <Link
                    key={sub.label}
                    to={sub.path}
                    onClick={() => {
                      setActiveSubmenu(null); // close dropdown
                      setMenuOpen(false); // ✅ close mobile menu
                    }}
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
        {isAuthenticated ? (
          isMobile ? (
            // ✅ MOBILE VIEW (direct show)
            <div className="user-section">
              <span>👤 {user?.username}</span>
              <button
                onClick={() => {
                  if (user?.role === "admin") {
                    navigate("/dashboard/admin");
                  } else {
                    navigate("/dashboard/user");
                  }
                  setMenuOpen(false);
                }}
              >
                Dashboard
              </button>
              <button
                onClick={() => {
                  dispatch(logout());
                  setMenuOpen(false);
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            // ✅ DESKTOP (dropdown)
            <div
              className="nav-item"
              onMouseEnter={() => handleMouseEnter("user")}
              onMouseLeave={handleMouseLeave}
            >
              <span
                className="menu-label"
                onClick={() => setActiveSubmenu(activeSubmenu === "user" ? null : "user")}
              >
                👤 {user?.username}
              </span>

              {activeSubmenu === "user" && (
                <div className="submenu">
                  <button
                    onClick={() => {
                      if (user?.role === "admin") {
                        navigate("/dashboard/admin");
                      } else {
                        navigate("/dashboard/user");
                      }
                      setMenuOpen(false);
                    }}
                  >
                    Dashboard
                  </button>
                  <button onClick={() => dispatch(logout())}>Logout</button>
                </div>
              )}
            </div>
          )
        ) : (
          <Link to="/login" onClick={() => setMenuOpen(false)}>
            Login
          </Link>
        )}
      </nav>
      <button onClick={() => dispatch(toggleTheme())}>{mode === "light" ? "🌙" : "☀️"}</button>
    </header>
  );
};

export default Header;
