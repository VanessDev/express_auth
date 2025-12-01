import { useState } from "react";
import { login } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

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
      console.log(result);

      // stockage du token si présent dans la réponse
      if (result.token) {
        localStorage.setItem("token", result.token);
      }

      setMessage("✅ Connexion réussie ! Redirection...");

      setTimeout(() => {
        navigate("/profilepage"); // redirection logique vers ta belle page profil
      }, 2000);
    } catch (error) {
      console.error("erreur", error);
      setMessage("❌ " + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>Connexion</h2>

      <form className="myform" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="password">Mot de passe :</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div>
          <button type="submit" disabled={loading}>
            {loading ? "Chargement..." : "Se connecter"}
          </button>
        </div>
      </form>

      {message && <p>{message}</p>}

      <div style={{ textAlign: "center", marginTop: "10px" }}>
        Pas de compte ? <Link to="/register">S'inscrire</Link>
      </div>
    </div>
  );
}

export default LoginForm;
