import { NavLink } from "react-router-dom";

export default function Navbar() {
  const navStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "25px",
    padding: "15px 20px",
    background: "linear-gradient(90deg, #667eea, #764ba2)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "1rem",
    padding: "8px 12px",
    borderRadius: "6px",
    transition: "background-color 0.3s ease",
  };

  const activeLinkStyle = {
    backgroundColor: "rgba(255,255,255,0.3)",
  };

  return (
    <nav style={navStyle}>
      <NavLink
        to="/"
        style={({ isActive }) =>
          isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle
        }
        end
      >
        Home
      </NavLink>

      <NavLink
        to="/check"
        style={({ isActive }) =>
          isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle
        }
      >
        Test
      </NavLink>

      <NavLink
        to="/user"
        style={({ isActive }) =>
          isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle
        }
      >
        Analytics
      </NavLink>

      <NavLink
        to="/about"
        style={({ isActive }) =>
          isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle
        }
      >
        About
      </NavLink>

      <NavLink
        to="/contact"
        style={({ isActive }) =>
          isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle
        }
      >
        Contact
      </NavLink>

      <NavLink
        to="/login"
        style={({ isActive }) =>
          isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle
        }
      >
        Login
      </NavLink>
    </nav>
  );
}