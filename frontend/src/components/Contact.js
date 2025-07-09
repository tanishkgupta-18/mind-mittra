import React, { useState } from "react";

export default function MentalWellness() {
  const [activeTab, setActiveTab] = useState("exercises");
  const [openSteps, setOpenSteps] = useState(null);

  const exercises = [
    {
      title: "5-Minute Mindful Breathing",
      emoji: "🌬",
      description: "A simple breathing exercise to calm your mind.",
      steps: [
        "Find a quiet place and sit comfortably.",
        "Close your eyes and relax your shoulders.",
        "Inhale deeply through your nose for 4 seconds.",
        "Hold your breath for 2 seconds.",
        "Exhale slowly through your mouth for 6 seconds.",
        "Repeat for 5 minutes.",
      ],
    },
    {
      title: "Gratitude Journal",
      emoji: "✍",
      description: "Reflect on things you’re grateful for.",
      steps: [
        "Take a notebook and pen.",
        "Write down three things you’re grateful for today.",
        "Be specific and write why you’re grateful.",
        "Take a moment to feel the gratitude.",
      ],
    },
    {
      title: "Mindful Walking",
      emoji: "🚶",
      description: "Go for a short walk with full awareness.",
      steps: [
        "Leave your phone behind or put it on silent.",
        "Walk slowly and notice each step.",
        "Feel the ground under your feet.",
        "Pay attention to sounds, sights, and smells.",
        "Breathe naturally and stay present.",
      ],
    },
  ];

  const blogs = [
    {
      title: "Understanding Anxiety",
      url: "https://psychcentral.com/",
      image:
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Building Resilience",
      url: "https://www.nami.org/Blogs/NAMI-Blog",
      image:
        "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Mindfulness in Daily Life",
      url: "https://www.mindful.org/",
      image:
        "https://images.unsplash.com/photo-1523875194681-bedd468c58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>🧘 Mental Wellness Resources</h1>

        {/* Tabs */}
        <div style={styles.tabs}>
          {["exercises", "blogs", "videos"].map((tab) => (
            <button
              key={tab}
              style={{
                ...styles.tab,
                ...(activeTab === tab ? styles.activeTab : {}),
              }}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Exercises Tab */}
        {activeTab === "exercises" && (
          <section style={styles.section}>
            <h2 style={styles.heading}>Daily Mental Exercises</h2>
            <div style={styles.cardList}>
              {exercises.map((ex, index) => (
                <div key={index} style={styles.card}>
                  <h3 style={styles.cardTitle}>
                    {ex.emoji} {ex.title}
                  </h3>
                  <p style={styles.cardDescription}>{ex.description}</p>
                  <button
                    style={styles.cardButton}
                    onClick={() =>
                      openSteps === index
                        ? setOpenSteps(null)
                        : setOpenSteps(index)
                    }
                  >
                    {openSteps === index ? "Hide Steps" : "How to Do It"}
                  </button>
                  {openSteps === index && (
                    <ul style={styles.stepsList}>
                      {ex.steps.map((step, i) => (
                        <li key={i} style={styles.stepItem}>
                          ➜ {step}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Blogs Tab */}
        {activeTab === "blogs" && (
          <section style={styles.section}>
            <h2 style={styles.heading}>Recommended Blogs</h2>
            <div style={styles.blogGrid}>
              {blogs.map((blog, index) => (
                <div key={index} style={styles.blogCard}>
                  <img
                    src={blog.image}
                    alt={blog.title}
                    style={styles.blogImage}
                  />
                  <h3 style={styles.blogTitle}>{blog.title}</h3>
                  <a
                    href={blog.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.blogButton}
                  >
                    Read Blog
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Videos Tab */}
        {activeTab === "videos" && (
          <section style={styles.section}>
            <h2 style={styles.heading}>Recommended YouTube Videos</h2>
            <div style={styles.videoContainer}>
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/ZToicYcHIOU"
                title="5-Minute Mindfulness Meditation"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={styles.video}
              ></iframe>
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/1vx8iUvfyCY"
                title="10-Minute Guided Meditation"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={styles.video}
              ></iframe>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f3e7fe 0%, #c3a4f9 100%)",
    fontFamily: "'Montserrat', sans-serif",
    padding: "60px 20px",
    display: "flex",
    justifyContent: "center",
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
    fontSize: "2.6rem",
    fontWeight: "700",
    marginBottom: 30,
    textAlign: "center",
  },
  tabs: {
    display: "flex",
    justifyContent: "center",
    gap: 10,
    marginBottom: 30,
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
  section: {
    marginBottom: 40,
  },
  heading: {
    fontSize: "1.8rem",
    color: "#6b4f9a",
    marginBottom: 16,
    textAlign: "center",
  },
  cardList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: 20,
  },
  card: {
    border: "2px solid #eee",
    borderRadius: 12,
    padding: 20,
    background: "#faf8ff",
    boxShadow: "0 5px 15px rgba(180, 136, 229, 0.1)",
  },
  cardTitle: {
    fontSize: "1.4rem",
    marginBottom: 8,
  },
  cardDescription: {
    marginBottom: 12,
  },
  cardButton: {
    background: "#a761d6",
    color: "white",
    border: "none",
    borderRadius: 8,
    padding: "8px 16px",
    cursor: "pointer",
    fontWeight: "600",
  },
  stepsList: {
    marginTop: 15,
    paddingLeft: 20,
    lineHeight: 1.7,
    color: "#5f3b8f",
  },
  stepItem: {
    marginBottom: 8,
  },
  blogGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: 20,
  },
  blogCard: {
    border: "2px solid #eee",
    borderRadius: 12,
    overflow: "hidden",
    background: "#fff",
    boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
    textAlign: "center",
    transition: "transform 0.3s",
  },
  blogImage: {
    width: "100%",
    height: 150,
    objectFit: "cover",
  },
  blogTitle: {
    fontSize: "1.2rem",
    margin: "15px 10px",
    color: "#4a2a7a",
  },
  blogButton: {
    display: "inline-block",
    marginBottom: 15,
    padding: "8px 16px",
    background: "#a761d6",
    color: "#fff",
    borderRadius: 8,
    textDecoration: "none",
    fontWeight: "600",
  },
  videoContainer: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 20,
  },
  video: {
    borderRadius: 12,
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },
};
