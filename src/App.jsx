import React, { useEffect, useRef, useState } from "react";
import { Gemini } from "../Gemini";
import { FaCopy } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const chatContainerRef = useRef(null);

  // Initialize chats as an empty array
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(0);

  // Function to scroll to the bottom
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  // UseEffect to scroll when the component mounts or when chats change
  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  // Function to simulate AI response typing effect
  const typingEffect = (id, responseText) => {
    let index = 0;
    const interval = setInterval(() => {
      setChats((prevChats) => {
        const updatedChats = [...prevChats];
        updatedChats[updatedChats.length - 1].answer = responseText.slice(0, index);
        return updatedChats;
      });
      index += 1;
      if (index > responseText.length) {
        clearInterval(interval);
      }
    }, 12); // Adjust typing speed by changing the interval (in milliseconds)
  };

  // Handle chat function to add new messages to the chat
  const handleChat = (newQuestion) => {
    setLoading(true); // Set loading to true when chat starts

    const newChat = {
      id: chats.length + 1, // Incremental id
      question: newQuestion,
      answer: "AI is thinking...", // Initial AI thinking message
    };

    setChats((prevChats) => [...prevChats, newChat]);

    // Simulate AI response after a short delay
    setTimeout(async () => {
      try {
        const aiResponse = await Gemini(newQuestion); // Simulate AI response
        console.log(aiResponse);
        typingEffect(newChat.id, formatAnswer(aiResponse)); // Start typing animation with formatted response
      } catch (error) {
        console.error("Error fetching AI response:", error);
      } finally {
        setLoading(false); // Set loading to false after AI response is processed
      }
    }, 100); // Simulate a 2-second delay before starting the typing animation
  };

  // Function to format the AI response
  const formatAnswer = (response) => {
    // Bold text: replace **text** with <strong>text</strong>
    const boldFormatted = response.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Line breaks: replace * with <br/>
    const lineBreakFormatted = boldFormatted.replace(/\*/g, '<br />');

    return lineBreakFormatted;
  };

  // Function to copy text to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast.success("Copied to clipboard!");
      },
      (err) => {
        console.error("Error copying text: ", err);
        toast.error("Error copying text: ", err);
      }
    );
  };

  return (
    <>
      <div
        ref={chatContainerRef}
        className="max-w-screen-lg m-auto mt-24 max-h-screen overflow-y-auto pb-20"
      >
        {chats.map((chat) => (
          <div key={chat.id}>
            <div className="chat chat-end">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://res.cloudinary.com/drp3ojnl0/image/upload/v1737392823/user_bbodxb.jpg"
                  />
                </div>
              </div>
              <div className="chat-header">
                <b>You</b>
                <time className="text-xs opacity-50"></time>
              </div>
              <div className="chat-bubble">{chat.question}</div>
            </div>

            <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://res.cloudinary.com/drp3ojnl0/image/upload/v1737392823/logo_t5hvol.webp"
                  />
                </div>
              </div>
              <div className="chat-header">
                <b>Sameet~Ai</b>
                <time className="text-xs opacity-50"></time>
              </div>
              <div className="chat-bubble">
                <p dangerouslySetInnerHTML={{ __html: chat.answer }}></p>
                <div
                  className="flex justify-end cursor-pointer"
                  onClick={() => copyToClipboard(chat.answer)}
                >
                  <FaCopy />
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Footer */}
        <div className="fixed bottom-0 left-0 w-full bg-base-100 shadow-md px-4 py-3">
          <div className="flex justify-center">
            <div className="w-full max-w-2xl">
              <form
                className="flex items-center space-x-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  const message = e.target.elements.message.value;
                  handleChat(message);
                  e.target.reset();
                }}
              >
                <input
                  name="message"
                  type="text"
                  placeholder="Type your message..."
                  className="input input-bordered w-full rounded-full px-4"
                />
                <button
                  type="submit"
                  className="btn btn-neutral rounded-full px-12"
                >
                  {loading ? (
                    <span className="loading loading-dots loading-md"></span>
                  ) : (
                    "Send"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;

































// woring if porbmein above use this 




// import React, { useEffect, useRef, useState } from "react";
// import { Gemini } from "../Gemini";
// import { FaCopy } from "react-icons/fa";
// import { ToastContainer, toast } from 'react-toastify';

// function App() {
//   const chatContainerRef = useRef(null);

//   // Initialize chats as an empty array
//   const [chats, setChats] = useState([]);
//   const [loading,setLoading]=useState(0);

//   // Function to scroll to the bottom
//   const scrollToBottom = () => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//     }
//   };

//   // UseEffect to scroll when the component mounts or when chats change
//   useEffect(() => {
//     scrollToBottom();
//   }, [chats]);

//   // Function to simulate AI response typing effect
//   const typingEffect = (id, responseText) => {
//     let index = 0;
//     const interval = setInterval(() => {
//       setChats((prevChats) => {
//         const updatedChats = [...prevChats];
//         updatedChats[updatedChats.length - 1].answer = responseText.slice(0, index);
//         return updatedChats;
//       });
//       index += 1;
//       if (index > responseText.length) {
//         clearInterval(interval);
//       }
//     }, 12); // Adjust typing speed by changing the interval (in milliseconds)
//   };

//   // Handle chat function to add new messages to the chat
//   const handleChat = (newQuestion) => {
//     setLoading(true); // Set loading to true when chat starts
  
//     const newChat = {
//       id: chats.length + 1, // Incremental id
//       question: newQuestion,
//       answer: "AI is thinking...", // Initial AI thinking message
//     };
  
//     setChats((prevChats) => [...prevChats, newChat]);
  
//     // Simulate AI response after a short delay
//     setTimeout(async () => {
//       try {
//         const aiResponse = await Gemini(newQuestion); // Simulate AI response
//         console.log(aiResponse);
//         typingEffect(newChat.id, aiResponse); // Start typing animation
//       } catch (error) {
//         console.error("Error fetching AI response:", error);
//       } finally {
//         setLoading(false); // Set loading to false after AI response is processed
//       }
//     }, 100); // Simulate a 2-second delay before starting the typing animation
//   };
      

//   // Function to copy text to clipboard
//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text).then(
//       () => {
//         toast.success("Copied to clipboard!");
        
//       },
//       (err) => {
//         console.error("Error copying text: ", err);
//         toast.error("Error copying text: ", err);

//       }
//     );
//   };

//   return (
//     <>
//       <div
//         ref={chatContainerRef}
//         className="max-w-screen-lg m-auto mt-24 max-h-screen overflow-y-auto pb-20"
//       >
//         {chats.map((chat) => (
//           <div key={chat.id}>
//             <div className="chat chat-end">
//               <div className="chat-image avatar">
//                 <div className="w-10 rounded-full">
//                   <img
//                     alt="Tailwind CSS chat bubble component"
//                     src="/src/assets/user.jpg"
//                   />
//                 </div>
//               </div>  
//               <div className="chat-header">
//                 <b>You</b>
//                 <time className="text-xs opacity-50"></time>
//               </div>
//               <div className="chat-bubble">{chat.question}</div>
//             </div>

//             <div className="chat chat-start">
//               <div className="chat-image avatar">
//                 <div className="w-10 rounded-full">
//                   <img
//                     alt="Tailwind CSS chat bubble component"
//                     src="/src/assets/logo.webp"
//                   />
//                 </div>
//               </div>
//               <div className="chat-header">
//                 <b>Sameet~Ai</b>
//                 <time className="text-xs opacity-50"></time>
//               </div>
//               <div className="chat-bubble">
//                <p> {chat.answer} </p>
//                 <br /> 
//                 <div 
//                   className="flex justify-end cursor-pointer" 
//                   onClick={() => copyToClipboard(chat.answer)}
//                 >
//                   <FaCopy />
//                 </div> 
//               </div>
//             </div>
//           </div>
//         ))}

//         {/* Footer */}
//         <div className="fixed bottom-0 left-0 w-full bg-base-100 shadow-md px-4 py-3">
//           <div className="flex justify-center">
//             <div className="w-full max-w-2xl">
//               <form
//                 className="flex items-center space-x-2"
//                 onSubmit={(e) => {
//                   e.preventDefault();
//                   const message = e.target.elements.message.value;
//                   handleChat(message);
//                   e.target.reset();
//                 }}
//               >
//                 <input
//                   name="message"
//                   type="text"
//                   placeholder="Type your message..."
//                   className="input input-bordered w-full rounded-full px-4"
//                 />
//                 <button
//                   type="submit"
//                   className="btn btn-neutral rounded-full px-12"
//                 >{loading ? ( <span className="loading loading-dots loading-md"></span>):("Send")}
                  
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//       <ToastContainer />
//     </>
//   );
// }

// export default App;
