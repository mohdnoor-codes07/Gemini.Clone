import { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets.js";
import { Context } from "../../context/context.jsx";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  
  const { prevPrompts, onSent, setInput } = useContext(Context);

  const handleNewChat = () => {
    setInput("");
  };

  const handleToggleMenu = () => {
    if (extended === true) {
      setExtended(false);
    } else {
      setExtended(true);
    }
  };

  return (
    <aside className="sidebar">
      <div className="top">
        <img
          onClick={handleToggleMenu}
          className="menu"
          src={assets.menu_icon}
          alt="Toggle menu"
        />
        
        <button className="New-Chat" type="button" onClick={handleNewChat}>
          <img className="plus" src={assets.plus_icon} alt="New chat" />
          {extended && <p>New Chat</p>}
        </button>

        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            
            {prevPrompts.map((prompt) => {
              return (
                <button
                  className="recent-entry"
                  type="button"
                  key={prompt}
                  onClick={() => onSent(prompt)}
                >
                  <img className="message" src={assets.message_icon} alt="" />
                  <p>{prompt}</p>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="bottom">
        <button className="bottom-item recent-entry" type="button">
          <img className="Question" src={assets.Question_icon} alt="Help" />
          {extended && <p>Help</p>}
        </button>

        <button className="bottom-item recent-entry" type="button">
          <img className="history" src={assets.history_icon} alt="Activity" />
          {extended && <p>Activity</p>}
        </button>

        <button className="bottom-item recent-entry" type="button">
          <img className="setting" src={assets.setting_icon} alt="Settings" />
          {extended && <p>Setting</p>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
