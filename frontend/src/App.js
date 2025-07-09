import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import AuthPage from "./components/AuthPage";
import Questionnaire from "./components/Questionnaire";
import Result from "./components/Result";
import AboutUs from "./components/AboutUs";
import UserAnalytics from "./components/UserAnalytics";
import Contact from "./components/Contact";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/check" element={<Questionnaire />} />
        <Route path="/result" element={<Result />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/user" element={<UserAnalytics />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;