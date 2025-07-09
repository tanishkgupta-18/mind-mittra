export default function Contact() {
    const helplines = [
      {
        org: "Vandrevala Foundation",
        number: "1860 266 2345 / 9999 666 555",
        desc: "24/7 mental health helpline",
      },
      {
        org: "iCall",
        number: "+91 9152987821",
        desc: "Free and confidential support",
      },
      {
        org: "AASRA",
        number: "+91 9820466726",
        desc: "24/7 crisis intervention",
      },
      {
        org: "Snehi",
        number: "+91 9582208181",
        desc: "Emotional support and counseling",
      },
    ];
  
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <h1 style={styles.title}>Mental Health Helplines</h1>
          <p style={styles.subtitle}>
            Reach out to these organizations for support anytime.
          </p>
  
          <div style={styles.table}>
            <div style={{ ...styles.row, ...styles.header }}>
              <div style={styles.cell}>Organization</div>
              <div style={styles.cell}>Helpline Number</div>
              <div style={styles.cell}>Description</div>
            </div>
  
            {helplines.map(({ org, number, desc }) => (
              <div key={org} style={styles.row}>
                <div style={styles.cell}>{org}</div>
                <div style={styles.cell}>{number}</div>
                <div style={styles.cell}>{desc}</div>
              </div>
            ))}
          </div>
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
      maxWidth: 900,
      background: "white",
      borderRadius: 20,
      padding: 40,
      boxShadow: "0 15px 40px rgba(179, 102, 214, 0.3)",
      color: "#4a2a7a",
    },
    title: {
      fontSize: "3rem",
      fontWeight: "700",
      marginBottom: 20,
    },
    subtitle: {
      fontSize: "1.25rem",
      marginBottom: 30,
      color: "#6b4f9a",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    row: {
      display: "flex",
      padding: "12px 0",
      borderBottom: "1px solid #ddd",
    },
    header: {
      borderBottom: "3px solid #a761d6",
      fontWeight: "700",
      color: "#8235c9",
    },
    cell: {
      flex: 1,
      padding: "0 10px",
      fontSize: "1.1rem",
    },
  };
  