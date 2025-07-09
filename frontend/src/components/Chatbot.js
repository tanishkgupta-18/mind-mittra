import { useState } from "react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! How can I support your mental health today?" },
  ]);
  const [input, setInput] = useState("");

 const getBotReply = async (msg) => {
  try {
    const res = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: msg })
    });
    const data = await res.json();
    return data.reply || "I'm here to support you.";
  } catch (err) {
    return "Sorry, I couldn't respond right now. Please try again later.";
  }
};

//  const getBotReply = (msg) => {
//     const lower = msg.toLowerCase();
//     if (lower.includes("stress")) return "Try deep breathing or taking a walk.";
//     if (lower.includes("sleep")) return "Avoid screens 1 hour before bed.";
//     if (lower.includes("anxious") || lower.includes("anxiety")) return "Try grounding techniques like the 5-4-3-2-1 method.";
//     if (lower.includes("sad") || lower.includes("depressed")) return "You're not alone. Talking to someone can help a lot.";
//     return "I'm here to listen. Could you tell me more?";
//   };

//   const handleSend = () => {
//     if (!input.trim()) return;
//     const newMessages = [...messages, { from: "user", text: input }];
//     const botReply = getBotReply(input);
//     newMessages.push({ from: "bot", text: botReply });
//     setMessages(newMessages);
//     setInput("");
//   };

    const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { from: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    const botReply = await getBotReply(input);
    setMessages((prev) => [...prev, { from: "bot", text: botReply }]);
    };


  return (
    <div style={styles.chatbotWrapper}>
      {open && (
        <div style={styles.chatWindow}>
          <div style={styles.header}>Mental Wellness Chatbot</div>
          <div style={styles.chatArea}>
            {messages.map((m, i) => (
              <div key={i} style={m.from === "bot" ? styles.botMsg : styles.userMsg}>
                {m.text}
              </div>
            ))}
          </div>
          <div style={styles.inputArea}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              style={styles.input}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend} style={styles.sendBtn}>Send</button>
          </div>
        </div>
      )}
      <button style={styles.toggleBtn} onClick={() => setOpen(!open)}>
        {open ? "×" : "💬"}
      </button>
    </div>
  );
}

const styles = {
  chatbotWrapper: {
    position: "fixed",
    bottom: 20,
    right: 20,
    zIndex: 1000,
  },
  chatWindow: {
    width: 300,
    height: 380,
    backgroundColor: "white",
    borderRadius: 16,
    boxShadow: "0 0 20px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  header: {
    backgroundColor: "#a761d6",
    color: "white",
    padding: "12px 16px",
    fontWeight: "bold",
    textAlign: "center",
  },
  chatArea: {
    flex: 1,
    padding: 12,
    overflowY: "auto",
    fontSize: "0.9rem",
  },
  inputArea: {
    display: "flex",
    borderTop: "1px solid #eee",
  },
  input: {
    flex: 1,
    padding: "10px",
    border: "none",
    outline: "none",
    fontSize: "1rem",
  },
  sendBtn: {
    backgroundColor: "#a761d6",
    border: "none",
    color: "white",
    padding: "0 16px",
    cursor: "pointer",
  },
  botMsg: {
    backgroundColor: "#f0e6fa",
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
    maxWidth: "80%",
    alignSelf: "flex-start",
  },
  userMsg: {
    backgroundColor: "#d1b3f2",
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
    maxWidth: "80%",
    alignSelf: "flex-end",
    alignSelf: "flex-end",
    textAlign: "right",
  },
  toggleBtn: {
    backgroundColor: "#a761d6",
    color: "white",
    border: "none",
    borderRadius: "50%",
    width: 48,
    height: 48,
    fontSize: "1.5rem",
    cursor: "pointer",
    boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
  },
};
