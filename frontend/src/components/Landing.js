import React, { useState } from "react";

export default function Landing() {
  // Mock auth state - replace with your real auth logic
  const [user, setUser] = useState(null);

  // Modal visible state
  const [showModal, setShowModal] = useState(false);

  const handleStart = () => {
    if (!user) {
      setShowModal(true);
    } else {
      window.location.href = "/check";
    }
  };

  const closeModal = () => setShowModal(false);

  const goToLogin = () => {
    setShowModal(false);
    window.location.href = "/login";
  };

  return (
    <div style={styles.page}>
      <div style={styles.contentWrapper}>
        <div style={styles.textBlock}>
          <h1 style={styles.title}>
            Mental <span style={styles.highlight}>Health Analyzer</span>
          </h1>
          <p style={styles.subtitle}>
            Gain insights into your emotional well-being through a simple, powerful questionnaire. 
            Track changes. Stay in control. Prioritize your mental health with confidence.
          </p>
          <div style={styles.buttons}>
            <button 
              onClick={handleStart} 
              style={{ ...styles.button, ...styles.primary }}
            >
              Start Questionnaire
            </button>
            <a href="/login" style={{ ...styles.button, ...styles.secondary }}>
              Login / Sign Up
            </a>
          </div>
        </div>

        <div style={styles.imageBlock}>
          <img
            src="/mental-health2.avif"
            alt="mental health illustration"
            style={styles.image}
          />
        </div>
      </div>

      {/* Modal Overlay */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2 style={styles.modalTitle}>Please Login First</h2>
            <p style={styles.modalText}>
              You need to register or login to start the questionnaire.
            </p>
            <div style={styles.modalButtons}>
              <button style={styles.modalButton} onClick={goToLogin}>
                Go to Login
              </button>
              <button
                style={{ ...styles.modalButton, ...styles.modalCancelButton }}
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg, #f3e7fe 0%, #c3a4f9 100%)",
    fontFamily: "'Montserrat', sans-serif",
    padding: "40px 20px",
    position: "relative",
    overflow: "hidden",
  },
  contentWrapper: {
    display: "flex",
    maxWidth: 1200,
    width: "100%",
    gap: 60,
    alignItems: "center",
  },
  textBlock: {
    flex: 1,
    color: "#4a2a7a",
  },
  title: {
    fontSize: "3.4rem",
    fontWeight: "700",
    marginBottom: 24,
  },
  highlight: {
    color: "#a761d6",
  },
  subtitle: {
    fontSize: "1.4rem",
    lineHeight: 1.5,
    marginBottom: 40,
    color: "#6b4f9a",
  },
  buttons: {
    display: "flex",
    gap: 24,
    fontFamily: "'Montserrat', sans-serif",
  },
  button: {
    padding: "16px 36px",
    borderRadius: 14,
    fontWeight: "600",
    fontSize: "1.15rem",
    cursor: "pointer",
    textDecoration: "none",
    border: "none",
    transition: "background-color 0.3s ease",
    fontFamily: "'Montserrat', sans-serif",
  },
  primary: {
    backgroundColor: "#a761d6",
    color: "white",
    boxShadow: "0 8px 24px rgba(167, 97, 214, 0.6)",
  },
  secondary: {
    backgroundColor: "#f0e5fc",
    color: "#6b4f9a",
    boxShadow: "0 6px 18px rgba(179, 102, 214, 0.25)",
  },
  imageBlock: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: "auto",
    borderRadius: 20,
    boxShadow: "0 15px 40px rgba(179, 102, 214, 0.3)",
  },

  /* Modal styles */
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 40,
    maxWidth: 400,
    width: "90%",
    boxShadow: "0 10px 30px rgba(167, 97, 214, 0.4)",
    textAlign: "center",
    color: "#4a2a7a",
  },
  modalTitle: {
    fontSize: "1.8rem",
    fontWeight: "700",
    marginBottom: 16,
  },
  modalText: {
    fontSize: "1.1rem",
    marginBottom: 28,
    color: "#6b4f9a",
    fontFamily: "'Montserrat', sans-serif",
  },
  modalButtons: {
    display: "flex",
    justifyContent: "center",
    gap: 20,
    fontFamily: "'Montserrat', sans-serif",
  },
  modalButton: {
    padding: "12px 30px",
    borderRadius: 14,
    fontWeight: "600",
    fontSize: "1.1rem",
    cursor: "pointer",
    border: "none",
    backgroundColor: "#a761d6",
    color: "white",
    boxShadow: "0 8px 24px rgba(167, 97, 214, 0.6)",
    transition: "background-color 0.3s ease",
    fontFamily: "'Montserrat', sans-serif",
  },
  modalCancelButton: {
    backgroundColor: "#f0e5fc",
    color: "#6b4f9a",
    boxShadow: "0 6px 18px rgba(179, 102, 214, 0.25)",
  },
};