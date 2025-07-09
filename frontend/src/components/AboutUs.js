// export default function AboutUs() {
//     return (
//       <div style={styles.page}>
//         <div style={styles.container}>
//           <h1 style={styles.title}>About Us</h1>
//           <p style={styles.paragraph}>
//             At <strong>Mental Health Analyzer</strong>, we are dedicated to helping you understand and improve your mental well-being.
//             Our mission is to provide accessible and easy-to-use tools that empower individuals to track their mental health and seek timely support.
//           </p>
//           <p style={styles.paragraph}>
//             Developed by a passionate team committed to mental health awareness, our platform combines thoughtful questionnaires with insightful analytics.
//             We believe mental health is as important as physical health, and we strive to create a supportive community for everyone.
//           </p>
//           <p style={styles.paragraph}>
//             Whether you're just starting your mental health journey or looking to stay informed about your emotional wellness, we're here for you every step of the way.
//           </p>
//         </div>
//       </div>
//     );
//   }
  
//   const styles = {
//     page: {
//       minHeight: "100vh",
//       padding: "60px 20px",
//       background:
//         "linear-gradient(135deg, #f3e7fe 0%, #c3a4f9 100%)",
//       fontFamily: "'Montserrat', sans-serif",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "flex-start",
//     },
//     container: {
//       maxWidth: 700,
//       background: "white",
//       borderRadius: 20,
//       padding: 40,
//       boxShadow: "0 15px 40px rgba(179, 102, 214, 0.3)",
//       color: "#4a2a7a",
//     },
//     title: {
//       fontSize: "3rem",
//       fontWeight: "700",
//       marginBottom: 30,
//     },
//     paragraph: {
//       fontSize: "1.2rem",
//       lineHeight: 1.7,
//       marginBottom: 20,
//       color: "#6b4f9a",
//     },
//   };
  
import React, { useState, useEffect } from "react";

export default function AboutUs() {
  const [visibleSections, setVisibleSections] = useState({
    intro: false,
    mission: false,
    offer: false,
    why: false,
    footer: false,
  });

  useEffect(() => {
    const timers = [];

    timers.push(setTimeout(() => setVisibleSections(v => ({ ...v, intro: true })), 200));
    timers.push(setTimeout(() => setVisibleSections(v => ({ ...v, mission: true })), 600));
    timers.push(setTimeout(() => setVisibleSections(v => ({ ...v, offer: true })), 1000));
    timers.push(setTimeout(() => setVisibleSections(v => ({ ...v, why: true })), 1400));
    timers.push(setTimeout(() => setVisibleSections(v => ({ ...v, footer: true })), 1800));

    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const animStyle = (visible) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(20px)",
    transition: "opacity 0.6s ease, transform 0.6s ease",
  });

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>
          About <span style={styles.highlight}>Us</span>
        </h1>

        <p style={{ ...styles.intro, ...animStyle(visibleSections.intro) }}>
          <span style={styles.quoteMark}>“</span>
          At <strong>Mind Mittra</strong>, we believe that taking care of your mind is just as important as taking care of your body.
          <span style={styles.quoteMark}>”</span>
        </p>

        <div style={{ ...styles.section, ...animStyle(visibleSections.mission) }}>
          <h2 style={styles.sectionTitle}>🌱 Our Mission</h2>
          <p style={styles.text}>
            To provide individuals with intelligent tools that help them understand, reflect, and improve their mental well-being.
            Through personalized insights and data-driven analysis, we aim to empower people to take charge of their emotional health.
          </p>
        </div>

        <div style={{ ...styles.section, ...animStyle(visibleSections.offer) }}>
          <h2 style={styles.sectionTitle}>💡 What We Offer</h2>
          <ul style={styles.list}>
            <li>✔ Smart questionnaires to evaluate your current state</li>
            <li>✔ Real-time analytics and severity feedback</li>
            <li>✔ Personalized advice with AI-generated support</li>
            <li>✔ A seamless, accessible platform for all users</li>
          </ul>
        </div>

        <div style={{ ...styles.section, ...animStyle(visibleSections.why) }}>
          <h2 style={styles.sectionTitle}>🤝 Why It Matters</h2>
          <p style={styles.text}>
            Mental health affects every part of life—work, relationships, and self-worth. Our platform is a small step toward a healthier,
            more self-aware society where people feel heard, supported, and strong.
          </p>
        </div>

        <div style={{ ...styles.footerNote, ...animStyle(visibleSections.footer) }}>
          Built with 💜 by passionate minds who care deeply about mental wellness.
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "60px 20px",
    background: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
    fontFamily: "'Montserrat', sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  container: {
    maxWidth: 800,
    background: "white",
    borderRadius: 24,
    padding: 50,
    boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
    color: "#43366b",
  },
  title: {
    fontSize: "3.2rem",
    fontWeight: "800",
    marginBottom: 30,
    textAlign: "center",
    color: "#3e2c67",
  },
  highlight: {
    background: "linear-gradient(to right, #9f6ced, #7ab6f9)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  intro: {
    fontSize: "1.3rem",
    fontStyle: "italic",
    lineHeight: 1.8,
    color: "#5d4b82",
    marginBottom: 35,
    textAlign: "center",
    position: "relative",
  },
  quoteMark: {
    fontSize: "2.5rem",
    fontWeight: "700",
    verticalAlign: "middle",
    color: "#caa9ff",
    margin: "0 10px",
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: "1.7rem",
    fontWeight: "700",
    marginBottom: 16,
    color: "#6a3acb",
  },
  text: {
    fontSize: "1.1rem",
    lineHeight: 1.7,
    color: "#5d4b82",
  },
  list: {
    paddingLeft: 20,
    fontSize: "1.1rem",
    lineHeight: 1.8,
    color: "#5d4b82",
  },
  footerNote: {
    textAlign: "center",
    marginTop: 30,
    fontSize: "1rem",
    color: "#7b66a3",
    fontStyle: "italic",
  },
};