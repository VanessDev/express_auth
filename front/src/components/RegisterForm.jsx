import { useState } from "react";
import { register } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [birthcity, setBirthcity] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const result = await register(email, password, birthday, birthcity);
      console.log(result);

      setMessage("✅ Inscription réussie ! Redirection en cours...");

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.error("erreur", error);
      setMessage("❌ " + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>Inscription</h2>

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
          <label htmlFor="birthday">Date de naissance :</label>
          <input
            type="date"
            id="birthday"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="birthcity">Ville de naissance :</label>
          <input
            type="text"
            id="birthcity"
            value={birthcity}
            onChange={(e) => setBirthcity(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div>
          <button type="submit" disabled={loading}>
            {loading ? "Chargement..." : "S'inscrire"}
          </button>
        </div>
      </form>

      {message && <p>{message}</p>}

      <div style={{ textAlign: "center", marginTop: "10px" }}>
        Déjà un compte ? <Link to="/login">Se connecter</Link>
      </div>
    </div>
  );
}

export default RegisterForm;
