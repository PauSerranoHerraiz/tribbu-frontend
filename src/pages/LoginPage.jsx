import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import authService from "../services/auth.service";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const {
    storeToken,
    authenticateUser,
    isLoggedIn,
    isLoading,
  } = useContext(AuthContext);

  // Si ya estás logueado, ve al home
  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(null);

    authService
      .login({ email, password })
      .then((response) => {
        const token = response.data.authToken;
        storeToken(token);          // guarda token en localStorage
        return authenticateUser();  // actualiza contexto con el user
      })
      .then(() => navigate("/"))    // redirige a home
      .catch((error) => {
        const message =
          error.response?.data?.message || "Error al iniciar sesión";
        setErrorMessage(message);
      });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-slate-600 text-lg">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 w-full max-w-sm space-y-4"
      >
        <h1 className="text-2xl font-semibold text-slate-800">Login</h1>

        {errorMessage && (
          <p className="text-sm text-red-600">{errorMessage}</p>
        )}

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            type="email"
            className="border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-slate-700">
            Contraseña
          </label>
          <input
            type="password"
            className="border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md transition"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default LoginPage;