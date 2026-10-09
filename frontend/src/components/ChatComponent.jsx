// import { useState } from 'react';

// function ChatComponent() {
//   const [input, setInput] = useState('');
//   const [response, setResponse] = useState('');

//   const askGemini = async () => {
//     try {
//       const res = await fetch('http://localhost:5000/api/chat', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ prompt: input })
//       });
//       const data = await res.json();
//       setResponse(data.text);
//     } catch (error) {
//       console.error("Error connecting to backend:", error);
//     }
//   };

//   return (
//     <div style={{ padding: '20px', textAlign: 'center' }}>
//       <h2>Gemini AI Chat</h2>
//       <input 
//         value={input} 
//         onChange={(e) => setInput(e.target.value)} 
//         placeholder="Ask something..." 
//         style={{ padding: '8px', marginRight: '10px', width: '250px' }}
//       />
//       <button onClick={askGemini} style={{ padding: '8px 15px', cursor: 'pointer' }}>Send</button>
//       <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
//         <p>AI Response:</p>
//         <p style={{ color: '#555', fontStyle: 'italic' }}>{response || "No reply yet..."}</p>
//       </div>
//     </div>
//   );
// }

// export default ChatComponent;
