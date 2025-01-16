import "./App.css";
import SignUpForm from "./components/signupPage";
import LoginForm from "./components/loginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NoContent from "./components/noContent";
import Profile from "./components/profile";
import { OTP } from "./components/otpVerify";
import Dashboard from "./components/dashboard";
import Contact from "./components/contact";
import Refresh from "./components/refresh";
import About from "./components/about";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={< LoginForm />} />
          <Route path="/signup" element={< SignUpForm />} />
          <Route path="/verify-otp" element={< OTP />} />
          <Route path="/profile" element={< Profile />} />
          <Route path="/dashboard" element={< Dashboard />} />
          <Route path="/contact" element={< Contact />} />
          <Route path="/refresh" element={< Refresh />} />
          <Route path="/about" element={< About />} />
          <Route path="*" element={< NoContent />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
