import { useState } from "react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>{isLogin ? "Welcome Back" : "Create Account"}</h2>
        <form style={styles.form} onSubmit={(e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const payload = Object.fromEntries(formData);

  fetch(isLogin ? "http://localhost:5000/login" : "http://localhost:5000/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then(res => res.json())
    .then(data => {
      if (data.user_id) {
        localStorage.setItem("user_id", data.user_id);
        // navigate to questionnaire or dashboard
      } else {
        alert(data.message || data.error);
      }
    });
}}
>
          {!isLogin && <FloatingInput label="Full Name" type="text" name="fullname" />}
          <FloatingInput label="Email Address" type="email" name="email" />
          <FloatingInput label="Password" type="password" name="password" />
          {!isLogin && <FloatingInput label="Confirm Password" type="password" name="confirmPassword" />}

          <button type="submit" style={styles.button}>
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <p style={styles.toggleText}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span style={styles.toggleLink} onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign Up" : "Sign In"}
          </span>
        </p>
      </div>
    </div>
  );
}

function FloatingInput({ label, type, name }) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div style={styles.inputGroup}>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(value !== "")}
        style={styles.input}
        autoComplete="off"
      />
      <label
        htmlFor={name}
        style={{
          ...styles.label,
          top: focused || value ? "8px" : "50%",
          fontSize: focused || value ? "0.75rem" : "1rem",
          color: focused ? "#3b2f63" : "#666",
          transform: focused || value ? "translateY(0)" : "translateY(-50%)",
          fontWeight: focused || value ? "600" : "400",
        }}
      >
        {label}
      </label>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #e6e0f8 0%, #b0a6df 100%)",
    fontFamily: "'Montserrat', sans-serif",
    padding: "20px",
  },
  card: {
    background: "white",
    borderRadius: "18px",
    padding: "50px 60px",
    boxShadow: "0 10px 28px rgba(89, 74, 139, 0.3)",
    width: "100%",
    maxWidth: "480px",
    color: "#3b2f63",
    textAlign: "center",
    fontFamily: "'Montserrat', sans-serif",
  },
  title: {
    fontSize: "2.8rem",
    marginBottom: "35px",
    fontWeight: "700",
    color: "#3b2f63",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "28px",
  },
  inputGroup: {
    position: "relative",
    paddingLeft: "6px",
    paddingRight: "6px",
  },
  input: {
    width: "100%",
    padding: "18px 20px",
    fontSize: "1rem",
    borderRadius: "12px",
    border: "1.8px solid #a9a1ce",
    outline: "none",
    background: "#faf8fe",
    color: "#3b2f63",
    boxShadow: "inset 0 2px 5px rgba(167, 149, 219, 0.15)",
    transition: "border-color 0.3s ease",
    boxSizing: "border-box",
  },
  label: {
    position: "absolute",
    left: 20,
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
    transition: "all 0.3s ease",
    color: "#666",
    fontFamily: "'Montserrat', sans-serif",
  },
  button: {
    marginTop: "10px",
    backgroundColor: "#534f91",
    border: "none",
    borderRadius: "14px",
    padding: "16px",
    color: "white",
    fontWeight: "700",
    fontSize: "1.15rem",
    cursor: "pointer",
    boxShadow: "0 10px 28px rgba(83, 79, 145, 0.6)",
    transition: "background-color 0.3s ease",
    fontFamily: "'Montserrat', sans-serif"
  },
  toggleText: {
    marginTop: "22px",
    fontSize: "1rem",
    color: "#534f91",
    fontFamily: "'Montserrat', sans-serif",
  },
  toggleLink: {
    color: "#342e69",
    cursor: "pointer",
    fontWeight: "700",
    marginLeft: "6px",
    textDecoration: "underline",
  },
};