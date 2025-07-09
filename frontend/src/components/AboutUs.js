export default function AboutUs() {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <h1 style={styles.title}>About Us</h1>
          <p style={styles.paragraph}>
            At <strong>Mental Health Analyzer</strong>, we are dedicated to helping you understand and improve your mental well-being.
            Our mission is to provide accessible and easy-to-use tools that empower individuals to track their mental health and seek timely support.
          </p>
          <p style={styles.paragraph}>
            Developed by a passionate team committed to mental health awareness, our platform combines thoughtful questionnaires with insightful analytics.
            We believe mental health is as important as physical health, and we strive to create a supportive community for everyone.
          </p>
          <p style={styles.paragraph}>
            Whether you're just starting your mental health journey or looking to stay informed about your emotional wellness, we're here for you every step of the way.
          </p>
        </div>
      </div>
    );
  }
  
  const styles = {
    page: {
      minHeight: "100vh",
      padding: "60px 20px",
      background:
        "linear-gradient(135deg, #f3e7fe 0%, #c3a4f9 100%)",
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
    },
    title: {
      fontSize: "3rem",
      fontWeight: "700",
      marginBottom: 30,
    },
    paragraph: {
      fontSize: "1.2rem",
      lineHeight: 1.7,
      marginBottom: 20,
      color: "#6b4f9a",
    },
  };
  