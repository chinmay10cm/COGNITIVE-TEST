const questions = [
    {
        image: "images/question1.png",
        options: ["A. Figure A", "B. Figure B", "C. Figure C", "D. Figure D"],
        correctAnswer: 0
    },
    {
        image: "images/question2.png",
        options: ["A. Figure A", "B. Figure B", "C. Figure C", "D. Both B and C"],
        correctAnswer: 3
    },
    {
        image: "images/question3.png",
        options: ["A. Figure A", "B. Figure B", "C. Figure C", "D. Figure D"],
        correctAnswer: 0
    },
    {
        image: "images/question4.png",
        options: ["A. Figure A", "B. Figure B", "C. Figure C", "D. Figure D"],
        correctAnswer: 0
    },
    {
        image: "images/question5.png",
        options: ["A. Figure A", "B. Figure B", "C. Figure C", "D. Figure D"],
        correctAnswer: 3
    },
    {
        image: "images/question6.png",
        options: ["A. Figure A", "B. Figure B", "C. Figure C", "D. Figure D"],
        correctAnswer: 2
    },
    {
        image: "images/question7.png",
        options: ["A. Figure A", "B. Figure B", "C. Figure C", "D. Figure D"],
        correctAnswer: 1
    },
    {
        image: "images/question8.png",
        options: ["A. Figure A", "B. Figure B", "C. Figure D", "D. Both A and C"],
        correctAnswer: 3
    },
    {
        image: "images/question9.png",
        options: ["A. Figure A", "B. Figure B", "C. Figure C", "D. Figure D"],
        correctAnswer: 1
    },
    {
        image: "images/question10.png",
        options: ["A. Figure A", "B. Figure B", "C. Figure C", "D. Figure A and D"],
        correctAnswer: 3
    }
];

const userInfo = document.getElementById("user-info");
const quiz = document.getElementById("quiz");
const questionContainer = document.getElementById("question-container");
const resultContainer = document.getElementById("result");
const finalScore = document.getElementById("final-score");
const answersContainer = document.getElementById("answers-container");

let currentQuestionIndex = 0;
let score = 0;
let userResponses = [];

document.getElementById("start-info-btn").addEventListener("click", () => {
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    if (name && age) {
        userInfo.classList.add("hidden");
        quiz.classList.remove("hidden");
        displayQuestion();
    } else {
        alert("Please enter your name and age.");
    }
});

document.getElementById("next-question-btn").addEventListener("click", () => {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
        const answerIndex = parseInt(selectedOption.value);
        userResponses.push(answerIndex);

        const feedback = document.createElement('p');
        if (answerIndex === questions[currentQuestionIndex].correctAnswer) {
            score++;
            feedback.textContent = "Correct!";
            feedback.style.color = "green";
        } else {
            feedback.textContent = `Incorrect! The correct answer is "${questions[currentQuestionIndex].options[questions[currentQuestionIndex].correctAnswer]}".`;
            feedback.style.color = "red";
        }

        questionContainer.appendChild(feedback);

        document.getElementById("next-question-btn").disabled = true;
        setTimeout(() => {
            document.getElementById("next-question-btn").disabled = false;
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                displayQuestion();
            } else {
                displayResult();
            }
        }, 2000);
    } else {
        alert("Please select an option.");
    }
});

document.getElementById("play-again-btn").addEventListener("click", () => {
    location.reload();
});

function displayQuestion() {
    const question = questions[currentQuestionIndex];
    questionContainer.innerHTML = `
        <img src="${question.image}" alt="Question Image" style="max-width: 100%;"><br>
        ${question.options.map((option, index) => `
            <label>
                <input type="radio" name="option" value="${index}">
                ${option}
            </label><br>
        `).join("")}
    `;
}

function displayResult() {
    quiz.classList.add("hidden");
    resultContainer.classList.remove("hidden");

    finalScore.textContent = `You scored ${score} out of ${questions.length}.`;

    answersContainer.innerHTML = questions.map((question, index) => `
        <p><strong>Question:</strong></p>
        <img src="${question.image}" alt="Question Image" style="max-width: 100%;"><br>
        <p><strong>Your Answer:</strong> ${question.options[userResponses[index]]}</p>
        <p><strong>Correct Answer:</strong> ${question.options[question.correctAnswer]}</p>
        <hr>
    `).join("");
}
