document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("details").forEach((detail) => {
        detail.addEventListener("click", function (event) {
            // Prevent event from bubbling up and causing unexpected behavior
            event.stopPropagation();

            // Close all sibling <details> elements
            this.parentElement.querySelectorAll("details").forEach((sibling) => {
                if (sibling !== this) {
                    sibling.removeAttribute("open");
                }
            });
        });
    });
    const sectionCode = document.getElementById("sectionTitle").getAttribute("code");
    const jsonFileName = `${sectionCode}.json`;

    const contentDiv = document.getElementById("content");
    const loadingMessage = document.createElement("p");
    loadingMessage.textContent = "Loading questions...";
    loadingMessage.style.textAlign = "center";
    loadingMessage.style.fontWeight = "bold";
    contentDiv.appendChild(loadingMessage); // Append loading message immediately

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
    let presentationMode = false;
    let contentLoading = true;

    window.addEventListener('load', () => {
        const userModal = new bootstrap.Modal(document.getElementById('userModal'));
        const userList = document.getElementById('userList');
        const newUserNameInput = document.getElementById('newUserName');
        const addNewUserButton = document.getElementById('addNewUser');
        const presentationModeToggle = document.querySelector(".presentation-mode-toggle");

        presentationModeToggle.addEventListener("click", () => {
            presentationMode = !presentationMode;
            document.body.classList.toggle("presentation-mode", presentationMode);
            updateImageSizes();
        });

        loadUsers();
        userModal.show(); // Show modal immediately

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

            userModal._element.classList.add('fade-out-up');
            userModal._element.addEventListener('hidden.bs.modal', function onHidden() {
                userModal._element.removeEventListener('hidden.bs.modal', onHidden);
                userModal._element.classList.remove('fade-out-up');

                if (!contentLoading) {
                    updateQuestionVisibility();
                }
            });
            userModal.hide();
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
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(jsonData => {
                data = jsonData;
                loadQuestions(data);
            })
            .catch(error => {
                console.error("Error loading questions:", error);
                loadingMessage.textContent = "Failed to load questions."; // Update loading message on error
            });
    });


    function loadQuestions(data) {
        console.log("loadQuestions function called"); // Debugging log
        if (!data || !data.questions) {
            console.error("Invalid question data received:", data);
            loadingMessage.textContent = "Error: Invalid question data.";
            return;
        }

        const questionList = document.createElement("ul");
        questionList.classList.add("list-group-flush");

        data.questions.forEach((question, index) => {
            if (!question.solutionRechecked) {
                return;
            }

            const listItem = document.createElement("li");
            listItem.classList.add("list-group-item");
            const questionDetails = document.createElement("details");
            const questionSummary = document.createElement("summary");

            questionSummary.textContent = `${index + 1}. ${question.title || "Question Title"}`;
            questionSummary.dataset.questionId = question.id;
            questionSummary.style.fontWeight = solvedQuestions.has(question.id) ? "normal" : "bold";
            questionDetails.appendChild(questionSummary);


            if (question.questionText) {
                const questionText = document.createElement("div");
                questionText.innerHTML = wrapTextInParagraphs(processDiagrams(formatText(question.questionText), question.id));
                questionDetails.appendChild(questionText);
            }
            if (question.answer) {
                const answerDetails = document.createElement("details");
                const answerSummary = document.createElement("summary");
                answerSummary.textContent = "Answer Key";
                answerDetails.appendChild(answerSummary);

                const answerContent = document.createElement("div");
                answerContent.innerHTML = wrapTextInParagraphs(formatText(question.answer));
                answerDetails.appendChild(answerContent);
                questionDetails.appendChild(answerDetails);

                const gotAnswerButton = document.createElement("button");
                gotAnswerButton.textContent = "Mark as done!";
                gotAnswerButton.classList.add("btn", "btn-success", "btn-sm", "mt-2");
                gotAnswerButton.onclick = function () {
                    gotAnswerButton.style.display = "none";
                    questionSummary.style.fontWeight = "normal";
                    solvedQuestions.add(question.id);
                    const storedData = localStorage.getItem(`userData_${currentUserName}`);
                    let userData = {};
                    if (storedData) {
                        userData = JSON.parse(storedData);
                    }
                    userData[sectionCode] = [...solvedQuestions];
                    localStorage.setItem(`userData_${currentUserName}`, JSON.stringify(userData));
                };
                answerDetails.appendChild(gotAnswerButton);
            } else { // For questions without answer key
                const answerDetails = document.createElement("details");
                const answerSummary = document.createElement("summary");
                answerSummary.textContent = "Answer Key";
                answerDetails.appendChild(answerSummary);
                const answerContent = document.createElement("div");
                answerContent.innerHTML = wrapTextInParagraphs("To prove");
                answerDetails.appendChild(answerContent);
                questionDetails.appendChild(answerDetails);

                const gotAnswerButton = document.createElement("button");
                gotAnswerButton.textContent = "Mark as done!";
                gotAnswerButton.classList.add("btn", "btn-success", "mt-2");
                gotAnswerButton.onclick = function () {
                    gotAnswerButton.style.display = "none";
                    questionSummary.style.fontWeight = "normal";
                    solvedQuestions.add(question.id);
                    localStorage.setItem("solvedQuestions", JSON.stringify([...solvedQuestions]));
                };
                answerDetails.appendChild(gotAnswerButton);
            }
            if (question.hint) {
                const hintDetails = document.createElement("details");
                const hintSummary = document.createElement("summary");
                hintSummary.textContent = "Hint";
                hintDetails.appendChild(hintSummary);

                const hintContent = document.createElement("div");
                hintContent.innerHTML = wrapTextInParagraphs(formatText(question.hint));
                hintDetails.appendChild(hintContent);
                questionDetails.appendChild(hintDetails);
            }
            if (question.methodOfSolving && question.methodOfSolving.length > 0) {
                const methodDetails = document.createElement("details");
                const methodSummary = document.createElement("summary");
                methodSummary.textContent = "Method to Solve";
                methodDetails.appendChild(methodSummary);
                const methodList = document.createElement("ul");
                question.methodOfSolving.forEach((step, stepIndex) => {
                    const stepItem = document.createElement("li");
                    stepItem.innerHTML = `<strong>Step ${stepIndex + 1}:</strong> ${formatText(step)}`;
                    methodList.appendChild(stepItem);
                });
                methodDetails.appendChild(methodList);
                questionDetails.appendChild(methodDetails);
            }
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


        const images = contentDiv.querySelectorAll("img");
        images.forEach(img => {
            img.dataset.initialWidth = img.offsetWidth;
        });
        updateImageSizes();
        contentDiv.appendChild(questionList);

        contentDiv.removeChild(loadingMessage); // Remove loading message after questions loaded
        contentLoading = false; // Set contentLoading flag to false

        if (currentUserName) {
            updateQuestionVisibility(); // Update visibility if user is already selected
        }


        if (window.MathJax) {
            MathJax.typesetPromise().catch((err) => console.error("MathJax rendering error: ", err));
        }
    }


    function updateImageSizes() {
        const images = contentDiv.querySelectorAll("img");
        images.forEach(img => {
            if (presentationMode) {
                img.style.width = (img.dataset.initialWidth * 1.5) + "px";
            } else {
                img.style.width = img.dataset.initialWidth + "px";
            }
        });
    }


    function processDiagrams(text, questionId) {
        return text.replace(/DIAGRAM\[(\d+),(\d+)\]/g, (_, diagramNumber, width) => {
            return `<img src="dia/${questionId}_${diagramNumber}.png" alt="Diagram ${diagramNumber}" style="max-width:${width}px; margin-left: 30px;">`;
        });
    }

    function wrapTextInParagraphs(text) {
        return text
            .split("\\n")
            .map((line) => {
                if (line.trim().startsWith("\\(") && !line.includes("\\Rightarrow")) {
                    return `<p style="margin-left: 20px;">${line}</p>`;
                }
                return `<p>${line}</p>`;
            })
            .join("");
    }

    function formatText(text) {
        return text
            .replace(/\*(.*?)\*/g, "<strong>$1</strong>");
    }


    function updateQuestionVisibility() {
        const questionSummaries = contentDiv.querySelectorAll('.list-group-item summary');

        questionSummaries.forEach(summary => {
            const questionId = summary.dataset.questionId;
            summary.style.fontWeight = solvedQuestions.has(questionId) ? "normal" : "bold";

            const gotAnswerButton = summary.parentElement.querySelector(".btn-success");
            if (gotAnswerButton) {
                gotAnswerButton.style.display = solvedQuestions.has(questionId) ? "none" : "block";
            }
        });
    }
});
document.addEventListener("DOMContentLoaded", function () {
    function enforceSingleDetailsExpansion() {
        const detailsElements = document.querySelectorAll('details');

        detailsElements.forEach(details => {
            details.addEventListener('toggle', function (event) {
                if (details.open) { // Only proceed if the clicked details is being opened
                    const parentDetails = details.parentNode; // Get the parent node

                    if (parentDetails) {
                        const siblingDetails = parentDetails.querySelectorAll('details'); // Get all details in the same parent

                        siblingDetails.forEach(sibling => {
                            if (sibling !== details && sibling.open) { // Close other open siblings
                                sibling.removeAttribute('open'); // Use removeAttribute for better compatibility
                            }
                        });
                    }
                }
            });
        });
    }

    enforceSingleDetailsExpansion(); // Call the function to set up the behavior
});