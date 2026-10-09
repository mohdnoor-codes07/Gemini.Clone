import { createContext, useState } from "react";

export const Context = createContext(null);

const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const runChat = async (prompt) => {
    if (prompt.trim() === "") {
      return;
    }

    setLoading(true);
    setRecentPrompt(prompt);
    setShowResult(true);
    setResultData("");

    try {
      const response = await fetch(`${apiBaseUrl}/api/chat`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({ prompt: prompt }),
      });

      const data = await response.json();

      if (response.ok === true) {
        setResultData(data.text || "No response received from Gemini.");
        setPrevPrompts([prompt, ...prevPrompts]);
      } else {
        setResultData(data.error || "The Gemini request failed.");
      }

    } catch (error) {
      console.error("Gemini API error:", error);
      setResultData("Unable to reach the Gemini server right now.");
    }

    setLoading(false);
  };

  const onSent = async (prompt) => {
    await runChat(prompt);
  };

  const ContextValue = {
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    prevPrompts,
    setPrevPrompts,
    showResult,
    loading,
    resultData,
    onSent,
  };

  return (
    <Context.Provider value={ContextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
