
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Add this

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate(); // ✅ Add this

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>{isLogin ? "Welcome Back" : "Create Account"}</h2>
        <form
          style={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const payload = Object.fromEntries(formData);

            fetch(isLogin ? "http://localhost:5000/login" : "http://localhost:5000/signup", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.user_id) {
                  localStorage.setItem("user_id", data.user_id);
                  navigate("/dashboard"); // ✅ Redirect after success
                } else {
                  alert(data.message || data.error);
                }
              })
              .catch((err) => {
                console.error("Request failed:", err);
                alert("Something went wrong. Please try again.");
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
    fontFamily: "'Montserrat', sans-serif",
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



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function AuthPage() {
//   const [isLogin, setIsLogin] = useState(true);
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const payload = Object.fromEntries(formData);

//     if (isLogin) {
//       if (!payload.email?.trim() || !payload.password?.trim()) {
//         toast.error("Please enter both email and password.");
//         return;
//       }
//     } else {
//       if (
//         !payload.fullname?.trim() ||
//         !payload.email?.trim() ||
//         !payload.password?.trim() ||
//         !payload.confirmPassword?.trim()
//       ) {
//         toast.error("Please fill in all the fields.");
//         return;
//       }
//       if (payload.password !== payload.confirmPassword) {
//         toast.error("Passwords do not match.");
//         return;
//       }
//     }

//     fetch(isLogin ? "http://localhost:5000/login" : "http://localhost:5000/signup", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.user_id) {
//           localStorage.setItem("user_id", data.user_id);
//           toast.success("Login successful!");
//           setTimeout(() => navigate("/dashboard"), 1000);
//         } else if (data.message) {
//           toast.success(data.message);
//           setIsLogin(true);
//         } else {
//           toast.error(data.error || "Something went wrong.");
//         }
//       })
//       .catch(() => toast.error("Something went wrong. Please try again."));
//   };

//   return (
//     <div style={styles.page}>
//       <ToastContainer />
//       <div style={{ ...styles.card, animation: "fadeIn 0.7s ease" }}>
//         <h2 style={styles.title}>{isLogin ? "Welcome Back" : "Create Account"}</h2>
//         <form style={styles.form} onSubmit={handleSubmit}>
//           {!isLogin && <FloatingInput label="Full Name" type="text" name="fullname" />}
//           <FloatingInput label="Email Address" type="email" name="email" />
//           <FloatingInput label="Password" type="password" name="password" />
//           {!isLogin && <FloatingInput label="Confirm Password" type="password" name="confirmPassword" />}
//           <button type="submit" style={styles.button}>
//             {isLogin ? "Sign In" : "Sign Up"}
//           </button>
//         </form>

//         <p style={styles.toggleText}>
//           {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
//           <span style={styles.toggleLink} onClick={() => setIsLogin(!isLogin)}>
//             {isLogin ? "Sign Up" : "Sign In"}
//           </span>
//         </p>
//       </div>
//       {/* Animation Keyframe (add to global CSS if needed) */}
//       <style>{`
//         @keyframes fadeIn {
//           0% { opacity: 0; transform: translateY(30px); }
//           100% { opacity: 1; transform: translateY(0); }
//         }
//       `}</style>
//     </div>
//   );
// }

// function FloatingInput({ label, type, name }) {
//   const [focused, setFocused] = useState(false);
//   const [value, setValue] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const isPasswordField = type === "password";
//   const inputType = isPasswordField && showPassword ? "text" : type;

//   return (
//     <div style={styles.inputGroup}>
//       <input
//         id={name}
//         name={name}
//         type={inputType}
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//         onFocus={() => setFocused(true)}
//         onBlur={() => setFocused(value !== "")}
//         style={{
//           ...styles.input,
//           textAlign: "center",
//         }}
//         autoComplete="off"
//       />
//       <label
//         htmlFor={name}
//         style={{
//           ...styles.label,
//           top: focused || value ? "8px" : "50%",
//           fontSize: focused || value ? "0.75rem" : "1rem",
//           transform: focused || value ? "translateY(0)" : "translateY(-50%)",
//           fontWeight: focused || value ? "600" : "400",
//           color: focused ? "#3b2f63" : "#666",
//         }}
//       >
//         {label}
//       </label>
//       {isPasswordField && (
//         <button
//           type="button"
//           onClick={() => setShowPassword((prev) => !prev)}
//           style={styles.showHideButton}
//           aria-label={showPassword ? "Hide password" : "Show password"}
//         >
//           {showPassword ? "Hide" : "Show"}
//         </button>
//       )}
//     </div>
//   );
// }

// const styles = {
//   page: {
//     minHeight: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     background: "linear-gradient(135deg, #e6e0f8 0%, #b0a6df 100%)",
//     fontFamily: "'Montserrat', sans-serif",
//     padding: "20px",
//   },
//   card: {
//     background: "white",
//     borderRadius: "18px",
//     padding: "50px 60px",
//     boxShadow: "0 10px 28px rgba(89, 74, 139, 0.3)",
//     width: "100%",
//     maxWidth: "480px",
//     color: "#3b2f63",
//     textAlign: "center",
//   },
//   title: {
//     fontSize: "2.8rem",
//     marginBottom: "35px",
//     fontWeight: "700",
//     color: "#3b2f63",
//   },
//   form: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "28px",
//   },
//   inputGroup: {
//     position: "relative",
//     paddingLeft: "6px",
//     paddingRight: "6px",
//   },
//   input: {
//     width: "100%",
//     padding: "18px 50px 18px 20px",
//     fontSize: "1rem",
//     borderRadius: "12px",
//     border: "1.8px solid #a9a1ce",
//     outline: "none",
//     background: "#faf8fe",
//     color: "#3b2f63",
//     boxShadow: "inset 0 2px 5px rgba(167, 149, 219, 0.15)",
//     transition: "border-color 0.3s ease",
//     boxSizing: "border-box",
//   },
//   label: {
//     position: "absolute",
//     left: 20,
//     top: "50%",
//     transform: "translateY(-50%)",
//     pointerEvents: "none",
//     transition: "all 0.3s ease",
//     color: "#666",
//     fontFamily: "'Montserrat', sans-serif",
//   },
//   showHideButton: {
//     position: "absolute",
//     right: "12px",
//     top: "50%",
//     transform: "translateY(-50%)",
//     background: "none",
//     border: "none",
//     color: "#534f91",
//     fontWeight: "700",
//     cursor: "pointer",
//     fontSize: "0.9rem",
//     padding: "0",
//     outline: "none",
//   },
//   button: {
//     marginTop: "10px",
//     backgroundColor: "#534f91",
//     border: "none",
//     borderRadius: "14px",
//     padding: "16px",
//     color: "white",
//     fontWeight: "700",
//     fontSize: "1.15rem",
//     cursor: "pointer",
//     boxShadow: "0 10px 28px rgba(83, 79, 145, 0.6)",
//     transition: "background-color 0.3s ease",
//     fontFamily: "'Montserrat', sans-serif",
//   },
//   toggleText: {
//     marginTop: "22px",
//     fontSize: "1rem",
//     color: "#534f91",
//   },
//   toggleLink: {
//     color: "#342e69",
//     cursor: "pointer",
//     fontWeight: "700",
//     marginLeft: "6px",
//     textDecoration: "underline",
//   },
// };

