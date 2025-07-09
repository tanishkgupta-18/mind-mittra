import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      navigate("/"); // if not logged in
      return;
    }

    fetch(`http://localhost:5000/user/${userId}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
          navigate("/");
        } else {
          setProfile(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load profile:", err);
        setLoading(false);
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    navigate("/");
  };

  if (loading) return <div style={styles.loading}>Loading profile...</div>;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.heading}>👋 Welcome, {profile.fullname}</h1>
        <p style={styles.subtext}>📧 {profile.email}</p>
        <button onClick={handleLogout} style={styles.logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #d4c2fc 0%, #8a77d9 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Montserrat', sans-serif",
    padding: "2rem",
  },
  card: {
    background: "#fff",
    borderRadius: "20px",
    padding: "50px 60px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
    textAlign: "center",
    maxWidth: "500px",
    width: "100%",
  },
  heading: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
    color: "#4b3c84",
  },
  subtext: {
    fontSize: "1.2rem",
    marginBottom: "2.5rem",
    color: "#6b6b6b",
  },
  logout: {
    background: "#7a5cc9",
    color: "#fff",
    padding: "14px 32px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    fontSize: "1.05rem",
    fontWeight: "600",
    boxShadow: "0 8px 20px rgba(122, 92, 201, 0.4)",
    transition: "background 0.3s ease",
  },
  loading: {
    fontFamily: "'Montserrat', sans-serif",
    padding: "2rem",
    fontSize: "1.4rem",
    textAlign: "center",
    color: "#fff",
  },
};
