// import React, { useEffect, useState } from "react";

// export default function Landing() {
//   const [user, setUser] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   // On component mount, check if user_id is in localStorage
//   useEffect(() => {
//     const userId = localStorage.getItem("user_id");
//     if (userId) {
//       fetch(`http://localhost:5000/user/${userId}`)
//         .then(res => res.json())
//         .then(data => {
//           if (!data.error) {
//             setUser(data);
//           }
//         })
//         .catch(err => console.error("Profile fetch failed:", err));
//     }
//   }, []);

//   const handleStart = () => {
//     if (!user) {
//       setShowModal(true);
//     } else {
//       window.location.href = "/check"; // questionnaire page
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("user_id");
//     setUser(null);
//   };

//   const closeModal = () => setShowModal(false);

//   const goToLogin = () => {
//     setShowModal(false);
//     window.location.href = "/login";
//   };

//   return (
//     <div style={styles.page}>
//       <div style={styles.contentWrapper}>
//         <div style={styles.textBlock}>
//           <h1 style={styles.title}>
//             Mental <span style={styles.highlight}>Health Analyzer</span>
//           </h1>
//           <p style={styles.subtitle}>
//             Gain insights into your emotional well-being through a simple, powerful questionnaire. 
//             Track changes. Stay in control. Prioritize your mental health with confidence.
//           </p>

//           {user ? (
//             <div style={styles.profileCard}>
//               <h3>👋 Welcome back, <strong>{user.fullname}</strong></h3>
//               <p>📧 {user.email}</p>
//               <div style={{ marginTop: 16 }}>
//                 <button onClick={handleStart} style={styles.primary}>Start Questionnaire</button>
//                 <button onClick={handleLogout} style={styles.logout}>Logout</button>
//               </div>
//             </div>
//           ) : (
//             <div style={styles.buttons}>
//               <button 
//                 onClick={handleStart} 
//                 style={{ ...styles.button, ...styles.primary }}
//               >
//                 Start Questionnaire
//               </button>
//               <a href="/login" style={{ ...styles.button, ...styles.secondary }}>
//                 Login / Sign Up
//               </a>
//             </div>
//           )}
//         </div>

//         <div style={styles.imageBlock}>
//           <img
//             src="/mental-health2.avif"
//             alt="mental health illustration"
//             style={styles.image}
//           />
//         </div>
//       </div>

//       {showModal && (
//         <div style={styles.modalOverlay}>
//           <div style={styles.modal}>
//             <h2 style={styles.modalTitle}>Please Login First</h2>
//             <p style={styles.modalText}>
//               You need to register or login to start the questionnaire.
//             </p>
//             <div style={styles.modalButtons}>
//               <button style={styles.modalButton} onClick={goToLogin}>
//                 Go to Login
//               </button>
//               <button
//                 style={{ ...styles.modalButton, ...styles.modalCancelButton }}
//                 onClick={closeModal}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// const styles = {
//     profileCard: {
//     backgroundColor: "#fefbff",
//     padding: "24px",
//     borderRadius: "16px",
//     boxShadow: "0 8px 24px rgba(167, 97, 214, 0.3)",
//     color: "#4a2a7a",
//     maxWidth: "400px",
//     marginTop: "20px",
//   },
//   logout: {
//     marginLeft: "12px",
//     backgroundColor: "#f8e6ff",
//     color: "#9147a9",
//     padding: "12px 24px",
//     borderRadius: "12px",
//     border: "none",
//     cursor: "pointer",
//     fontWeight: "600",
//     fontSize: "1rem",
//   },

//   page: {
//     minHeight: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     background:
//       "linear-gradient(135deg, #f3e7fe 0%, #c3a4f9 100%)",
//     fontFamily: "'Montserrat', sans-serif",
//     padding: "40px 20px",
//     position: "relative",
//     overflow: "hidden",
//   },
//   contentWrapper: {
//     display: "flex",
//     maxWidth: 1200,
//     width: "100%",
//     gap: 60,
//     alignItems: "center",
//   },
//   textBlock: {
//     flex: 1,
//     color: "#4a2a7a",
//   },
//   title: {
//     fontSize: "3.4rem",
//     fontWeight: "700",
//     marginBottom: 24,
//   },
//   highlight: {
//     color: "#a761d6",
//   },
//   subtitle: {
//     fontSize: "1.4rem",
//     lineHeight: 1.5,
//     marginBottom: 40,
//     color: "#6b4f9a",
//   },
//   buttons: {
//     display: "flex",
//     gap: 24,
//     fontFamily: "'Montserrat', sans-serif",
//   },
//   button: {
//     padding: "16px 36px",
//     borderRadius: 14,
//     fontWeight: "600",
//     fontSize: "1.15rem",
//     cursor: "pointer",
//     textDecoration: "none",
//     border: "none",
//     transition: "background-color 0.3s ease",
//     fontFamily: "'Montserrat', sans-serif",
//   },
//   primary: {
//     backgroundColor: "#a761d6",
//     color: "white",
//     boxShadow: "0 8px 24px rgba(167, 97, 214, 0.6)",
//   },
//   secondary: {
//     backgroundColor: "#f0e5fc",
//     color: "#6b4f9a",
//     boxShadow: "0 6px 18px rgba(179, 102, 214, 0.25)",
//   },
//   imageBlock: {
//     flex: 1,
//   },
//   image: {
//     width: "100%",
//     height: "auto",
//     borderRadius: 20,
//     boxShadow: "0 15px 40px rgba(179, 102, 214, 0.3)",
//   },

//   /* Modal styles */
//   modalOverlay: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: "rgba(0,0,0,0.4)",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 1000,
//   },
//   modal: {
//     backgroundColor: "white",
//     borderRadius: 20,
//     padding: 40,
//     maxWidth: 400,
//     width: "90%",
//     boxShadow: "0 10px 30px rgba(167, 97, 214, 0.4)",
//     textAlign: "center",
//     color: "#4a2a7a",
//   },
//   modalTitle: {
//     fontSize: "1.8rem",
//     fontWeight: "700",
//     marginBottom: 16,
//   },
//   modalText: {
//     fontSize: "1.1rem",
//     marginBottom: 28,
//     color: "#6b4f9a",
//     fontFamily: "'Montserrat', sans-serif",
//   },
//   modalButtons: {
//     display: "flex",
//     justifyContent: "center",
//     gap: 20,
//     fontFamily: "'Montserrat', sans-serif",
//   },
//   modalButton: {
//     padding: "12px 30px",
//     borderRadius: 14,
//     fontWeight: "600",
//     fontSize: "1.1rem",
//     cursor: "pointer",
//     border: "none",
//     backgroundColor: "#a761d6",
//     color: "white",
//     boxShadow: "0 8px 24px rgba(167, 97, 214, 0.6)",
//     transition: "background-color 0.3s ease",
//     fontFamily: "'Montserrat', sans-serif",
//   },
//   modalCancelButton: {
//     backgroundColor: "#f0e5fc",
//     color: "#6b4f9a",
//     boxShadow: "0 6px 18px rgba(179, 102, 214, 0.25)",
//   },
// };

import React, { useEffect, useState } from "react";

export default function Landing() {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      fetch(`http://localhost:5000/user/${userId}`)
        .then(res => res.json())
        .then(data => {
          if (!data.error) {
            setUser(data);
          }
        })
        .catch(err => console.error("Profile fetch failed:", err));
    }
  }, []);

  const handleStart = () => {
    if (!user) {
      setShowModal(true);
    } else {
      window.location.href = "/check";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    setUser(null);
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
            Mind <span style={styles.highlight}>Mittra</span>
          </h1>
          <p style={styles.subtitle}>
            🌿 Discover emotional clarity through our powerful mental wellness tool.
            <br /> Personalized insights, consistent tracking, and empowering growth.
          </p>

          {user ? (
            <div style={styles.glassCard}>
              <h3 style={styles.welcomeText}>👋 Welcome back, <strong>{user.fullname}</strong></h3>
              <p style={styles.emailText}>📧 {user.email}</p>
              <div style={styles.cardButtons}>
                <button onClick={handleStart} style={styles.primaryBtn}>
                  Start Questionnaire
                </button>
                {/* <button onClick={handleLogout} style={styles.secondaryBtn}>
                  Logout
                </button> */}
              </div>
            </div>
          ) : (
            <div style={styles.buttons}>
              <button onClick={handleStart} style={styles.primaryBtn}>
                Start Questionnaire
              </button>
              <a href="/login" style={styles.secondaryBtn}>
                Login / Sign Up
              </a>
            </div>
          )}
        </div>

        <div style={styles.imageBlock}>
          <img
            src="/mentalHealth.png"
            alt="mental health"
            style={styles.image}
          />
        </div>
      </div>

      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2 style={styles.modalTitle}>Please Login First</h2>
            <p style={styles.modalText}>
              You need to register or login to start the questionnaire.
            </p>
            <div style={styles.modalButtons}>
              <button style={styles.primaryBtn} onClick={goToLogin}>
                Go to Login
              </button>
              <button
                style={styles.secondaryBtn}
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
    background: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "60px 20px",
    fontFamily: "'Poppins', sans-serif",
  },
  contentWrapper: {
    display: "flex",
    flexWrap: "wrap",
    gap: 50,
    maxWidth: 1200,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  textBlock: {
    flex: 1,
    minWidth: 300,
    color: "#2f2f5e",
  },
  title: {
    fontSize: "3.5rem",
    fontWeight: "800",
    marginBottom: 20,
  },
  highlight: {
    color: "#6a0dad",
  },
  subtitle: {
    fontSize: "1.25rem",
    marginBottom: 32,
    lineHeight: 1.6,
    color: "#4a4a6a",
  },
  buttons: {
    display: "flex",
    gap: 20,
    flexWrap: "wrap",
  },
  primaryBtn: {
    background: "#6a0dad",
    color: "white",
    padding: "14px 28px",
    borderRadius: "12px",
    fontSize: "1.1rem",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    boxShadow: "0 6px 20px rgba(106, 13, 173, 0.4)",
    transition: "all 0.3s ease",
  },
  secondaryBtn: {
    background: "white",
    color: "#6a0dad",
    padding: "14px 28px",
    borderRadius: "12px",
    fontSize: "1.1rem",
    border: "2px solid #6a0dad",
    cursor: "pointer",
    fontWeight: "600",
    transition: "all 0.3s ease",
  },
  imageBlock: {
    flex: 1,
    minWidth: 300,
  },
  image: {
    width: "100%",
    borderRadius: "20px",
    boxShadow: "0 15px 45px rgba(0,0,0,0.2)",
  },
  glassCard: {
    background: "rgba(255, 255, 255, 0.25)",
    borderRadius: "16px",
    padding: "24px",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    color: "#2f2f5e",
    maxWidth: 400,
  },
  welcomeText: {
    fontSize: "1.25rem",
    marginBottom: 8,
  },
  emailText: {
    fontSize: "1rem",
    marginBottom: 20,
    color: "#5a5a7a",
  },
  cardButtons: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
  },
  modalOverlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    background: "white",
    padding: 40,
    borderRadius: 16,
    boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
    textAlign: "center",
    width: "90%",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: "1.6rem",
    marginBottom: 16,
    color: "#6a0dad",
  },
  modalText: {
    fontSize: "1rem",
    marginBottom: 24,
    color: "#444",
  },
  modalButtons: {
    display: "flex",
    justifyContent: "center",
    gap: 16,
    flexWrap: "wrap",
  },
};
