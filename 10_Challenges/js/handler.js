document.addEventListener("DOMContentLoaded", function () {
    const sectionCode = document.getElementById("sectionTitle").getAttribute("code");
    const jsonFileName = `${sectionCode}.json`;

    // Load questions from JSON file
    fetch(jsonFileName)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch questions.json");
            }
            return response.text(); // Fetch as text to preprocess
        })
        .then((text) => {
            const sanitizedText = text//.replace(/\\/g, "\\\\").replace(/\"/g, "\\\"");
            const data = JSON.parse(sanitizedText);
            loadQuestions(data);
        })
        .catch((error) => {
            console.error("Error loading questions: ", error);
        });

    // Function to load questions into the HTML
    function loadQuestions(data) {
        const contentDiv = document.getElementById("content");
        const questionList = document.createElement("ul");
        questionList.classList.add("list-group-flush");

        data.questions.forEach((question, index) => {
            if (!question.solutionRechecked) {
                return; // Skip questions where solutionRechecked is false
            }
            // Create list item
            const listItem = document.createElement("li");
            listItem.classList.add("list-group-item");

            // Create details for the entire question
            const questionDetails = document.createElement("details");
            const questionSummary = document.createElement("summary");
            questionSummary.innerHTML = `<strong>${index + 1}. ${question.title || "Question Title"}</strong>`; // Add serial number and bold title
            questionDetails.appendChild(questionSummary);

            //questionDetails.setAttribute("open", "true"); // Add open attribute to all details

            // Add question text
            if (question.questionText) {
                const questionText = document.createElement("div");
                questionText.innerHTML = wrapTextInParagraphs(processDiagrams(formatText(`${question.questionText}`), question.id));
                questionDetails.appendChild(questionText);
            }

            // Create details for answer key if available
            if (question.answer) {
                const answerDetails = document.createElement("details");
                const answerSummary = document.createElement("summary");
                answerSummary.textContent = "Answer Key";
                answerDetails.appendChild(answerSummary);
                const answerContent = document.createElement("div");
                answerContent.innerHTML = wrapTextInParagraphs(question.answer);
                answerDetails.appendChild(answerContent);
                questionDetails.appendChild(answerDetails);
            }

            // Create details for hint if available
            if (question.hint) {
                const hintDetails = document.createElement("details");
                const hintSummary = document.createElement("summary");
                hintSummary.textContent = "Hint";
                hintDetails.appendChild(hintSummary);
                const hintContent = document.createElement("div");
                hintContent.innerHTML = wrapTextInParagraphs(question.hint);
                hintDetails.appendChild(hintContent);
                questionDetails.appendChild(hintDetails);
            }

            // Create details for method to solve if available
            if (question.methodOfSolving && question.methodOfSolving.length > 0) {
                const methodDetails = document.createElement("details");
                const methodSummary = document.createElement("summary");
                methodSummary.textContent = "Method to Solve";
                methodDetails.appendChild(methodSummary);
                const methodList = document.createElement("ul");
                question.methodOfSolving.forEach((step, stepIndex) => {
                    const stepItem = document.createElement("li");
                    stepItem.textContent = `Step ${stepIndex + 1}: ${step}`;
                    methodList.appendChild(stepItem);
                });
                methodDetails.appendChild(methodList);
                questionDetails.appendChild(methodDetails);
            }

            // Create details for solution if available
            if (question.solution) {
                const solutionDetails = document.createElement("details");
                const solutionSummary = document.createElement("summary");
                solutionSummary.textContent = "Detailed Solution";
                solutionDetails.appendChild(solutionSummary);

                //solutionDetails.setAttribute("open", "true"); // Add open attribute to all details

                const solutionContent = document.createElement("div");
                solutionContent.innerHTML = wrapTextInParagraphs(processDiagrams(formatText(question.solution), question.id));
                solutionDetails.appendChild(solutionContent);
                questionDetails.appendChild(solutionDetails);
            }

            // Append the question details to the list item
            listItem.appendChild(questionDetails);

            // Append list item to the question list
            questionList.appendChild(listItem);
        });

        // Append the question list to the content div
        contentDiv.appendChild(questionList);

        // Trigger MathJax to render math expressions
        if (window.MathJax) {
            MathJax.typesetPromise().catch((err) => console.error("MathJax rendering error: ", err));
        }
    }

    // Function to replace diagram placeholders with image paths
    function processDiagrams(text, questionId) {
        return text.replace(/DIAGRAM\[(\d+),(\d+)\]/g, (_, diagramNumber, width) => {
            return `<img src="dia/${questionId}_${diagramNumber}.png" alt="Diagram ${diagramNumber}" style="max-width:${width}px; margin-left: 30px;">`;
        });
    }

    // Function to wrap text in <p> tags for new lines
    function wrapTextInParagraphs(text) {
        return text
            .split("\\n")
            .map((line) => {
                if (line.trim().startsWith("\\(") && !line.includes("\\Rightarrow")) {
                    // Add margin for lines starting with \( but not containing \Rightarrow
                    return `<p style="margin-left: 20px;">${line}</p>`;
                }
                return `<p>${line}</p>`;
            })
            .join("");
    }
    function formatText(text) {
        return text
            .replace(/\*(.*?)\*/g, "<strong>$1</strong>") // Bold for *WORD*
    }
    function requireOfflineMode() {
        const contentDiv = document.getElementById("content");
        const message = document.createElement("p");
        message.textContent = "Turn off net to see questions.";
        message.style.position = "absolute";
        message.style.top = "50%";
        message.style.left = "50%";
        message.style.transform = "translate(-50%, -50%)";
        message.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
        message.style.padding = "10px 20px";
        message.style.border = "2px solid black";
        message.style.borderRadius = "8px";
        message.style.fontSize = "18px";
        message.style.textAlign = "center";
        message.style.fontWeight = "bold";
        message.style.zIndex = "1000";
    
        const updateVisibility = () => {
            if (!navigator.onLine) {
                contentDiv.style.visibility = "visible"; // Show content when offline
                if (message.parentElement) {
                    message.remove(); // Remove the message when offline
                }
            } else {
                contentDiv.style.visibility = "hidden"; // Hide content when online
                if (!message.parentElement) {
                    document.body.appendChild(message); // Add message over all content
                }
            }
        };
    
        // Initial check
        updateVisibility();
    
        // Monitor network changes
        window.addEventListener("online", updateVisibility);
        window.addEventListener("offline", updateVisibility);
    }
    
        
    //requireOfflineMode()
});
