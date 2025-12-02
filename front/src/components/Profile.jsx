import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const API_URL = "http://localhost:4000/api/profile";

function Profile() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch(API_URL)
      .then((r) => {
        if (!r.ok) {
          throw new Error("Erreur lors du chargement des utilisateurs");
        }
        return r.json();
      })
      .then((data) => {
        // si ton backend renvoie { data: [...] }
        setUsers(data.data || data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setErrorMsg("Impossible de charger les utilisateurs.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (errorMsg) return <p>{errorMsg}</p>;

  async function handleDelete(id) {
    if (!window.confirm("Delete this user ?")) return;

    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { Accept: "application/json" },
      });

      // on met à jour la liste localement
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression.");
    }
  }

  return (
    <div className="container">
      <h1>Utilisateurs</h1>

      {users.map((user) => (
        <div key={user.id} className="card">
          <div className="students">
            <div>
              <strong>{user.id}.</strong> {user.name} - {user.age} ans
              {user.note !== undefined && <> - Note: {user.note}</>}
              {user.city && <> - City: {user.city}</>}
            </div>

            <div className="btns">
              <div>
                <button onClick={() => navigate(`/edit/${user.id}`)}>
                  Modify User
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
          <button onClick={() => navigate("/create")}>Add a user</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
