import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfil } from "../services/api";
import "../App.css";

function ProfilePage() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function handleProfile() {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const data = await getProfil(token);
        setUser(data.user);
      } catch (error) {
        console.log("erreur", error);
        setError(error.message);

        if (error.message.includes("401") || error.message.includes("Token")) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    }

    handleProfile();
  }, [navigate]);

  function Deco() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  if (loading) {
    return <p className="profile-message">Chargement...</p>;
  }

  if (error) {
    return <p className="profile-message">{error}</p>;
  }

  return (
    <div className="profile-page">
      <h2 className="profile-title">Profile</h2>

      {user && (
        <div className="profile-card">
          <div className="profile-line">
            <strong>ID</strong> <span>{user.id}</span>
          </div>

          <div className="profile-line">
            <strong>Email</strong> <span>{user.email}</span>
          </div>

          <div className="profile-line">
            <strong>Inscrit le</strong>
            <span>{new Date(user.created_at).toLocaleDateString()}</span>
          </div>

          <div className="profile-line">
            <strong>Date de naissance</strong> <span>{user.birthday}</span>
          </div>

          <div className="profile-line">
            <strong>Ville de naissance</strong> <span>{user.birthcity}</span>
          </div>

          <button className="profile-btn" onClick={Deco}>
            Déconnexion
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
