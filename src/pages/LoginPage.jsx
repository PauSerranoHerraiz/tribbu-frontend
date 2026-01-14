import { useState, useEffect, useContext } from "react";  // Agregado useState y useContext
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function LoginPage() {
  const { login, isLoggedIn } = useContext(AuthContext);  // Usar useContext en lugar de useAuth
  const navigate = useNavigate();
  const [email, setEmail] = useState("");  // Estado para email
  const [password, setPassword] = useState("");  // Estado para password

  useEffect(() => {
    if (isLoggedIn) {  // Cambiado a isLoggedIn
      navigate("/gate");
    }
  }, [isLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);  // Ahora usa la función del contexto
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email" 
        required 
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password" 
        required 
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginPage;