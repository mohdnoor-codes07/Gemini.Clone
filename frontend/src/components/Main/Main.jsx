import { useContext, useState } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context.jsx";

const Main = ({ user, onUserClick, onLogout }) => {
  const [showProfileCard, setShowProfileCard] = useState(false);

  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
  } = useContext(Context);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (input.trim() === "") {
      return;
    }

    await onSent(input);
    setInput("");
  };

  const handlePromptClick = async (prompt) => {
    setInput("");
    await onSent(prompt);
  };

  const handleProfileClick = () => {
    if (!user) {
      onUserClick();
    } else {
      if (showProfileCard === true) {
        setShowProfileCard(false);
      } else {
        setShowProfileCard(true);
      }
    }
  };

  const handleSignOutClick = () => {
    setShowProfileCard(false);
    onLogout();
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini Clone</p>
        
        <div style={{ position: "relative" }}>
          <img
            className="user"
            src={assets.user_icon}
            alt="User Account"
            onClick={handleProfileClick}
            style={{ cursor: "pointer", width: "40px", borderRadius: "50%" }}
          />

          {user && showProfileCard && (
            <div className="profile-card-overlay">
              <div className="profile-card-header">
                <h3>{user.name}</h3>
                <p>{user.email}</p>
              </div>
              <div className="profile-card-body">
                <div className="badge-status">Verified Account</div>
                <button className="logout-action-btn" onClick={handleSignOutClick}>
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="main-container">
        <div className="greet">
          <p>
            <span>
              {user ? `WELCOME TO GEMINI CLONE, ${user.name.toUpperCase()}!` : "WELCOME TO GEMINI CLONE, GUEST!"}
            </span>
          </p>
          <p>How can I assist your productivity today?</p>
        </div>

        <div className="cards">
          <div className="card1" onClick={() => handlePromptClick("Suggest beautiful places to see on an upcoming road trip")}>
            <p>Suggest beautiful places to see on an upcoming road trip</p>
            <img src={assets.compass_icon} alt="Compass" />
          </div>

          <div className="card2" onClick={() => handlePromptClick("Briefly summarize this concept: urban planning")}>
            <p>Briefly summarize this concept: urban planning</p>
            <img src={assets.bulb_icon} alt="Bulb" />
          </div>
        </div>

        <div className="main-bottom">
          {showResult && (
            <div className="result-box">
              {loading ? (
                <p className="loading-state">Thinking...</p>
              ) : (
                <p>{resultData}</p>
              )}
              {recentPrompt && <p className="recent-query">Prompt: {recentPrompt}</p>}
            </div>
          )}

          <form className="search-box" onSubmit={handleSubmit}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Enter a prompt here..."
            />
            <div>
              <img src={assets.gallery_icon} alt="Gallery" />
              <img src={assets.mic_icon} alt="Microphone" />
              <img
                onClick={handleSubmit}
                src={assets.send_icon}
                alt="Send"
                style={{ cursor: "pointer" }}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Main;
