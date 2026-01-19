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
        <nav className="bg-indigo-500 text-white">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-3 items-center h-14">

                    <div className="flex items-center gap-6">
                        <Link to="/" className="text-lg font-bold text-white">
                            <img className="logo" src="public/images/tribbu-logo.png" alt="Tribbu Logo" />
                        </Link>
                    </div>

                    <div className="justify-self-center">
                        {isLoggedIn && (
                            <div className="flex items-center gap-6 text-sm">
                                <Link to="/tribbus" className="hover:text-indigo-100">
                                    Mis Tribbus
                                </Link>
                                <Link to="/create-tribbu" className="hover:text-indigo-100">
                                    Crear Tribbu
                                </Link>
                                <Link to="/events" className="hover:text-indigo-100">
                                    Eventos
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="justify-self-end flex items-center gap-4 text-sm">
                        {!isLoggedIn ? (
                            <>
                                <Link to="/login" className="text-white hover:text-indigo-100">
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="bg-white text-indigo-600 px-3 py-1.5 rounded-md hover:bg-indigo-50 transition"
                                >
                                    Sign up
                                </Link>
                            </>
                        ) : (
                            <>
                                <span className="font-medium text-indigo-50">
                                    {user?.name}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="px-3 py-1.5 rounded-md border border-white text-white hover:bg-indigo-600 transition"
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