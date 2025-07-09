import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function UserAnalytics() {
  const [loading, setLoading] = useState(true);
  const [latestScore, setLatestScore] = useState(null);
  const [totalPossible, setTotalPossible] = useState(30);
  const [level, setLevel] = useState("");
  const [error, setError] = useState(null);
  const [scoreHistory, setScoreHistory] = useState([]);

  const emojiMap = {
    Minimal: "😊",
    Mild: "😐",
    Moderate: "😟",
    Severe: "😢",
  };

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      setError("User ID not found. Please log in.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const [summaryRes, historyRes] = await Promise.all([
          fetch(`http://localhost:5000/latest-score/${userId}`),
          fetch(`http://localhost:5000/user-scores/${userId}`),

        ]);

        if (!summaryRes.ok) throw new Error("Failed to fetch latest score");
        if (!historyRes.ok) throw new Error("Failed to fetch score history");

        const summaryData = await summaryRes.json();
        const historyData = await historyRes.json();

        setLatestScore(summaryData.score);
        setLevel(summaryData.severity);
        if (Array.isArray(historyData)) {
          setScoreHistory(historyData);
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Could not fetch user data. Please log in.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getBarColor = () => {
    const percentage = (latestScore / totalPossible) * 100;
    if (percentage <= 33) return "#4CAF50"; // green
    if (percentage <= 66) return "#FFC107"; // yellow
    return "#F44336"; // red
  };

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <h1 style={styles.title}>Loading your analytics...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <h1 style={styles.title}>Error</h1>
          <p style={styles.note}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Your Mental Health Summary</h1>

        <div style={styles.metricBox}>
          <h2 style={styles.label}>Latest Score</h2>
          <p style={styles.value}>
            {latestScore} / {totalPossible}
          </p>
        </div>

        <div style={styles.metricBox}>
          <h2 style={styles.label}>Assessment</h2>
          <p style={styles.assessment}>
            {level} {emojiMap[level]}
          </p>
        </div>

        <div style={styles.progressContainer}>
          <div
            style={{
              ...styles.progressBar,
              width: `${(latestScore / totalPossible) * 100}%`,
              backgroundColor: getBarColor(),
            }}
          />
        </div>

        <h2 style={styles.label}>Score Over Time</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={scoreHistory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="id" />
            <YAxis domain={[0, totalPossible]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#8884d8"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>

        <p style={styles.note}>
          This result is based on your last questionnaire. If you're feeling
          down, don't hesitate to reach out. You're not alone.
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "60px 20px",
    background: "linear-gradient(135deg, #f3e7fe 0%, #c3a4f9 100%)",
    fontFamily: "'Montserrat', sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  card: {
    maxWidth: 600,
    background: "white",
    borderRadius: 20,
    padding: 40,
    boxShadow: "0 15px 40px rgba(179, 102, 214, 0.3)",
    color: "#4a2a7a",
    textAlign: "center",
  },
  title: {
    fontSize: "2.8rem",
    fontWeight: "700",
    marginBottom: 30,
  },
  metricBox: {
    marginBottom: 20,
  },
  label: {
    fontSize: "1.2rem",
    color: "#6b4f9a",
    marginBottom: 6,
  },
  value: {
    fontSize: "2rem",
    fontWeight: "600",
    color: "#342e69",
  },
  assessment: {
    fontSize: "2rem",
    fontWeight: "600",
    color: "#8235c9",
  },
  progressContainer: {
    height: 20,
    width: "100%",
    backgroundColor: "#eee",
    borderRadius: 10,
    overflow: "hidden",
    margin: "30px 0",
  },
  progressBar: {
    height: "100%",
    transition: "width 0.5s ease-in-out",
  },
  note: {
    fontSize: "1rem",
    color: "#5b3d7a",
    marginTop: 10,
    lineHeight: 1.6,
  },
};