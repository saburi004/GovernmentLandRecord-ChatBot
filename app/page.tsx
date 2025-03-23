// "use client";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Spline from "@splinetool/react-spline";

// const LandQueryAssistant = () => {
//     const [query, setQuery] = useState("");
//     const [response, setResponse] = useState("");
//     const [isListening, setIsListening] = useState(false);
//     const [voices, setVoices] = useState<any[]>([]);
//     const [selectedLanguage, setSelectedLanguage] = useState("en");
//     const [audioUrl, setAudioUrl] = useState<string | null>(null);

//     // Load available voices
//     useEffect(() => {
//         const loadVoices = () => {
//             const availableVoices = window.speechSynthesis.getVoices();
//             setVoices(availableVoices);
//         };

//         if (window.speechSynthesis.onvoiceschanged !== undefined) {
//             window.speechSynthesis.onvoiceschanged = loadVoices;
//         }

//         loadVoices();
//     }, []);

//     const handleAsk = async () => {
//         try {
//             console.log("Sending request:", query);
//             // const res = await axios.post("http://127.0.0.1:8000/ask", 
//             const res = await axios.post("https://chatbotapi-pkrw.onrender.com/ask", 


//                 { 
//                     query,
//                     language: selectedLanguage
//                 },
//                 {
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Accept': 'application/json',
//                     },
//                     withCredentials: true
//                 }
//             );
//             console.log("Response received:", res.data);
//             setResponse(res.data.response);
            
//             // Play audio if available
//             if (res.data.audio_url) {
//                 // const audio = new Audio(`http://127.0.0.1:8000${res.data.audio_url}`);
//                 const audio = new Audio(`https://chatbotapi-pkrw.onrender.com${res.data.audio_url}`);

//                 audio.play();
//             }
//         } catch (error) {
//             console.error("Error details:", error);
//             setResponse(`Error: Please check console for details.`);
//         }
//     };

//     const startListening = () => {
//         if (!("webkitSpeechRecognition" in window)) {
//             alert("Speech Recognition is not supported in this browser.");
//             return;
//         }

//         const recognition = new (window as any).webkitSpeechRecognition();
//         recognition.continuous = false;
        
//         // Use selected language instead of detecting
//         switch(selectedLanguage) {
//             case "mr":
//                 recognition.lang = "mr-IN";
//                 break;
//             case "hi":
//                 recognition.lang = "hi-IN";
//                 break;
//             default:
//                 recognition.lang = "en-US";
//         }

//         recognition.onstart = () => setIsListening(true);

//         recognition.onresult = (event: any) => {
//             const transcript = event.results[0][0].transcript;
//             console.log("Recognized Speech:", transcript);
//             setQuery(transcript);
//             setIsListening(false);
//         };

//         recognition.onerror = (event: any) => {
//             console.error("Speech recognition error:", event.error);
//             setIsListening(false);
//         };

//         recognition.onend = () => setIsListening(false);

//         recognition.start();
//     };

//     // Get language-specific labels
//     const getLabels = () => {
//         switch(selectedLanguage) {
//             case "mr":
//                 return {
//                     title: "जमिनीच्या विचारपूस सहाय्यक",
//                     placeholder: "तुमचा प्रश्न लिहा...",
//                     ask: "विचारपूस करा",
//                     speak: "बोलणे सुरू करा",
//                     listening: "ऐकतो आहे...",
//                     response: "प्रतिसाद:"
//                 };
//             case "hi":
//                 return {
//                     title: "भूमि प्रश्न सहायक",
//                     placeholder: "अपना प्रश्न लिखें...",
//                     ask: "पूछें",
//                     speak: "बोलें",
//                     listening: "सुन रहा हूं...",
//                     response: "जवाब:"
//                 };
//             default:
//                 return {
//                     title: "Land Query Assistant",
//                     placeholder: "Enter your query...",
//                     ask: "Ask",
//                     speak: "Speak",
//                     listening: "Listening...",
//                     response: "Response:"
//                 };
//         }
//     };

//     const labels = getLabels();

//     return (
//         <div className="relative text-center h-screen flex flex-col justify-center items-center">
//             {/* Background Spline Model */}
//             <div className="fixed top-0 left-0 w-full h-full -z-10">
//                 <Spline
//                     scene="https://prod.spline.design/atstHpj9yxuHGed0/scene.splinecode"
//                 />
//             </div>

//             {/* Language Selection */}
//             <div className="relative z-20 mb-4">
//                 <select 
//                     value={selectedLanguage}
//                     onChange={(e) => setSelectedLanguage(e.target.value)}
//                     className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
//                 >
//                     <option value="en">English</option>
//                     <option value="hi">हिंदी</option>
//                     <option value="mr">मराठी</option>
//                 </select>
//             </div>

//             {/* Query Input and Buttons */}
//             <div className="relative z-20 mt-40">
//                 <h2 className="text-2xl font-bold mb-4">{labels.title}</h2>
//                 <input
//                     type="text"
//                     value={query}
//                     onChange={(e) => setQuery(e.target.value)}
//                     placeholder={labels.placeholder}
//                     className="px-4 py-2 w-72 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
//                 />
//                 <button
//                     onClick={handleAsk}
//                     className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                     {labels.ask}
//                 </button>
//                 <button
//                     onClick={startListening}
//                     className="ml-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
//                 >
//                     🎤 {isListening ? labels.listening : labels.speak}
//                 </button>
//             </div>

//             {/* Response Box */}
//             <div className="relative z-20 mt-8 w-1/2 p-6 bg-white bg-opacity-90 backdrop-blur-md rounded-lg border border-gray-200 text-black">
//                 <strong>{labels.response}</strong>
//                 <p className="mt-2">{response}</p>
//             </div>
//         </div>
//     );
// };

// export default LandQueryAssistant;
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Spline from "@splinetool/react-spline";
// import { franc } from "franc";

const LandQueryAssistant = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]); // Updated type
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [audioUrl, setAudioUrl] = useState<string | null>(null); // eslint-disable-line @typescript-eslint/no-unused-vars

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    loadVoices();
  }, []);

  const handleAsk = async () => {
    try {
      console.log("Sending request:", query);
      const res = await axios.post("https://chatbotapi-pkrw.onrender.com/ask", 
        { 
          query,
          language: selectedLanguage
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          withCredentials: true
        }
      );
      console.log("Response received:", res.data);
      setResponse(res.data.response);
      
      // Play audio if available
      if (res.data.audio_url) {
        const audio = new Audio(`https://chatbotapi-pkrw.onrender.com${res.data.audio_url}`);
        audio.play();
      }
    } catch (error) {
      console.error("Error details:", error);
      setResponse(`Error: Please check console for details.`);
    }
  };

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    
    // Use selected language instead of detecting
    switch(selectedLanguage) {
      case "mr":
        recognition.lang = "mr-IN";
        break;
      case "hi":
        recognition.lang = "hi-IN";
        break;
      default:
        recognition.lang = "en-US";
    }

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      console.log("Recognized Speech:", transcript);
      setQuery(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  // Get language-specific labels
  const getLabels = () => {
    switch(selectedLanguage) {
      case "mr":
        return {
          title: "जमिनीच्या विचारपूस सहाय्यक",
          placeholder: "तुमचा प्रश्न लिहा...",
          ask: "विचारपूस करा",
          speak: "बोलणे सुरू करा",
          listening: "ऐकतो आहे...",
          response: "प्रतिसाद:"
        };
      case "hi":
        return {
          title: "भूमि प्रश्न सहायक",
          placeholder: "अपना प्रश्न लिखें...",
          ask: "पूछें",
          speak: "बोलें",
          listening: "सुन रहा हूं...",
          response: "जवाब:"
        };
      default:
        return {
          title: "Land Query Assistant",
          placeholder: "Enter your query...",
          ask: "Ask",
          speak: "Speak",
          listening: "Listening...",
          response: "Response:"
        };
    }
  };

  const labels = getLabels();

  return (
    <div className="relative text-center h-screen flex flex-col justify-center items-center">
      {/* Background Spline Model */}
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <Spline
          scene="https://prod.spline.design/atstHpj9yxuHGed0/scene.splinecode"
        />
      </div>

      {/* Language Selection */}
      <div className="relative z-20 mb-4">
        <select 
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        >
          <option value="en">English</option>
          <option value="hi">हिंदी</option>
          <option value="mr">मराठी</option>
        </select>
      </div>

      {/* Query Input and Buttons */}
      <div className="relative z-20 mt-40">
        <h2 className="text-2xl font-bold mb-4">{labels.title}</h2>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={labels.placeholder}
          className="px-4 py-2 w-72 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
        <button
          onClick={handleAsk}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {labels.ask}
        </button>
        <button
          onClick={startListening}
          className="ml-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          🎤 {isListening ? labels.listening : labels.speak}
        </button>
      </div>

      {/* Response Box */}
      <div className="relative z-20 mt-8 w-1/2 p-6 bg-white bg-opacity-90 backdrop-blur-md rounded-lg border border-gray-200 text-black">
        <strong>{labels.response}</strong>
        <p className="mt-2">{response}</p>
      </div>
    </div>
  );
};

export default LandQueryAssistant;