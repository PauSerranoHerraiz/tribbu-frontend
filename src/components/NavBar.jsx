import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isLoggedIn, isLoading, user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logOutUser();
    navigate("/login");
  };

  const isActive = (path) =>
    location.pathname.startsWith(path)
      ? "text-white font-semibold after:w-full"
      : "text-indigo-200 hover:text-white after:w-0";

  if (isLoading) return null;

  return (
    <nav className="bg-indigo-500 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-3 items-center h-16 md:h-18">

          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <img
                className="h-9 md:h-15 transition-transform hover:scale-105"
                src="/images/tribbu-logo.png"
                alt="Tribbu Logo"
              />
            </Link>
          </div>

          <div className="justify-self-center hidden md:block">
            {isLoggedIn && (
              <div className="flex items-center gap-8 text-base">
                {[
                  { to: "/tribbus", label: "Mis Tribbus" },
                  { to: "/create-tribbu", label: "Crear Tribbu" },
                  { to: "/events", label: "Eventos" },
                ].map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    className={`relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-indigo-200 after:transition-all ${isActive(to)}`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="justify-self-end flex items-center gap-5 text-base">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="hover:text-indigo-100">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-white/90 text-indigo-600 px-4 py-1.5 rounded-full font-medium
                             hover:bg-white hover:scale-105 transition transform"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-300 flex items-center justify-center text-indigo-800 font-bold">
                    {user?.name?.[0]}
                  </div>
                  <span className="hidden sm:block">{user?.name}</span>
                </div>

                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 rounded-full border border-white/70
                             hover:bg-white/10 transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
