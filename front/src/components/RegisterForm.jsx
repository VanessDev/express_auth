import { useState } from "react";
import { register } from "../services/api";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await register(email, password);
      setMessage("Inscription réussie ");

      setEmail("");
      setPassword("");
    } catch (error) {
      setMessage("Erreur lors de l'inscription ");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>Inscription</h2>

      <form onSubmit={handleSubmit}>
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

        <button type="submit" disabled={loading}>
          {loading ? "Chargement..." : "S'inscrire"}
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default RegisterForm;
