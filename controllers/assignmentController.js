// assignmentController.js
function getCurrentExerciseID() {
    const exerciseElement = document.getElementById("exerciseName");
    return exerciseElement.getAttribute("exerciseID");
}

// Function to load and render questions from JSON data
function loadQuestions() {
    // Extract text from the DOM element
    const exerciseName = getCurrentExerciseID();

    // Format the text by replacing spaces with underscores
    const formattedName = exerciseName.replace(/ /g, "_");

    // Construct the JSON file name
    const jsonFileName = `${formattedName}_Questions.json`;
    fetch(jsonFileName)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(questionsData => {
            const questionsContainer = document.getElementById('content');

            // Organize questions by exercise name
            const exercises = {};
            questionsData.questions.forEach(question => {
                if (!exercises[question.exerciseName]) {
                    exercises[question.exerciseName] = [];
                }
                exercises[question.exerciseName].push(question);
            });

            // For each exercise, create an accordion item
            Object.keys(exercises).forEach((exerciseName, index) => {
                const exerciseId = `exercise-${index}`;
                const exerciseQuestions = exercises[exerciseName];

                const accordionItem = document.createElement('div');
                accordionItem.className = 'accordion-item';

                const headerId = `heading-${exerciseId}`;
                const collapseId = `collapse-${exerciseId}`;

                accordionItem.innerHTML = `
                    <h2 class="accordion-header" id="${headerId}">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#${collapseId}" aria-expanded="false"
                            aria-controls="${collapseId}">
                            <strong>${exerciseName}</strong>
                        </button>
                    </h2>
                    <div id="${collapseId}" class="accordion-collapse collapse"
                        aria-labelledby="${headerId}" data-bs-parent="#content">
                        <div class="accordion-body" id="body-${exerciseId}">
                            <!-- Questions will be inserted here -->
                        </div>
                    </div>
                `;

                questionsContainer.appendChild(accordionItem);

                const exerciseBody = document.getElementById(`body-${exerciseId}`);

                // Iterate through questions with index to assign displayNumber
                exerciseQuestions.forEach((question, qIndex) => {
                    let questionHTML = '';
                    const displayNumber = qIndex + 1; // Sequential numbering starting from 1

                    switch (question.type) {
                        case 'truefalse':
                            questionHTML = generateTrueFalseHTML(question, displayNumber);
                            break;
                        case 'oneword':
                            questionHTML = generateOneWordHTML(question, displayNumber);
                            break;
                        case 'singleoption':
                            questionHTML = generateSingleOptionHTML(question, displayNumber);
                            break;
                        case 'multipleoption':
                            questionHTML = generateMultipleOptionHTML(question, displayNumber);
                            break;
                        case 'numerical':
                            questionHTML = generateNumericalHTML(question, displayNumber);
                            break;
                        case 'paragraph':
                            questionHTML = generateParagraphHTML(question, displayNumber);
                            break;
                        case 'subjective': // New case for Subjective questions
                            questionHTML = generateSubjectiveHTML(question, displayNumber);
                            break;
                        // Add other cases if you have more types
                        default:
                            console.warn(`Unknown question type: ${question.type}`);
                            return;
                    }
                    exerciseBody.insertAdjacentHTML('beforeend', questionHTML);
                });
            });

            // After rendering all questions, call loadProgress()
            loadProgress();
            MathJax.typeset();

        })
        .catch(error => console.error('Error loading questions:', error));
}

function generateMultipleOptionHTML(question, displayNumber) {
    const optionsHTML = question.options.map(option => `
        <button class="btn btn-outline-primary option-btn" onclick="toggleMultipleOption(this)">${option}</button>
    `).join('');
    question.questionText= question.questionText.replace(/\\n/g, "<br>");
    return `
        <div class="card shadow-sm mb-3" id="question-${question.id}" data-question-type="${question.type}" data-answer="${question.answer}">
            <div class="card-body">
                <p class="text-muted text-center"><strong>Question ${displayNumber}</strong>
                <span class="result-icon" id="result-${question.id}"></span></p>
                <p>${question.questionText}</p>
                <div class="options-list">
                    ${optionsHTML}
                </div>
                <button class="btn btn-outline-secondary mt-2" type="button" onclick="checkMultipleOptionAnswer('${question.id}')">Submit</button>
                <details>
                    <summary><strong>Hint</strong></summary>
                    <p>${question.hint}</p>
                </details>
                <details class="solution-details hidden" id="solution-${question.id}">
                    <summary><strong>Solution</strong></summary>
                    <p>${question.solution}</p>
                </details>
            </div>
        </div>`;
}

// Function to toggle the selection of multiple-choice options
function toggleMultipleOption(btn) {
    if (!btn.classList.contains('selected')) {
        btn.classList.add('selected');
        btn.classList.remove('btn-outline-primary');
        btn.classList.add('btn-primary');
    } else {
        btn.classList.remove('selected');
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-outline-primary');
    }
}


// Generate HTML for True/False questions
function generateTrueFalseHTML(question, displayNumber) {
    question.questionText= question.questionText.replace(/\\n/g, "<br>");
    return `
        <div class="card shadow-sm mb-3" id="question-${question.id}" data-question-type="${question.type}" data-answer="${question.answer}">
            <div class="card-body">
                <p class="text-muted text-center"><strong>Question ${displayNumber}</strong>
                <span class="result-icon" id="result-${question.id}"></span></p>
                <p>${question.questionText}</p>
                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-primary option-btn" onclick="checkTrueFalseAnswer('${question.id}', 'True')">True</button>
                    <button type="button" class="btn btn-primary option-btn" onclick="checkTrueFalseAnswer('${question.id}', 'False')">False</button>
                </div>
                <details>
                    <summary><strong>Hint</strong></summary>
                    <p>${question.hint}</p>
                </details>
                <details class="solution-details hidden" id="solution-${question.id}">
                    <summary><strong>Solution</strong></summary>
                    <p>${question.solution}</p>
                </details>
            </div>
        </div>`;
}

// Generate HTML for One Word questions
function generateOneWordHTML(question, displayNumber) {
    question.questionText= question.questionText.replace(/\\n/g, "<br>");
    return `
        <div class="card shadow-sm mb-3" id="question-${question.id}" 
             data-question-type="${question.type}" 
             data-answers='${JSON.stringify(question.answer)}'>
            <div class="card-body">
                <p class="text-muted text-center">
                    <strong>Question ${displayNumber}</strong>
                    <span class="result-icon" id="result-${question.id}"></span>
                </p>
                <p>${question.questionText}</p>
                <div class="input-group small-input">
                    <input type="text" class="form-control" placeholder="Enter your answer" id="input-${question.id}">
                    <button class="btn btn-outline-secondary submit-btn" type="button" onclick="checkOneWordAnswer('${question.id}')">Submit</button>
                </div>
                <details>
                    <summary><strong>Hint</strong></summary>
                    <p>${question.hint}</p>
                </details>
                <details class="solution-details hidden" id="solution-${question.id}">
                    <summary><strong>Solution</strong></summary>
                    <p>${question.solution}</p>
                </details>
            </div>
        </div>`;
}

// Generate HTML for Single Option questions
function generateSingleOptionHTML(question, displayNumber) {
    question.questionText= question.questionText.replace(/\\n/g, "<br>");
    const optionsHTML = question.options.map(option => `
        <button class="btn btn-outline-primary option-btn" onclick="checkSingleOptionAnswer('${question.id}', '${option.charAt(0)}')">${option}</button>
    `).join('');

    return `
        <div class="card shadow-sm mb-3" id="question-${question.id}" data-question-type="${question.type}" data-answer="${question.answer}">
            <div class="card-body">
                <p class="text-muted text-center"><strong>Question ${displayNumber}</strong>
                <span class="result-icon" id="result-${question.id}"></span></p>
                <p>${question.questionText}</p>
                <div class="options-list">
                    ${optionsHTML}
                </div>
                <details>
                    <summary><strong>Hint</strong></summary>
                    <p>${question.hint}</p>
                </details>
                <details class="solution-details hidden" id="solution-${question.id}">
                    <summary><strong>Solution</strong></summary>
                    <p>${question.solution}</p>
                </details>
            </div>
        </div>`;
}

// Function to generate HTML for Numerical (Integer) questions
function generateNumericalHTML(question, displayNumber) {
    question.questionText= question.questionText.replace(/\\n/g, "<br>");
    return `
        <div class="card shadow-sm mb-3" id="question-${question.id}" data-question-type="${question.type}" data-answer="${question.answer}" data-range="${question.range}">
            <div class="card-body">
                <p class="text-muted text-center"><strong>Question ${displayNumber}</strong>
                <span class="result-icon" id="result-${question.id}"></span></p>
                <p>${question.questionText}</p>
                <div class="input-group small-input">
                    <input type="number" class="form-control" placeholder="Enter your answer" id="input-${question.id}" step="1">
                    <button class="btn btn-outline-secondary submit-btn" type="button" onclick="checkNumericalAnswer('${question.id}')">Submit</button>
                </div>
                <details>
                    <summary><strong>Hint</strong></summary>
                    <p>${question.hint}</p>
                </details>
                <details class="solution-details hidden" id="solution-${question.id}">
                    <summary><strong>Solution</strong></summary>
                    <p>${question.solution}</p>
                </details>
            </div>
        </div>`;
}

// Function to generate HTML for Paragraph-based questions with sequential numbering
function generateParagraphHTML(question, displayNumber) {
    question.paragraph= question.paragraph.replace(/\\n/g, "<br>");
    // Destructure the question object to extract the paragraph and sub-questions
    const { paragraph, questions: subQuestions } = question;
    // Generate HTML for each sub-question
    const subQuestionsHTML = subQuestions.map((subQuestion, subIndex) => {
        const subDisplayNumber = subIndex + 1; // Sequential numbering starting from 1 within the paragraph
        let subQuestionHTML = '';

        switch (subQuestion.type) {
            case 'truefalse':
                subQuestionHTML = generateTrueFalseHTML(subQuestion, subDisplayNumber);
                break;
            case 'oneword':
                subQuestionHTML = generateOneWordHTML(subQuestion, subDisplayNumber);
                break;
            case 'singleoption':
                subQuestionHTML = generateSingleOptionHTML(subQuestion, subDisplayNumber);
                break;
            case 'multipleoption':
                subQuestionHTML = generateMultipleOptionHTML(subQuestion, subDisplayNumber);
                break;
            case 'numerical':
                subQuestionHTML = generateNumericalHTML(subQuestion, subDisplayNumber);
                break;
            // Add other cases if you have more sub-question types
            default:
                console.warn(`Unknown sub-question type: ${subQuestion.type}`);
                return '';
        }
        return subQuestionHTML;
    }).join('');

    return `
        <div class="card shadow-sm mb-3" id="question-${question.id}" data-question-type="${question.type}">
            <div class="card-body">
                <p class="text-muted text-center"><strong>Paragraph ${displayNumber}</strong></p>
                <p>${paragraph}</p>
                <div class="sub-questions">
                    ${subQuestionsHTML}
                </div>
            </div>
        </div>`;
}

// Function to generate HTML for Subjective questions with sequential numbering
function generateSubjectiveHTML(question, displayNumber) {
    question.questionText= question.questionText.replace(/\\n/g, "<br>");
    return `
        <div class="card shadow-sm mb-3" id="question-${question.id}" data-question-type="${question.type}" data-answer="${question.answer}">
            <div class="card-body">
                <p class="text-muted text-center"><strong>Question ${displayNumber}</strong>
                <span class="result-icon" id="result-${question.id}"></span></p>
                <p>${question.questionText}</p>
                
                <details>
                    <summary><strong>Hint</strong></summary>
                    <p>${question.hint}</p>
                </details>
                
                <details>
                    <summary><strong>Answer</strong></summary>
                    <p>${question.answer}</p>
                    <div class="answer-key">
                        <p><strong>Did you get it correct?</strong></p>
                        <button class="btn btn-success me-2" onclick="checkSubjectiveAnswer('${question.id}', 'correct')">Got correct?</button>
                        <button class="btn btn-danger" onclick="checkSubjectiveAnswer('${question.id}', 'incorrect')">Got incorrect?</button>
                    </div>
                </details>                
                
                <details class="solution-details" id="solution-${question.id}">
                    <summary><strong>Solution Summary</strong></summary>
                    <p>${question.solutionSummary}</p>
                </details>
                <details class="solution-details" id="solution-${question.id}">                    
                    <summary><strong>Detailed Solution</strong></summary>
                    <p>${question.detailedSolution}</p>
                </details>
                
            </div>
        </div>`;
}

// Function to check Multiple Option answers
function checkMultipleOptionAnswer(questionId) {
    const questionElement = document.getElementById(`question-${questionId}`);
    const selectedBtns = questionElement.querySelectorAll('.option-btn.selected');
    const correctAnswers = questionElement.getAttribute('data-answer').split(',');
    const resultIcon = document.getElementById(`result-${questionId}`);
    const solutionDetails = document.getElementById(`solution-${questionId}`);

    let userAnswers = [];
    selectedBtns.forEach(btn => {
        const value = btn.textContent.trim().charAt(0).toUpperCase();
        userAnswers.push(value);
    });

    // Normalize answers by trimming and converting to uppercase
    userAnswers = userAnswers.map(ans => ans.trim().toUpperCase());
    const normalizedCorrect = correctAnswers.map(ans => ans.trim().toUpperCase());

    // Check if userAnswers match correctAnswers
    let status = 'correct';
    if (userAnswers.length !== normalizedCorrect.length) {
        status = 'incorrect';
    } else {
        for (let ans of normalizedCorrect) {
            if (!userAnswers.includes(ans)) {
                status = 'incorrect';
                break;
            }
        }
    }

    // Update button styles
    const buttons = questionElement.querySelectorAll('.option-btn');
    buttons.forEach(btn => {
        btn.disabled = true;
        const btnOption = btn.textContent.trim().charAt(0).toUpperCase();
        if (normalizedCorrect.includes(btnOption)) {
            btn.classList.remove('btn-outline-primary', 'btn-primary');
            btn.classList.add('btn-success');
        }
        if (userAnswers.includes(btnOption) && !normalizedCorrect.includes(btnOption)) {
            btn.classList.remove('btn-outline-primary', 'btn-primary');
            btn.classList.add('btn-danger');
        }
        if (!normalizedCorrect.includes(btnOption) && !userAnswers.includes(btnOption)) {
            btn.classList.remove('btn-outline-primary', 'btn-primary');
            btn.classList.add('btn-secondary');
        }
    });

    // Disable the Submit button
    questionElement.querySelector('button.btn-outline-secondary').disabled = true;

    // Display result icon
    if (status === 'correct') {
        resultIcon.textContent = "✓";
        resultIcon.classList.add('correct');
        resultIcon.classList.remove('incorrect');
    } else {
        resultIcon.textContent = "✗";
        resultIcon.classList.add('incorrect');
        resultIcon.classList.remove('correct');
    }

    // Reveal the solution
    solutionDetails.classList.remove('hidden');

    // Save progress
    saveProgress(questionId, status, userAnswers.join(','));
}
// Function to check True/False answers
function checkTrueFalseAnswer(questionId, selectedAnswer) {
    const questionElement = document.getElementById(`question-${questionId}`);
    const correctAnswer = questionElement.getAttribute('data-answer');
    const resultIcon = document.getElementById(`result-${questionId}`);
    const solutionDetails = document.getElementById(`solution-${questionId}`);
    const buttons = questionElement.querySelectorAll('.option-btn');

    let status = 'incorrect';
    if (selectedAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        status = 'correct';
    }

    // Update button styles
    buttons.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent.trim().toLowerCase() === selectedAnswer.toLowerCase()) {
            if (status === 'correct') {
                btn.classList.remove('btn-primary');
                btn.classList.add('btn-success');
            } else {
                btn.classList.remove('btn-primary');
                btn.classList.add('btn-danger');
            }
        } else {
            btn.classList.remove('btn-primary');
            btn.classList.add('btn-secondary');
        }
    });

    // Display result icon
    if (status === 'correct') {
        resultIcon.textContent = "✓";
        resultIcon.classList.add('correct');
        resultIcon.classList.remove('incorrect');
    } else {
        resultIcon.textContent = "✗";
        resultIcon.classList.add('incorrect');
        resultIcon.classList.remove('correct');
    }

    // Reveal the solution
    solutionDetails.classList.remove('hidden');

    // Save progress
    saveProgress(questionId, status, selectedAnswer);
}

// Function to check One Word answers
function checkOneWordAnswer(questionId) {
    const inputElement = document.getElementById(`input-${questionId}`);
    const userAnswer = inputElement.value.trim();
    const questionElement = document.getElementById(`question-${questionId}`);
    const correctAnswers = JSON.parse(questionElement.getAttribute('data-answers')); // Parse the JSON array of possible answers
    const resultIcon = document.getElementById(`result-${questionId}`);
    const solutionDetails = document.getElementById(`solution-${questionId}`);

    console.log("Checking: " + questionId + " response: " + userAnswer + " answers: " + correctAnswers);

    let status = 'incorrect';

    // Function to calculate Levenshtein Distance
    function levenshteinDistance(a, b) {
        const matrix = [];

        // Create a distance matrix
        for (let i = 0; i <= b.length; i++) {
            matrix[i] = [i];
        }
        for (let j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }

        // Fill the matrix
        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1, // Substitution
                        Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1) // Insertion and Deletion
                    );
                }
            }
        }

        return matrix[b.length][a.length];
    }

    // Allow slight spelling mistakes (threshold)
    const threshold = 2; // Adjust this value as needed

    // Check if the user's answer matches any of the correct answers within the threshold
    for (const answer of correctAnswers) {
        if (
            userAnswer.toLowerCase() === answer.toLowerCase() ||
            levenshteinDistance(userAnswer.toLowerCase(), answer.toLowerCase()) <= threshold
        ) {
            status = 'correct';
            break;
        }
    }

    // Display result icon
    if (status === 'correct') {
        resultIcon.textContent = "✓";
        resultIcon.classList.add('correct');
        resultIcon.classList.remove('incorrect');
    } else {
        resultIcon.textContent = "✗";
        resultIcon.classList.add('incorrect');
        resultIcon.classList.remove('correct');
    }

    // Disable input and button
    inputElement.disabled = true;
    questionElement.querySelector('button').disabled = true;

    // Reveal the solution
    solutionDetails.classList.remove('hidden');

    // Save progress
    saveProgress(questionId, status, userAnswer);
}


// Function to check Single Option answers
function checkSingleOptionAnswer(questionId, selectedOption) {
    const questionElement = document.getElementById(`question-${questionId}`);
    const correctAnswer = questionElement.getAttribute('data-answer');
    const resultIcon = document.getElementById(`result-${questionId}`);
    const solutionDetails = document.getElementById(`solution-${questionId}`);
    const buttons = questionElement.querySelectorAll('.option-btn');

    let status = 'incorrect';
    if (selectedOption.toUpperCase() === correctAnswer.toUpperCase()) {
        status = 'correct';
    }

    // Update button styles
    buttons.forEach(btn => {
        btn.disabled = true;
        const btnOption = btn.textContent.trim().charAt(0).toUpperCase();
        if (btnOption === correctAnswer.toUpperCase()) {
            btn.classList.remove('btn-outline-primary');
            btn.classList.add('btn-success');
        }
        if (btnOption === selectedOption.toUpperCase() && status === 'incorrect') {
            btn.classList.remove('btn-outline-primary');
            btn.classList.add('btn-danger');
        }
    });

    // Display result icon
    if (status === 'correct') {
        resultIcon.textContent = "✓";
        resultIcon.classList.add('correct');
        resultIcon.classList.remove('incorrect');
    } else {
        resultIcon.textContent = "✗";
        resultIcon.classList.add('incorrect');
        resultIcon.classList.remove('correct');
    }

    // Reveal the solution
    solutionDetails.classList.remove('hidden');

    // Save progress
    saveProgress(questionId, status, selectedOption);
}

// Function to toggle selection for Multiple Option questions
function toggleMultipleOption(questionId, option) {
    const questionElement = document.getElementById(`question-${questionId}`);
    const btn = event.target;

    if (!btn.classList.contains('selected')) {
        btn.classList.add('selected');
        btn.classList.remove('btn-outline-primary');
        btn.classList.add('btn-primary');
    } else {
        btn.classList.remove('selected');
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-outline-primary');
    }
}

// Function to check Multiple Option answers
function checkMultipleOptionAnswer(questionId) {
    const questionElement = document.getElementById(`question-${questionId}`);
    const selectedBtns = questionElement.querySelectorAll('.option-btn.btn-primary');
    const correctAnswers = questionElement.getAttribute('data-answer').split(',');
    const resultIcon = document.getElementById(`result-${questionId}`);
    const solutionDetails = document.getElementById(`solution-${questionId}`);

    let userAnswers = [];
    selectedBtns.forEach(btn => {
        const value = btn.textContent.trim().charAt(0).toUpperCase();
        userAnswers.push(value);
    });

    // Normalize answers by trimming and converting to uppercase
    userAnswers = userAnswers.map(ans => ans.trim().toUpperCase());
    const normalizedCorrect = correctAnswers.map(ans => ans.trim().toUpperCase());

    // Check if userAnswers match correctAnswers
    let status = 'correct';
    if (userAnswers.length !== normalizedCorrect.length) {
        status = 'incorrect';
    } else {
        for (let ans of normalizedCorrect) {
            if (!userAnswers.includes(ans)) {
                status = 'incorrect';
                break;
            }
        }
    }

    // Update button styles
    const buttons = questionElement.querySelectorAll('.option-btn');
    buttons.forEach(btn => {
        btn.disabled = true;
        const btnOption = btn.textContent.trim().charAt(0).toUpperCase();
        if (normalizedCorrect.includes(btnOption)) {
            btn.classList.remove('btn-outline-primary', 'btn-primary');
            btn.classList.add('btn-success');
        }
        if (userAnswers.includes(btnOption) && !normalizedCorrect.includes(btnOption)) {
            btn.classList.remove('btn-outline-primary', 'btn-primary');
            btn.classList.add('btn-danger');
        }
        if (!normalizedCorrect.includes(btnOption) && !userAnswers.includes(btnOption)) {
            btn.classList.remove('btn-outline-primary', 'btn-primary');
            btn.classList.add('btn-secondary');
        }
    });

    // Display result icon
    if (status === 'correct') {
        resultIcon.textContent = "✓";
        resultIcon.classList.add('correct');
        resultIcon.classList.remove('incorrect');
    } else {
        resultIcon.textContent = "✗";
        resultIcon.classList.add('incorrect');
        resultIcon.classList.remove('correct');
    }

    // Reveal the solution
    solutionDetails.classList.remove('hidden');

    // Save progress
    saveProgress(questionId, status, userAnswers.join(','));
}

// Function to check Numerical answers
function checkNumericalAnswer(questionId) {

    const questionElement = document.getElementById(`question-${questionId}`);
    const inputElement = document.getElementById(`input-${questionId}`);
    const userAnswer = parseFloat(inputElement.value.trim());
    const correctAnswer = parseFloat(questionElement.getAttribute('data-answer'));
    const tolerance = parseFloat(questionElement.getAttribute('data-range'));
    const resultIcon = document.getElementById(`result-${questionId}`);
    const solutionDetails = document.getElementById(`solution-${questionId}`);
    console.log((userAnswer - correctAnswer) + "Tol:" + tolerance)
    let status = 'incorrect';
    if (!isNaN(userAnswer) && Math.abs(userAnswer - correctAnswer) <= tolerance) {
        status = 'correct';
    }

    // Display result icon
    if (status === 'correct') {
        resultIcon.textContent = "✓";
        resultIcon.classList.add('correct');
        resultIcon.classList.remove('incorrect');
    } else {
        resultIcon.textContent = "✗";
        resultIcon.classList.add('incorrect');
        resultIcon.classList.remove('correct');
    }

    // Disable input and button
    inputElement.disabled = true;
    questionElement.querySelector('button').disabled = true;

    // Reveal the solution
    solutionDetails.classList.remove('hidden');

    // Save progress
    saveProgress(questionId, status, userAnswer);
}

// Function to check Subjective answers
function checkSubjectiveAnswer(questionId, status) {
    const questionElement = document.getElementById(`question-${questionId}`);
    const resultIcon = document.getElementById(`result-${questionId}`);
    const solutionDetails = document.getElementById(`solution-${questionId}`);
    const buttons = questionElement.querySelectorAll('.answer-key button');

    // Update result icon based on status
    if (status === 'correct') {
        resultIcon.innerHTML = '<span class="correct">✔️ Correct</span>';
    } else {
        resultIcon.innerHTML = '<span class="incorrect">❌ Incorrect</span>';
    }

    // Reveal the solution sections
    solutionDetails.classList.remove('hidden');

    // Disable both buttons to prevent multiple submissions
    buttons.forEach(btn => {
        btn.disabled = true;
    });

    // Save progress
    saveProgress(questionId, status, status);
}

// Function to save the progress
function saveProgress(questionId, status, userResponse) {
    const currentExerciseID = getCurrentExerciseID();
    let progress = JSON.parse(localStorage.getItem('exerciseProgress')) || {};
    if (!progress[currentExerciseID]) {
        progress[currentExerciseID] = {};
    }
    progress[currentExerciseID][questionId] = {
        status: status,
        response: userResponse
    };
    localStorage.setItem('exerciseProgress', JSON.stringify(progress));
}


function clearAllProgress() {
    localStorage.removeItem('exerciseProgress');
    console.log("All progress has been cleared.");
    location.reload();
}

// Function to load saved progress from local storage
function loadProgress() {
    const currentExerciseID = getCurrentExerciseID();
    const progress = JSON.parse(localStorage.getItem('exerciseProgress')) || {};

    if (!progress[currentExerciseID]) {
        return;
    }

    const exerciseProgress = progress[currentExerciseID];

    for (const questionKey in exerciseProgress) {
        if (exerciseProgress.hasOwnProperty(questionKey)) {
            const { status, response } = exerciseProgress[questionKey];
            const questionId = questionKey; // The key itself is the questionId
            const questionCard = document.getElementById(`question-${questionId}`);
            if (!questionCard) continue; // Skip if the question card doesn't exist
            const resultIcon = document.getElementById(`result-${questionId}`);
            const solutionDetails = document.getElementById(`solution-${questionId}`);
            const questionType = questionCard.getAttribute('data-question-type');

            // Handle different question types
            if (status === 'correct' || status === 'incorrect') {
                if (questionType === 'truefalse') {
                    const buttons = questionCard.querySelectorAll('.option-btn');
                    buttons.forEach(btn => {
                        btn.disabled = true;
                        const btnValue = btn.textContent.trim().toLowerCase();
                        if (btnValue === response.toLowerCase()) {
                            if (status === 'correct') {
                                btn.classList.remove('btn-primary');
                                btn.classList.add('btn-success');
                            } else {
                                btn.classList.remove('btn-primary');
                                btn.classList.add('btn-danger');
                            }
                        } else {
                            btn.classList.remove('btn-primary');
                            btn.classList.add('btn-secondary');
                        }
                    });
                } else if (questionType === 'oneword') {
                    const inputElement = document.getElementById(`input-${questionId}`);
                    inputElement.disabled = true;
                    inputElement.value = response;
                    const submitButton = questionCard.querySelector('button');
                    submitButton.disabled = true;
                } else if (questionType === 'singleoption') {
                    const buttons = questionCard.querySelectorAll('.option-btn');
                    const correctAnswer = questionCard.getAttribute('data-answer').toUpperCase();
                    buttons.forEach(btn => {
                        btn.disabled = true;
                        const btnValue = btn.textContent.trim().charAt(0).toUpperCase();
                        if (btnValue === correctAnswer) {
                            btn.classList.remove('btn-outline-primary');
                            btn.classList.add('btn-success');
                        }
                        if (btnValue === response.toUpperCase() && btnValue !== correctAnswer) {
                            btn.classList.remove('btn-outline-primary');
                            btn.classList.add('btn-danger');
                        }
                    });
                }
                // Display result icon
                resultIcon.innerHTML = status === 'correct' ? '<span class="correct">✔️</span>' : '<span class="incorrect">❌</span>';
                // Reveal the solution
                solutionDetails.classList.remove('hidden');
            }
        }
    }
}

// Function to clear progress and reset the page
// Function to restart progress by resetting the UI and clearing saved data
function restartProgress() {
    const currentExerciseID = getCurrentExerciseID();
    let progress = JSON.parse(localStorage.getItem('exerciseProgress')) || {};
    delete progress[currentExerciseID];
    localStorage.setItem('exerciseProgress', JSON.stringify(progress));
    //clearAllProgress();
    location.reload();
}



loadQuestions();