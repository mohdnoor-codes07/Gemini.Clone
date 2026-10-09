// import { createContext, useState } from "react";

// export const Context = createContext();

// const ContextProvider = (props) => {
//   const [input, setInput] = useState("");
//   const [recentPrompt, setRecentPrompt] = useState("");
//   const [prevPrompts, setPrevPrompts] = useState([]);
//   const [showResult, setShowResult] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [resultData, setResultData] = useState("");

//   const onSent = async (prompt) => {
//     setResultData("");
//     setLoading(true);
//     setShowResult(true);
//     setRecentPrompt(prompt);

//     if (!prevPrompts.includes(prompt)) {
//       setPrevPrompts((prev) => [prompt, ...prev]);
//     }

//     try {
//       // यह लाइन आपके Node.js सर्वर (server.js) से बात करेगी
//       const response = await fetch("http://localhost:5000/api/chat", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ prompt: prompt }),
//       });

//       const data = await response.json();

//       if (data.text) {
//         setResultData(data.text); // असली AI का जवाब
//       } else {
//         setResultData("Error: Node server did not return text.");
//       }
//     } catch (error) {
//       console.error("Error connecting to backend:", error);
//       setResultData("Backend server is not running on port 5000.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const contextValue = {
//     prevPrompts,
//     setPrevPrompts,
//     onSent,
//     recentPrompt,
//     setRecentPrompt,
//     showResult,
//     loading,
//     resultData,
//     input,
//     setInput,
//   };

//   return (
//     <Context.Provider value={contextValue}>
//       {props.children}
//     </Context.Provider>
//   );
// };

// export default ContextProvider;
