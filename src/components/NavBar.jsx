import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import logo from "/images/tribbu-logo.png"

function Navbar() {
  const { isLoggedIn, isLoading, user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logOutUser();
    navigate("/login");
    setMobileMenuOpen(false);
  };

  const isActive = (path) =>
    location.pathname.startsWith(path)
      ? "text-white font-semibold after:w-full"
      : "text-indigo-200 hover:text-white after:w-0";

  if (isLoading) return null;

  return (
    <nav className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <img
              className="h-8 md:h-15 transition-transform hover:scale-105"
              src={logo}
              alt="Tribbu Logo"
            />
          </Link>

          <div className="hidden md:flex items-center gap-8 text-base">
            {isLoggedIn && (
              <>
                {[
                  { to: "/tribbus", label: "Mis Tribbus" },
                  { to: "/create-tribbu", label: "Nueva Tribbu" },
                  { to: "/events", label: "Eventos" },
                ].map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    className={`relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-violet-300 after:transition-all ${isActive(to)}`}
                  >
                    {label}
                  </Link>
                ))}
              </>
            )}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="hover:text-indigo-100">
                  Entrar
                </Link>
                <Link
                  to="/signup"
                  className="bg-white/90 text-indigo-600 px-4 py-2 rounded-full font-medium hover:bg-white hover:scale-105 transition transform"
                >
                  Crear cuenta
                </Link>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-300 to-violet-300 flex items-center justify-center text-indigo-900 font-semibold shadow-sm">
                    {user?.name?.[0]}
                  </div>
                  <span className="hidden lg:block">{user?.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-full border border-white/70 hover:bg-white/10 transition"
                >
                  Salir
                </button>
              </>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {isLoggedIn ? (
              <>
                <div className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-lg mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-300 to-violet-300 flex items-center justify-center text-indigo-900 font-semibold">
                    {user?.name?.[0]}
                  </div>
                  <span className="font-medium">{user?.name}</span>
                </div>
                
                {[
                  { to: "/tribbus", label: "Mi Tribbu" },
                  { to: "/create-tribbu", label: "Nueva Tribbu" },
                  { to: "/events", label: "Eventos" },
                ].map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg hover:bg-white/10 transition"
                  >
                    {label}
                  </Link>
                ))}
                
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/10 transition border-t border-white/20 mt-2"
                >
                  Salir
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg hover:bg-white/10 transition"
                >
                  Entrar
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 bg-white/90 text-indigo-600 rounded-lg font-medium text-center"
                >
                  Crear cuenta
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;