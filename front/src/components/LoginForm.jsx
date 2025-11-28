import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/api";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    try {
      const result = await login(email, password);
      //je stocke mon token dans le localStorage
      localStorage.setItem('token',result.token);
      setMessage('connexion reussie');
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h2>page login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="password">MDP:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            disabled={loading}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Chargement" : "se connecter"}
        </button>
      </form>

      {/* afficher les message de succes et d'erreurs */}
      {message}

      <div>
        pas de compte ? <Link to={"/register"}>S'inscrire</Link>
      </div>
    </>
  );
}

export default LoginForm;
