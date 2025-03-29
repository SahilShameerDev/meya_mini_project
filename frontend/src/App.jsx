import { useState, useEffect } from "react";
import Editor from "react-simple-code-editor";
import "./App.css";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

function App() {
  const [code, setCode] = useState(``);
  const [review, setReview] = useState(``);
  const [listening, setListening] = useState(false);
  const [lang, setLang] = useState("en-US");
  const [placeholder, setPlaceholder] = useState("Ask your legal query here");

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  useEffect(() => {
    // Check for browser SpeechRecognition API support.
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error("Speech Recognition API not supported in this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = lang;

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      setCode((prev) => prev + transcript);
    };

    recognition.onerror = (err) => {
      console.error("Speech recognition error:", err);
    };

    if (listening) {
      recognition.start();
    } else {
      recognition.stop();
    }

    // Cleanup on unmount.
    return () => {
      recognition.stop();
    };
  }, [listening, lang]);

  async function reviewCode() {
    console.log("Reviewing code");
    try {
      const response = await axios.post("http://localhost:3000/ai/get-review", {
        code,
      });
      setReview(response.data);
    } catch (error) {
      console.error("Error reviewing code:", error);
      setReview("Error reviewing code");
    }
  }

  function toggleMalayalam() {
    if (lang === "ml-IN") {
      setLang("en-US");
      setPlaceholder("Ask your legal query here");
    } else {
      setLang("ml-IN");
      setPlaceholder("നിങ്ങളുടെ നിയമ ചോദ്യം ഇവിടെ ടൈപ്പ് ചെയ്യുക");
    }
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              id="searchInput"
              value={code}
              onValueChange={(code) => setCode(code)}
              placeholder={placeholder}
              highlight={(code) =>
                Prism.highlight(code, Prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                height: "100%",
                width: "100%",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", marginTop: "1rem" }}>
            <div style={{ marginRight: "0.25rem" }}>
              <div
                className="voice"
                onClick={() => setListening((prev) => !prev)}
                style={{
                  backgroundColor: "rgb(9,27,59)",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="#fff"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                  <path d="M19 11v-1h-2v1c0 2.21-1.79 4-4 4s-4-1.79-4-4H5v1h2v2c0 2.76 2.24 5 5 5s5-2.24 5-5v-2h2z" />
                </svg>
              </div>
            </div>
            <div
              id="malayalamToggle"
              className="malayalamToggle"
              onClick={toggleMalayalam}
              style={{
                marginRight: "0.25rem",
                padding: "0.5rem",
                backgroundColor: "rgb(9,27,59)",
                color: "#fff",
                borderRadius: "5px",
                fontWeight: 500,
                cursor: "pointer",
                userSelect: "none",
                
              }}
            >
              {lang === "en-US" ? "മ" : "EN"}
            </div>
            <div
              className="review"
              onClick={reviewCode}
              style={{
                backgroundColor: "rgb(9,27,59)",
                color: "#fff",
                padding: "0.5rem 1rem",
                borderRadius: "5px",
                fontWeight: 500,
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              Query
            </div>
          </div>
        </div>
        <div className="right">
          <Markdown rehypePlugins={rehypeHighlight}>{review}</Markdown>
        </div>
      </main>
    </>
  );
}

export default App;
