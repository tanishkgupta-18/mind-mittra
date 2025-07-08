export default function UserAnalytics() {
    // Mock user data
    const latestScore = 18; // Replace this with real score from backend
    const totalPossible = 30; // 10 questions × max 3 points
  
    let level = "";
    if (latestScore <= 5) level = "Minimal";
    else if (latestScore <= 10) level = "Mild";
    else if (latestScore <= 20) level = "Moderate";
    else level = "Severe";
  
    const emojiMap = {
      Minimal: "😊",
      Mild: "😐",
      Moderate: "😟",
      Severe: "😢",
    };
  
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <h1 style={styles.title}>Your Mental Health Summary</h1>
  
          <div style={styles.metricBox}>
            <h2 style={styles.label}>Latest Score</h2>
            <p style={styles.value}>{latestScore} / {totalPossible}</p>
          </div>
  
          <div style={styles.metricBox}>
            <h2 style={styles.label}>Assessment</h2>
            <p style={styles.assessment}>
              {level} {emojiMap[level]}
            </p>
          </div>
  
          <div style={styles.progressContainer}>
            <div style={{ ...styles.progressBar, width: `${(latestScore / totalPossible) * 100}%` }} />
          </div>
  
          <p style={styles.note}>
            This result is based on your last questionnaire. If you're feeling down, don't hesitate to reach out. You're not alone.
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
      backgroundColor: "#a761d6",
      transition: "width 0.5s ease-in-out",
    },
    note: {
      fontSize: "1rem",
      color: "#5b3d7a",
      marginTop: 10,
      lineHeight: 1.6,
    },
  };
  