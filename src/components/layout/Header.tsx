import { useEffect, useRef, useState } from "react";
import { FiMenu, FiMoon, FiShoppingCart, FiSun, FiUser, FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { toggleTheme } from "../../features/theme/themeSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import "./header.css";
import { headerRoutes } from "./HeaderRoutes";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mode = useAppSelector((state) => state.theme.mode);
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const cartCount = useAppSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const visibleRoutes = headerRoutes.filter((route) => !route.requiresAuth || isAuthenticated);

  const closeMenu = () => {
    setMenuOpen(false);
    setActiveSubmenu(null);
  };

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveSubmenu(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveSubmenu(null);
    }, 200);
  };

  const goToDashboard = () => {
    navigate(user?.role === "admin" ? "/dashboard/admin" : "/dashboard/user");
    closeMenu();
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <Link to="/" className="logo" onClick={closeMenu}>
        <span className="logo-mark">MC</span>
        <span>MyCompany</span>
      </Link>

      <nav className={`nav ${menuOpen ? "open" : ""}`}>
        {visibleRoutes.map((route) => (
          <div
            key={route.label}
            className="nav-item"
            onMouseEnter={() => route.submenu && handleMouseEnter(route.label)}
            onMouseLeave={handleMouseLeave}
          >
            {route.submenu ? (
              <span
                className="menu-label"
                onClick={() => setActiveSubmenu(activeSubmenu === route.label ? null : route.label)}
              >
                {route.label}
              </span>
            ) : (
              <Link to={route.path} onClick={closeMenu}>
                {route.label}
              </Link>
            )}

            {route.submenu && activeSubmenu === route.label && (
              <div
                className="submenu"
                onMouseEnter={() => handleMouseEnter(route.label)}
                onMouseLeave={handleMouseLeave}
              >
                {route.submenu.map((sub) => (
                  <Link key={sub.label} to={sub.path} onClick={closeMenu}>
                    {sub.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}

        {isAuthenticated ? (
          <div
            className="nav-item user-nav"
            onMouseEnter={() => handleMouseEnter("user")}
            onMouseLeave={handleMouseLeave}
          >
            <span
              className="menu-label user-label"
              onClick={() => setActiveSubmenu(activeSubmenu === "user" ? null : "user")}
            >
              <FiUser />
              {user?.username}
            </span>

            <div className={`submenu user-submenu ${activeSubmenu === "user" ? "show" : ""}`}>
              <button onClick={goToDashboard}>Dashboard</button>
              <button
                onClick={() => {
                  dispatch(logout());
                  closeMenu();
                }}
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <Link to="/login" onClick={closeMenu}>
            Login
          </Link>
        )}
      </nav>

      <div className="header-actions">
        {isAuthenticated && (
          <Link to="/cart" className="cart-link" onClick={closeMenu} aria-label="Cart">
            <FiShoppingCart />
            <span className="cart-count">{cartCount}</span>
          </Link>
        )}
        <button className="theme-toggle" onClick={() => dispatch(toggleTheme())} aria-label="Toggle theme">
          {mode === "light" ? <FiMoon /> : <FiSun />}
        </button>
        <button
          className="hamburger"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>
    </header>
  );
};

export default Header;
