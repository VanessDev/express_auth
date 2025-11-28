import { useState } from "react";
import { register } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function RegisterForm() {
  //etat pour stocker les valeur du form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [birthcity, setBirthcity] = useState("");
  //etat pour stocker les messages d'erreur
  const [message, setMessage] = useState("");
  //etat pour savoir si on est en train d'envoyer une requeste
  const [loading, setLoading] = useState(false);
  //hook pour naviguer vers une autre page
  const navigate = useNavigate();

  //la function utilisé quand on soumet le formulaire
  async function handleSubmit(event) {
    //empeche le rechargement de la page quand on soumet le form
    event.preventDefault();
    //Je change le status du state loading
    setLoading(true);
    setMessage("");
    try {
      //on appelant notre service api
      const result = await register(email, password,birthday,birthcity);
      console.log(result)
      //on affiche un message de succes
      setMessage("Inscription réussie!");
      //faire une redirection vers login
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.error("erreur", error);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>Inscription</h2>

      {/*formulaire avec la logique de submit*/}
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
        <div>
          <label htmlFor="birthday">Date de naissance</label>
          <input
            type="date"
            id="datedenaissance"
            value={birthday}
            onChange={(e) => {
              setBirthday(e.target.value);
            }}
            required
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="birthcity">Ville de naissance</label>
          <input
            type="text"
            id="villedenaissance"
            value={birthcity}
            onChange={(e) => {
              setBirthcity(e.target.value);
            }}
            required
            disabled={loading}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Chargement" : "s inscrire"}
        </button>
      </form>

      {/* afficher les message de succes et d'erreurs */}
      {message}

      <div>
        deja un compte ? <Link to={"/login"}>Se connecter</Link>
      </div>
    </div>
  );
}

export default RegisterForm;
