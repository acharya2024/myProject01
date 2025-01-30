document.addEventListener("DOMContentLoaded", function () {
    const sectionCode = document.getElementById("sectionTitle").getAttribute("code");
    const jsonFileName = `${sectionCode}.json`;

    const contentDiv = document.getElementById("content");
    const loadingMessage = document.createElement("p");
    loadingMessage.textContent = "Loading questions...";
    loadingMessage.style.textAlign = "center";
    loadingMessage.style.fontWeight = "bold";
    contentDiv.appendChild(loadingMessage);

    const modalHtml = `
        <div class="modal fade" id="userModal" tabindex="-1" aria-labelledby="userModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="userModalLabel">Select Student</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <ul id="userList" class="list-group"></ul>
                        <div class="input-group mb-3">
                            <input type="text" id="newUserName" class="form-control" placeholder="New Student" aria-label="Recipient's username" aria-describedby="addNewUser">
                            <button class="btn btn-outline-secondary" type="button" id="addNewUser">Add</button>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>`;

    document.body.insertAdjacentHTML("beforeend", modalHtml);


    let currentUserName = null;
    let solvedQuestions = new Set();
    let data = null;

    //Put everything related to modal inside window.onload, for preventing errors related to it.
    window.addEventListener('load', () => {
        const userModal = new bootstrap.Modal(document.getElementById('userModal'));
        const userList = document.getElementById('userList');
        const newUserNameInput = document.getElementById('newUserName');
        const addNewUserButton = document.getElementById('addNewUser');

        function loadUsers() {
            const users = JSON.parse(localStorage.getItem("users")) || {};
            userList.innerHTML = "";

            for (const userName in users) {
                const listItem = document.createElement("li");
                listItem.classList.add("list-group-item");
                listItem.textContent = userName;
                listItem.style.cursor = "pointer";
                listItem.addEventListener("click", () => selectUser(userName));
                userList.appendChild(listItem);
            }
        }

        function selectUser(userName) {
            currentUserName = userName;
            const storedData = localStorage.getItem(`userData_${userName}`);
            if (storedData) {
                const userData = JSON.parse(storedData);
                solvedQuestions = new Set(userData[sectionCode] || []);
            } else {
                solvedQuestions = new Set();
            }
            userModal.hide();
            loadQuestions(data);
        }

        addNewUserButton.addEventListener("click", addNewUser);

        function addNewUser() {
            const newUserName = newUserNameInput.value.trim();
            if (newUserName) {
                const users = JSON.parse(localStorage.getItem("users")) || {};
                if (!users[newUserName]) {
                    users[newUserName] = true;
                    localStorage.setItem("users", JSON.stringify(users));
                    loadUsers();
                    selectUser(newUserName);
                    newUserNameInput.value = "";
                } else {
                    alert("User name already exists.");
                }
            }
        }

        fetch(jsonFileName)
            .then(response => response.json())
            .then(jsonData => {
                data = jsonData;
                loadUsers();
                userModal.show();
                loadingMessage.remove();
            })
            .catch(error => console.error("Error loading questions:", error));

    });


    // Function to load questions into the HTML
    function loadQuestions(data) {
        const questionList = document.createElement("ul");
        questionList.classList.add("list-group-flush");

        data.questions.forEach((question, index) => {
            if (!question.solutionRechecked) {
                return; // Skip questions where solutionRechecked is false
            }

            const listItem = document.createElement("li");
            listItem.classList.add("list-group-item");

            // Create details for the entire question
            const questionDetails = document.createElement("details");
            const questionSummary = document.createElement("summary");

            // Use textContent instead of <strong> to allow toggling style.fontWeight
            questionSummary.textContent = `${index + 1}. ${question.title || "Question Title"}`;
            questionSummary.style.fontWeight = solvedQuestions.has(question.id) ? "normal" : "bold";
            questionDetails.appendChild(questionSummary);

            // Add question text
            if (question.questionText) {
                const questionText = document.createElement("div");
                questionText.innerHTML = wrapTextInParagraphs(processDiagrams(formatText(question.questionText), question.id));
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

                // Add "Got the answer!" button
                const gotAnswerButton = document.createElement("button");
                gotAnswerButton.textContent = "Mark as done!";
                gotAnswerButton.classList.add("btn", "btn-success","btn-sm", "mt-2");
                gotAnswerButton.onclick = function () {
                    // Hide the button
                    gotAnswerButton.style.display = "none";
                    // Remove bold to mark as solved
                    questionSummary.style.fontWeight = "normal";
                    // Save solved status
                    solvedQuestions.add(question.id);
                    const storedData = localStorage.getItem(`userData_${currentUserName}`);
                    let userData = {};
                    if (storedData) {
                        userData = JSON.parse(storedData);
                    }
                    userData[sectionCode] = [...solvedQuestions]; // Save progress for this section
                    localStorage.setItem(`userData_${currentUserName}`, JSON.stringify(userData));

                };
                answerDetails.appendChild(gotAnswerButton);
            }
            else {
                const answerDetails = document.createElement("details");
                const answerSummary = document.createElement("summary");
                answerSummary.textContent = "Answer Key";
                answerDetails.appendChild(answerSummary);

                const answerContent = document.createElement("div");
                answerContent.innerHTML = wrapTextInParagraphs("To prove");
                answerDetails.appendChild(answerContent);

                questionDetails.appendChild(answerDetails);

                // Add "Got the answer!" button
                const gotAnswerButton = document.createElement("button");
                gotAnswerButton.textContent = "Mark as done!";
                gotAnswerButton.classList.add("btn", "btn-success", "mt-2");
                gotAnswerButton.onclick = function () {
                    // Hide the button
                    gotAnswerButton.style.display = "none";
                    // Remove bold to mark as solved
                    questionSummary.style.fontWeight = "normal";
                    // Save solved status
                    solvedQuestions.add(question.id);
                    localStorage.setItem("solvedQuestions", JSON.stringify([...solvedQuestions]));
                };
                answerDetails.appendChild(gotAnswerButton);
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
                    stepItem.innerHTML = `<strong>Step ${stepIndex + 1}:</strong> ${step}`; // Bold "Step"
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

                const solutionContent = document.createElement("div");
                solutionContent.innerHTML = wrapTextInParagraphs(processDiagrams(formatText(question.solution), question.id));
                solutionDetails.appendChild(solutionContent);

                questionDetails.appendChild(solutionDetails);
            }

            listItem.appendChild(questionDetails);
            questionList.appendChild(listItem);
        });

        contentDiv.appendChild(questionList);

        // Trigger MathJax to render math expressions
        if (window.MathJax) {
            MathJax.typesetPromise().catch((err) => console.error("MathJax rendering error: ", err));
        }
    }

    // Function to check Bookman Old Style font support
    function checkFontSupport() {
        const testElement = document.createElement("span");
        testElement.style.fontFamily = "Bookman Old Style";
        document.body.appendChild(testElement);
        const computedFont = window.getComputedStyle(testElement).fontFamily;
        document.body.removeChild(testElement);

        if (!computedFont.includes("Bookman")) {
            alert("Your device does not support Bookman Old Style font. Consider using a web-safe alternative like Georgia or Times New Roman.");
        }
    }
    //checkFontSupport();

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
    document.addEventListener("DOMContentLoaded", function () {
        const images = document.querySelectorAll("img");

        // Store initial dimensions for each image
        images.forEach(img => {
            img.dataset.initialWidth = img.offsetWidth;
            img.dataset.initialHeight = img.offsetHeight;
        });

    });
    // Function to enforce offline mode
    function requireOfflineMode() {
        const message = document.createElement("p");
        message.textContent = "Turn off your device's internet to see questions.";
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
                contentDiv.style.visibility = "visible";
                if (message.parentElement) {
                    message.remove();
                }
            } else {
                contentDiv.style.visibility = "hidden";
                if (!message.parentElement) {
                    document.body.appendChild(message);
                }
            }
        };

        updateVisibility();
        window.addEventListener("online", updateVisibility);
        window.addEventListener("offline", updateVisibility);
    }

    //requireOfflineMode();
});
