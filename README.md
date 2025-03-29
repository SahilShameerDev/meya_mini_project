# LegalEase Mini Project

## Project Summary
LegalEase is a web-based application designed to assist users with legal queries using AI-powered responses. The project consists of a **frontend** built with React and a **backend** powered by Node.js and Express. The AI service leverages Google Generative AI to provide detailed, legally sound answers based on Indian law.

---

## Key Features
### 1. **Speech-to-Text Query Input**
Users can input their legal queries via voice, which is converted to text using the browser's SpeechRecognition API.

```javascript
// Speech recognition setup
const recognition = new SpeechRecognition();
recognition.onresult = (event) => {
  const transcript = Array.from(event.results)
    .map((result) => result[0].transcript)
    .join("");
  setCode((prev) => prev + transcript);
};
```

### 2. **Language Toggle**
Switch between English and Malayalam for query input.

```javascript
function toggleMalayalam() {
  if (lang === "ml-IN") {
    setLang("en-US");
    setPlaceholder("Ask your legal query here");
  } else {
    setLang("ml-IN");
    setPlaceholder("നിങ്ങളുടെ നിയമ ചോദ്യം ഇവിടെ ടൈപ്പ് ചെയ്യുക");
  }
}
```

### 3. **AI-Powered Legal Query Response**
The backend integrates with Google Generative AI to provide detailed legal advice.

```javascript
// AI service integration
async function generateContent(prompt) {
  const result = await model.generateContent(prompt);
  return result.response.text();
}
```

### 4. **Code Editor with Syntax Highlighting**
Users can input queries in a code editor with syntax highlighting powered by Prism.js.

```javascript
<Editor
  value={code}
  onValueChange={(code) => setCode(code)}
  highlight={(code) =>
    Prism.highlight(code, Prism.languages.javascript, "javascript")
  }
/>
```

---

## Test Cases

| Column Name       | Description                                                                 |
|-------------------|-----------------------------------------------------------------------------|
| **Test Case ID**  | A unique identifier for each test case (e.g., TC001, TC002).               |
| **Test Scenario** | A brief description of what is being tested (e.g., "Login Functionality"). |
| **Test Steps**    | Step-by-step instructions on how to execute the test.                      |
| **Expected Result** | The outcome that should occur if the system works correctly.             |
| **Actual Result** | The actual behavior of the system during testing.                          |
| **Status**        | Indicates whether the test case passed or failed.                         |

### Example Test Cases

| Test Case ID | Test Scenario                  | Test Steps                                                                 | Expected Result                          | Actual Result                            | Status  |
|--------------|--------------------------------|---------------------------------------------------------------------------|------------------------------------------|------------------------------------------|---------|
| TC001        | Speech-to-Text Functionality  | 1. Click the microphone icon. <br> 2. Speak a query. <br> 3. Stop recording. | Query text appears in the editor.        | Query text appears in the editor.        | Passed  |
| TC002        | Language Toggle               | 1. Click the language toggle button. <br> 2. Verify placeholder text changes. | Placeholder switches between languages.  | Placeholder switches between languages.  | Passed  |
| TC003        | AI Query Response             | 1. Enter a query. <br> 2. Click "Query" button. <br> 3. Wait for response.   | AI provides a detailed legal response.   | AI provides a detailed legal response.   | Passed  |
| TC004        | Code Editor Syntax Highlighting | 1. Enter JavaScript code in the editor. <br> 2. Verify syntax highlighting. | Code is highlighted correctly.           | Code is highlighted correctly.           | Passed  |

---

## Conclusion
LegalEase is a robust platform that combines modern web technologies with AI to provide users with accessible legal assistance. The project demonstrates the integration of frontend and backend systems, AI services, and user-friendly features like speech recognition and multilingual support. Future enhancements could include expanding the AI's legal knowledge base and adding more languages for broader accessibility.