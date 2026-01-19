import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth.service";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    authService
      .signup({ email, password, name })
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        setErrorMessage(error.response?.data?.message || "Signup error");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 space-y-6">

        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-slate-800">
            Crea tu cuenta
          </h1>
          <p className="text-sm text-slate-500">
            Empieza a construir tu tribu
          </p>
        </div>

        <form onSubmit={handleSignupSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Nombre
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {errorMessage && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 rounded-md transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center text-slate-500">
          ¿Ya tienes cuenta?{" "}
          <Link
            to="/login"
            className="text-indigo-500 hover:underline font-medium"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default SignupPage;
