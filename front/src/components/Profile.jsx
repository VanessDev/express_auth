import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const API_USERS_URL = "http://localhost:4000/api/profile";
const API_ANECDOTE_URL = "http://localhost:4000/api/anecdote";

function Profile() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const [anecdote, setAnecdote] = useState("");
  const [anecdoteDate, setAnecdoteDate] = useState("");
  const [anecdoteError, setAnecdoteError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function loadData() {
      try {
        // On charge les users + l'anecdote en parallèle
        const [usersRes, anecdoteRes] = await Promise.all([
          fetch(API_USERS_URL),
          fetch(API_ANECDOTE_URL),
        ]);

        if (!usersRes.ok) {
          throw new Error("Erreur lors du chargement des utilisateurs");
        }

        const usersData = await usersRes.json();
        setUsers(usersData.data || usersData);

        if (anecdoteRes.ok) {
          const anecdoteData = await anecdoteRes.json();
          if (anecdoteData.success) {
            setAnecdote(anecdoteData.anecdote);
            setAnecdoteDate(anecdoteData.date);
          } else {
            setAnecdoteError("Impossible de récupérer l'anecdote.");
          }
        } else {
          setAnecdoteError("Impossible de récupérer l'anecdote.");
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        setErrorMsg("Impossible de charger les données.");
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (errorMsg) return <p>{errorMsg}</p>;

  async function handleDelete(id) {
    if (!window.confirm("Delete this user ?")) return;

    try {
      await fetch(`${API_USERS_URL}/${id}`, {
        method: "DELETE",
        headers: { Accept: "application/json" },
      });

      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression.");
    }
  }

  return (
    <div className="container">
      <h1>Utilisateurs</h1>

      {/* Bloc ANECDOTE */}
      <div className="card" style={{ marginBottom: "1.5rem" }}>
        <h2>Anecdote du jour</h2>
        {anecdoteError && <p>{anecdoteError}</p>}
        {!anecdoteError && (
          <>
            <p>{anecdote}</p>
            {anecdoteDate && (
              <small>Anecdote générée le {anecdoteDate}</small>
            )}
          </>
        )}
      </div>

      {/* Liste des utilisateurs */}
      {users.map((user) => (
        <div key={user.id} className="card">
          <div className="students">
            <div>
              <strong>#{user.id}</strong> — {user.email}
              {user.birthday && <> — Né(e) le : {user.birthday}</>}
              {user.birthcity && <> — Ville de naissance : {user.birthcity}</>}
            </div>

            <div className="btns">
              <div>
                <button onClick={() => navigate(`/edit/${user.id}`)}>
                  Modifier
                </button>
              </div>

              <div>
                <button
                  className="btn danger"
                  onClick={() => handleDelete(user.id)}
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="btns">
        <div>
          <button onClick={() => navigate("/create")}>
            Ajouter un utilisateur
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
