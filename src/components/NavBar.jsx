import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isLoggedIn, isLoading, user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOutUser();
    navigate("/login");
  };

  if (isLoading) return null;

  return (
    <nav className="bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-14">

          <Link
            to="/"
            className="text-lg font-bold text-indigo-500"
          >
            Tribbu
          </Link>

          {!isLoggedIn && (
            <div className="flex items-center gap-4 text-sm">
              <Link
                to="/login"
                className="text-slate-600 hover:text-indigo-500"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-indigo-500 text-white px-3 py-1.5 rounded-md hover:bg-indigo-600 transition"
              >
                Sign up
              </Link>
            </div>
          )}

          {isLoggedIn && (
            <>
              <div className="flex items-center gap-6 text-sm">
                <Link
                  to="/tribbus"
                  className="text-slate-600 hover:text-indigo-500"
                >
                  Mis Tribbus
                </Link>

                <Link
                  to="/create-tribbu"
                  className="text-slate-600 hover:text-indigo-500"
                >
                  Crear Tribbu
                </Link>

                <Link
                  to="/events"
                  className="text-slate-600 hover:text-indigo-500"
                >
                  Eventos
                </Link>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <span className="text-slate-700 font-medium">
                  {user?.name}
                </span>

                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:underline"
                >
                  Logout
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;