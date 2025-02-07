document.addEventListener("DOMContentLoaded", function () {
    // 1. Exclusive details expantion, from first code
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
        userModal.show();

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
        console.log("loadQuestions function called");
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

            // Create tabs container
            const tabsWrapper = document.createElement('div');
            tabsWrapper.classList.add('d-flex', 'align-items-start'); // Flexbox for layout
            questionDetails.appendChild(tabsWrapper);

            const tabsCard = document.createElement('div');
            tabsCard.classList.add('card', 'flex-grow-1'); // flex-grow-1 to push button to right
            tabsWrapper.appendChild(tabsCard);

            const cardHeader = document.createElement('div');
            cardHeader.classList.add('card-header');
            const tabsNav = document.createElement('ul');
            tabsNav.classList.add('nav', 'nav-tabs', 'card-header-tabs');
            cardHeader.appendChild(tabsNav);
            tabsCard.appendChild(cardHeader);

            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');
            const tabContent = document.createElement('div');
            tabContent.classList.add('tab-content');
            cardBody.appendChild(tabContent);
            tabsCard.appendChild(cardBody);


            let tabIndex = 0;
            // Question Tab
            const questionTabItem = document.createElement('li');
            questionTabItem.classList.add('nav-item');
            const questionNavLink = document.createElement('a');
            questionNavLink.classList.add('nav-link');
            questionNavLink.id = `question-tab-${question.id}`;
            questionNavLink.href = `#question-pane-${question.id}`;
            questionNavLink.role = 'tab';
            questionNavLink.setAttribute('data-bs-toggle', 'tab');
            questionNavLink.setAttribute('aria-controls', `question-pane-${question.id}`);
            questionNavLink.setAttribute('aria-selected', tabIndex === 0 ? 'true' : 'false');
            questionNavLink.textContent = 'Question';
            if (tabIndex === 0) questionNavLink.classList.add('active');
            questionTabItem.appendChild(questionNavLink);
            tabsNav.appendChild(questionTabItem);

            const questionPane = document.createElement('div');
            questionPane.classList.add('tab-pane', 'fade');
            questionPane.id = `question-pane-${question.id}`;
            questionPane.role = 'tabpanel';
            questionPane.setAttribute('aria-labelledby', `question-tab-${question.id}`);
            if (tabIndex === 0) questionPane.classList.add('show', 'active');
            questionPane.innerHTML = wrapTextInParagraphs(processDiagrams(formatText(question.questionText), question.id));
            tabContent.appendChild(questionPane);
            tabIndex++;

            // Answer Key Tab
            if (question.answer || (!question.answer && question.type !== 'Subjective')) {
                console.log(`Creating Answer Key tab for question: ${question.id}`); // Debugging Log
                const answerTabItem = document.createElement('li');
                answerTabItem.classList.add('nav-item');
                const answerNavLink = document.createElement('a');
                answerNavLink.classList.add('nav-link');
                answerNavLink.id = `answer-tab-${question.id}`;
                answerNavLink.href = `#answer-pane-${question.id}`;
                answerNavLink.role = 'tab';
                answerNavLink.setAttribute('data-bs-toggle', 'tab');
                answerNavLink.setAttribute('aria-controls', `answer-pane-${question.id}`);
                answerNavLink.setAttribute('aria-selected', tabIndex === 0 ? 'true' : 'false');
                answerNavLink.textContent = 'Key';
                if (tabIndex === 0) answerNavLink.classList.add('active');
                answerTabItem.appendChild(answerNavLink);
                tabsNav.appendChild(answerTabItem);

                const answerPane = document.createElement('div');
                answerPane.classList.add('tab-pane', 'fade');
                answerPane.id = `answer-pane-${question.id}`;
                answerPane.role = 'tabpanel';
                answerPane.setAttribute('aria-labelledby', `answer-tab-${question.id}`);
                if (tabIndex === 0) answerPane.classList.add('show', 'active');
                answerPane.innerHTML = wrapTextInParagraphs(formatText(question.answer || "To prove"));

                // ***Create and Append Button After answerPane Content***
                const gotAnswerButton = document.createElement("button");
                gotAnswerButton.textContent = "done!";
                gotAnswerButton.classList.add("btn", "btn-outline-success", "btn-sm", "mt-2", "float-end");
                gotAnswerButton.onclick = function () {
                    questionDetails.open = false;
                    this.style.display = 'none';
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
                answerPane.appendChild(gotAnswerButton); // Button added inside the "Answer Key"


                tabContent.appendChild(answerPane);
                tabIndex++;
            } else {
                console.log(`Skipping Answer Key tab for question: ${question.id} (no answer or subjective)`); // Debugging Log
            }

            // Hint Tab
            if (question.hint) {
                const hintTabItem = document.createElement('li');
                hintTabItem.classList.add('nav-item');
                const hintNavLink = document.createElement('a');
                hintNavLink.classList.add('nav-link');
                hintNavLink.id = `hint-tab-${question.id}`;
                hintNavLink.href = `#hint-pane-${question.id}`;
                hintNavLink.role = 'tab';
                hintNavLink.setAttribute('data-bs-toggle', 'tab');
                hintNavLink.setAttribute('aria-controls', `hint-pane-${question.id}`);
                hintNavLink.setAttribute('aria-selected', tabIndex === 0 ? 'true' : 'false');
                hintNavLink.textContent = 'Hint';
                if (tabIndex === 0) hintNavLink.classList.add('active');
                hintTabItem.appendChild(hintNavLink);
                tabsNav.appendChild(hintTabItem);

                const hintPane = document.createElement('div');
                hintPane.classList.add('tab-pane', 'fade');
                hintPane.id = `hint-pane-${question.id}`;
                hintPane.role = 'tabpanel';
                hintPane.setAttribute('aria-labelledby', `hint-tab-${question.id}`);
                if (tabIndex === 0) hintPane.classList.add('show', 'active');
                hintPane.innerHTML = wrapTextInParagraphs(formatText(question.hint));
                tabContent.appendChild(hintPane);
                tabIndex++;
            }

            // Method to Solve Tab
            if (question.methodOfSolving && question.methodOfSolving.length > 0) {
                const methodTabItem = document.createElement('li');
                methodTabItem.classList.add('nav-item');
                const methodNavLink = document.createElement('a');
                methodNavLink.classList.add('nav-link');
                methodNavLink.id = `method-tab-${question.id}`;
                methodNavLink.href = `#method-pane-${question.id}`;
                methodNavLink.role = 'tab';
                methodNavLink.setAttribute('data-bs-toggle', 'tab');
                methodNavLink.setAttribute('aria-controls', `method-pane-${question.id}`);
                methodNavLink.setAttribute('aria-selected', tabIndex === 0 ? 'true' : 'false');
                methodNavLink.textContent = 'Steps';
                if (tabIndex === 0) methodNavLink.classList.add('active');
                methodTabItem.appendChild(methodNavLink);
                tabsNav.appendChild(methodTabItem);

                const methodPane = document.createElement('div');
                methodPane.classList.add('tab-pane', 'fade');
                methodPane.id = `method-pane-${question.id}`;
                methodPane.role = 'tabpanel';
                methodPane.setAttribute('aria-labelledby', `method-tab-${question.id}`);
                if (tabIndex === 0) methodPane.classList.add('show', 'active');
                let methodListHTML = '<ul>';
                question.methodOfSolving.forEach((step, stepIndex) => {
                    methodListHTML += `<li><strong>Step ${stepIndex + 1}:</strong> ${formatText(step)}</li>`;
                });
                methodListHTML += '</ul>';
                methodPane.innerHTML = methodListHTML;
                tabContent.appendChild(methodPane);
                tabIndex++;
            }

            // Detailed Solution Tab
            if (question.solution) {
                const solutionTabItem = document.createElement('li');
                solutionTabItem.classList.add('nav-item');
                const solutionNavLink = document.createElement('a');
                solutionNavLink.classList.add('nav-link');
                solutionNavLink.id = `solution-tab-${question.id}`;
                solutionNavLink.href = `#solution-pane-${question.id}`;
                solutionNavLink.role = 'tab';
                solutionNavLink.setAttribute('data-bs-toggle', 'tab');
                solutionNavLink.setAttribute('aria-controls', `solution-pane-${question.id}`);
                solutionNavLink.setAttribute('aria-selected', tabIndex === 0 ? 'true' : 'false');
                solutionNavLink.textContent = 'Solution';
                if (tabIndex === 0) solutionNavLink.classList.add('active');
                solutionTabItem.appendChild(solutionNavLink);
                tabsNav.appendChild(solutionTabItem);

                const solutionPane = document.createElement('div');
                solutionPane.classList.add('tab-pane', 'fade');
                solutionPane.id = `solution-pane-${question.id}`;
                solutionPane.role = 'tabpanel';
                solutionPane.setAttribute('aria-labelledby', `solution-tab-${question.id}`);
                if (tabIndex === 0) solutionPane.classList.add('show', 'active');
                solutionPane.innerHTML = wrapTextInParagraphs(processDiagrams(formatText(question.solution), question.id));
                tabContent.appendChild(solutionPane);
                tabIndex++;
            }
            questionDetails.appendChild(tabsCard);

            listItem.appendChild(questionDetails);
            questionList.appendChild(listItem);
        });

        const images = contentDiv.querySelectorAll("img");
        images.forEach(img => {
            img.dataset.initialWidth = img.offsetWidth;
            img.addEventListener('dblclick', function () {
                const modalImage = document.getElementById('modalImage');
                modalImage.src = this.src;
                imageModal.show();
            });
        });
        updateImageSizes();
        contentDiv.appendChild(questionList);

        contentDiv.removeChild(loadingMessage);
        contentLoading = false;

        if (currentUserName) {
            updateQuestionVisibility();
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
});