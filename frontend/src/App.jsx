import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";
import LoginModal from "./components/LoginModal";
import { Toaster } from "react-hot-toast";

const App = () => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const handleUserClick = () => {
    if (!user) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Toaster position="top-center" />
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Main user={user} onUserClick={handleUserClick} onLogout={handleLogout} />
      </div>
      {isModalOpen && !user && (
        <LoginModal closeModal={handleCloseModal} setUser={setUser} />
      )}
    </div>
  );
};

export default App;
