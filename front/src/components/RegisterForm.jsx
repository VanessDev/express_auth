import { useState } from "react";
import { register } from "../services/api";

//useState :useState est un hook de React qui permet
// d’ajouter et de mettre à jour un état local dans un composant fonctionnel.

function RegisterForm() {
  //etat pour stocker les valeurs du form
  const [email, setEmail] = useState("");
  //etat pour stocker les messages d'erreur
  const [message, setMessage] = useState("");
  //etat pour savoir si on est en train d'envoyer une requete
  const [loading, setLoading] = useState(false);

  //la fonction utilisée quand on soumet le formulaire
  async function handleSubmit(event) {
    //empeche le rechargement de la page quand on soumet le form
    event.preventDefault();
    //Je change le status du state loading
    setLoading(true);

    alert('je suis en train de soumettre mon form');
  }

  return [
    <div>
        <h2>Inscription</h2>
        {/*  formulaire avec la logique du submit*/}

        <form onSubmit={handleSubmit}>

            <button type="submit">
                {loading ? 'Chargement' : 'S inscrire'}
            </button>

        </form>
        
    </div>
  ]
}

export default RegisterForm