import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import ClipLoader from "react-spinners/ClipLoader";
import html2pdf from "html2pdf.js";

const SimpleMap = ({ location }) => {
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${location.lng - 0.01},${location.lat - 0.01},${location.lng + 0.01},${location.lat + 0.01}&layer=mapnik&marker=${location.lat},${location.lng}`;
  return (
    <div style={styles.mapContainer}>
      <iframe
        width="100%"
        height="300"
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        src={mapUrl}
        style={{ borderRadius: "16px" }}
        title="Location Map"
      />
    </div>
  );
};

const questions = [
  "I feel overwhelmed by my daily responsibilities.",
  "I have trouble sleeping or staying asleep.",
  "I feel anxious or nervous without a clear reason.",
  "I find it hard to enjoy things I used to like.",
  "I feel fatigued even after resting.",
  "I avoid social interactions or feel withdrawn.",
  "I have trouble focusing or concentrating.",
  "I often feel hopeless about the future.",
  "I get irritated or angry more than usual.",
  "I struggle to manage stress or emotions.",
];

const options = [
  { label: "Not at all", score: 0 },
  { label: "Several days", score: 1 },
  { label: "More than half the days", score: 2 },
  { label: "Nearly every day", score: 3 },
];

export default function Questionnaire() {
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [severity, setSeverity] = useState(null);
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("summary");
  const [mapsLink, setMapsLink] = useState("");
  const [location, setLocation] = useState(null);

  const handleOptionChange = (score) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = score;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (answers[currentQuestion] === null) {
      alert("Please select an option before moving on.");
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const user_id = localStorage.getItem("user_id") || "user_" + Date.now();
      const payload = { user_id };
      answers.forEach((val, i) => {
        payload[`Q${i + 1}`] = val;
      });

      setLoading(true);

      fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((data) => {
          setSeverity(data.severity);
          setAdvice(data.advice);
          setSubmitted(true);
        })
        .catch((err) => {
          console.error("Error sending data:", err);
          alert("Something went wrong. Please try again.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      setStarted(false);
    }
  };

  const findNearby = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const link = `https://www.google.com/maps/search/mental+health+clinics/@${latitude},${longitude},14z`;
          setMapsLink(link);
          setLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert("Could not get location. Please check your browser settings and try again.");
        }
      );
    } else {
      alert("Geolocation not supported by your browser.");
    }
  };

  const downloadPDF = () => {
    const element = document.getElementById("advice-content");
    html2pdf().from(element).save("Mental_Health_Advice.pdf");
  };

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <h2 style={styles.title}>Please wait...</h2>
          <p style={styles.subtitle}>Analyzing your answers and generating result.</p>
          <ClipLoader color="#a761d6" size={60} />
        </div>
      </div>
    );
  }

  if (!started) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <h1 style={styles.title}>Mental Health Questionnaire</h1>
          <p style={styles.subtitle}>
            Please answer a few simple questions about how you've been feeling lately.
          </p>
          <button style={styles.startButton} onClick={() => setStarted(true)}>
            Start Questionnaire
          </button>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <h1 style={styles.title}>Your Results</h1>

          <div style={styles.tabs}>
            <button
              style={{ ...styles.tab, ...(activeTab === "summary" ? styles.activeTab : {}) }}
              onClick={() => setActiveTab("summary")}
            >
              Summary
            </button>
            <button
              style={{ ...styles.tab, ...(activeTab === "advice" ? styles.activeTab : {}) }}
              onClick={() => setActiveTab("advice")}
            >
              Advice
            </button>
            <button
              style={{ ...styles.tab, ...(activeTab === "nearby" ? styles.activeTab : {}) }}
              onClick={() => setActiveTab("nearby")}
            >
              Nearby Help
            </button>
          </div>

          {activeTab === "summary" && (
            <div>
              <p style={styles.resultText}>
                Your predicted severity is: <strong>{severity}</strong>
              </p>
              <p style={styles.note}>
                This result is based on your answers. If you're feeling overwhelmed,
                consider speaking with a mental health professional.
              </p>
            </div>
          )}

          {activeTab === "advice" && (
            <div style={styles.adviceBox} id="advice-content">
              <h3 style={styles.adviceTitle}>Personalized Advice</h3>
              <ReactMarkdown style={styles.adviceText}>{advice}</ReactMarkdown>
              <button style={styles.downloadButton} onClick={downloadPDF}>
                📄 Download Advice as PDF
              </button>
            </div>
          )}

          {activeTab === "nearby" && (
            <div>
              <button style={styles.navButton} onClick={findNearby}>
                Find Nearby Practitioners
              </button>

              {location && (
                <div style={{ marginTop: "20px" }}>
                  <SimpleMap location={location} />
                  <p style={styles.locationText}>
                    📍 Your location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                  </p>
                </div>
              )}

              {mapsLink && (
                <p style={{ marginTop: "1rem" }}>
                  <a href={mapsLink} target="_blank" rel="noopener noreferrer" style={styles.mapsLink}>
                    🗺 Show more nearby clinics on Google Maps →
                  </a>
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.question}>
          {currentQuestion + 1}. {questions[currentQuestion]}
        </h2>

        <div style={styles.progress}>
          <div
            style={{
              ...styles.progressBar,
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            }}
          ></div>
          <span style={styles.progressText}>
            {currentQuestion + 1} of {questions.length}
          </span>
        </div>

        <div style={styles.options}>
          {options.map(({ label, score }) => {
            const selected = answers[currentQuestion] === score;
            return (
              <label
                key={score}
                style={{
                  ...styles.optionLabel,
                  backgroundColor: selected ? "#a761d6" : "transparent",
                  color: selected ? "white" : "#5b3d7a",
                  borderColor: selected ? "#8b4fcf" : "transparent",
                }}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion}`}
                  value={score}
                  checked={selected}
                  onChange={() => handleOptionChange(score)}
                  style={styles.hiddenRadio}
                />
                <span style={styles.customRadio}></span>
                {label}
              </label>
            );
          })}
        </div>

        <div style={styles.buttons}>
          <button style={styles.navButton} onClick={handleBack}>
            Back
          </button>
          <button style={styles.navButton} onClick={handleNext}>
            {currentQuestion === questions.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
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
  container: {
    maxWidth: 700,
    background: "white",
    borderRadius: 20,
    padding: 40,
    boxShadow: "0 15px 40px rgba(179, 102, 214, 0.3)",
    color: "#4a2a7a",
    width: "100%",
    textAlign: "center",
  },
  title: {
    fontSize: "2.4rem",
    fontWeight: "700",
    marginBottom: 15,
  },
  subtitle: {
    fontSize: "1.2rem",
    marginBottom: 40,
    color: "#6b4f9a",
  },
  startButton: {
    backgroundColor: "#a761d6",
    border: "none",
    borderRadius: 16,
    padding: "16px 40px",
    color: "white",
    fontWeight: "700",
    fontSize: "1.3rem",
    cursor: "pointer",
    boxShadow: "0 10px 28px rgba(167, 97, 214, 0.7)",
    transition: "background-color 0.3s ease",
  },
  tabs: {
    display: "flex",
    justifyContent: "center",
    gap: 10,
    marginBottom: 20,
  },
  tab: {
    padding: "10px 20px",
    border: "2px solid #a761d6",
    borderRadius: 10,
    background: "white",
    color: "#a761d6",
    cursor: "pointer",
    fontWeight: "600",
  },
  activeTab: {
    background: "#a761d6",
    color: "white",
  },
  question: {
    fontSize: "1.8rem",
    fontWeight: "600",
    marginBottom: 25,
  },
  progress: {
    width: "100%",
    height: "6px",
    backgroundColor: "#e0e0e0",
    borderRadius: "3px",
    marginBottom: 20,
    position: "relative",
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#a761d6",
    borderRadius: "3px",
    transition: "width 0.3s ease",
  },
  progressText: {
    position: "absolute",
    top: "10px",
    right: "0",
    fontSize: "0.9rem",
    color: "#6b4f9a",
  },
  options: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    marginBottom: 40,
    marginTop: 30,
  },
  optionLabel: {
    fontSize: "1.1rem",
    cursor: "pointer",
    userSelect: "none",
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 20px",
    borderRadius: 20,
    border: "2px solid transparent",
    transition: "all 0.25s ease",
    minWidth: 280,
    boxShadow: "0 3px 8px rgba(167, 97, 214, 0.15)",
    margin: "0 auto",
  },
  hiddenRadio: {
    position: "absolute",
    opacity: 0,
    width: 0,
    height: 0,
  },
  customRadio: {
    width: 22,
    height: 22,
    borderRadius: "50%",
    border: "2.5px solid #a761d6",
    backgroundColor: "white",
    boxShadow: "0 0 2px rgba(167, 97, 214, 0.7)",
    flexShrink: 0,
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    gap: 24,
    maxWidth: 320,
    margin: "0 auto",
  },
  navButton: {
    backgroundColor: "#a761d6",
    border: "none",
    borderRadius: 16,
    padding: "14px 36px",
    color: "white",
    fontWeight: "700",
    fontSize: "1.15rem",
    cursor: "pointer",
    boxShadow: "0 10px 28px rgba(167, 97, 214, 0.7)",
    transition: "background-color 0.3s ease",
  },
  resultText: {
    fontSize: "1.4rem",
    fontWeight: "600",
    marginBottom: 12,
  },
  note: {
    fontSize: "1.1rem",
    color: "#6b4f9a",
  },
  adviceBox: {
    marginTop: 10,
    padding: 20,
    backgroundColor: "#f5e9ff",
    borderRadius: 16,
    boxShadow: "0 4px 12px rgba(167, 97, 214, 0.2)",
    textAlign: "left",
  },
  adviceTitle: {
    fontSize: "1.3rem",
    fontWeight: "700",
    marginBottom: 10,
    color: "#5b3d7a",
  },
  adviceText: {
    fontSize: "1.05rem",
    color: "#4a2a7a",
  },
  downloadButton: {
    backgroundColor: "#a761d6",
    border: "none",
    borderRadius: 12,
    padding: "10px 20px",
    color: "white",
    fontWeight: "600",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "20px",
    boxShadow: "0 4px 12px rgba(167, 97, 214, 0.3)",
  },
  mapContainer: {
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(167, 97, 214, 0.2)",
  },
  locationText: {
    fontSize: "0.9rem",
    color: "#6b4f9a",
    marginTop: "10px",
    fontStyle: "italic",
  },
  mapsLink: {
    color: "#a761d6",
    textDecoration: "none",
    fontWeight: "600",
  },
};