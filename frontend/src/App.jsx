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


  
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  async function reviewCode() {
    console.log('Reviewing code');
    try {
      const response = await axios.post("http://localhost:3000/ai/get-review", { code });
      setReview(response.data);
    } catch (error) {
      console.error('Error reviewing code:', error);
      setReview('Error reviewing code');
    }
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) => Prism.highlight(code, Prism.languages.javascript, "javascript")}
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
          <div className="review" onClick={reviewCode}>Review</div>
        </div>
        <div className="right">
          <Markdown rehypePlugins={ rehypeHighlight }>{review}</Markdown>
        </div>
      </main>
    </>
  );
}

export default App;
