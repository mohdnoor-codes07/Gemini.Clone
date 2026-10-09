import { useState } from "react";
import "./LoginModal.css";
import { toast } from "react-hot-toast";

const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

const LoginModal = ({ closeModal, setUser }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let endpoint = "";
    if (isSignUp === true) {
      endpoint = "signup";
    } else {
      endpoint = "login";
    }

    let payload = {};
    if (isSignUp === true) {
      payload = { name: name, email: email, password: password };
    } else {
      payload = { email: email, password: password };
    }

    try {
      setIsSubmitting(true);

      const response = await fetch(`${apiBaseUrl}/api/auth/${endpoint}`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok === true) {
        if (isSignUp === true) {
          toast.success("Signup successful! Please login now.");
          setIsSignUp(false);
          setName("");
          setEmail("");
          setPassword("");
        } else {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          
          setUser(data.user);
          toast.success("Welcome back!");
          closeModal();
        }
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Cannot connect to backend server");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleMode = () => {
    setIsSignUp(!isSignUp);
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        
        <button className="close-corner-btn" onClick={closeModal}>
          &times;
        </button>

        <h2 className="modal-title">
          {isSignUp ? "Create Account" : "Welcome back"}
        </h2>
        <p className="modal-subtitle">
          {isSignUp ? "Create your account to start chatting" : "Sign in to continue your conversations"}
        </p>

        <form onSubmit={handleSubmit} className="modal-form">
          
          {isSignUp && (
            <div className="input-group">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="input-group">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? "Please wait..." : (isSignUp ? "Create account" : "Sign in")}
          </button>
        </form>

        <p className="toggle-text">
          {isSignUp ? "Already have an account?" : "New to Gemini Clone?"}{" "}
          <button type="button" className="toggle-link" onClick={handleToggleMode}>
            {isSignUp ? "Sign in" : "Create account"}
          </button>
        </p>

      </div>
    </div>
  );
};

export default LoginModal;
