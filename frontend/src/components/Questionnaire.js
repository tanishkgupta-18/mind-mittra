import { useState } from "react";

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
      // Prepare payload for backend
    const user_id = localStorage.getItem("user_id");

    const payload = { user_id };
    answers.forEach((val, i) => {
      payload[`Q${i + 1}`] = val;
    });


      // Send to Flask backend
      fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((data) => {
          setSeverity(data.severity);
          setSubmitted(true);
        })
        .catch((err) => {
          console.error("Error sending data:", err);
          alert("Something went wrong. Please try again.");
        });
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      setStarted(false); // Back to intro
    }
  };

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
          <h1 style={styles.title}>Thank you for submitting!</h1>
          <p style={styles.resultText}>
            Your predicted severity is: <strong>{severity}</strong>
          </p>
          <p style={styles.note}>
            This result is generated based on your answers. If you're feeling overwhelmed, consider speaking with a mental health professional.
          </p>
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
    fontSize: "2.8rem",
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
    fontFamily: "'Montserrat', sans-serif",
  },
  question: {
    fontSize: "1.8rem",
    fontWeight: "600",
    marginBottom: 25,
  },
  options: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    marginBottom: 40,
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
    transition: "all 0.3s ease",
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
    fontFamily: "'Montserrat', sans-serif",
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
};
