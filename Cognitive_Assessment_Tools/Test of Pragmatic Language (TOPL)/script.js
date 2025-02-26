const questions = [
    {
        question: "You are at a friend’s birthday party. Everyone is sitting at the table, waiting to eat the cake. What should you do?",
        options: ["Start eating the cake", "Wait quietly until it’s your turn", "Ask for the biggest piece"],
        correctAnswer: 1,
        explanation: "This question assesses the child’s understanding of social rules and turn-taking in a group setting."
    },
    {
        question: "You are talking to a friend, but they keep looking at their watch and seem distracted. What do you think this means?",
        options: ["They are bored", "They are in a hurry", "They don't like you"],
        correctAnswer: 1,
        explanation: "The child’s ability to interpret nonverbal cues and infer the friend’s thoughts or intentions is being assessed."
    },
    {
        question: "A teacher says, “It’s getting cold in here.” What do you think the teacher wants you to do?",
        options: ["Put on a sweater", "Close the window", "Leave the room"],
        correctAnswer: 1,
        explanation: "This scenario tests the child’s understanding of indirect speech acts, where the speaker’s intention is not directly stated."
    },
    {
        question: "Your friend looks sad and says, “I didn’t do well on my test.” What could you say?",
        options: ["“I’m sorry to hear that. Maybe next time you’ll do better.”", "“That’s too bad.”", "“You should have studied more.”"],
        correctAnswer: 0,
        explanation: "This question evaluates the child’s ability to recognize emotions and respond with empathy."
    },
    {
        question: "You and your friend both want to play with the same toy, but there’s only one. What could you do?",
        options: ["Fight for it", "Take turns playing with it", "Ignore your friend and take the toy"],
        correctAnswer: 1,
        explanation: "The child’s conflict resolution skills and ability to negotiate a solution are being assessed."
    },
    {
        question: "A classmate says, “Oh, great, another homework assignment,” but they roll their eyes while saying it. What do you think they mean?",
        options: ["They are happy about the homework", "They are frustrated about the homework", "They are indifferent about the homework"],
        correctAnswer: 1,
        explanation: "This question tests the child’s ability to detect sarcasm and understand that the tone and body language can change the meaning of the words."
    },
    {
        question: "You see your friend running towards the door with a big smile on their face. What do you think is happening?",
        options: ["They are late for something", "They are excited about something", "They want to leave quickly"],
        correctAnswer: 1,
        explanation: "The child’s ability to make inferences based on observed behavior and context is being evaluated."
    },
    {
        question: "You are in a library and you see someone talking loudly on the phone. What is the appropriate way to react?",
        options: ["Ignore them", "Politely ask them to lower their voice", "Tell the librarian"],
        correctAnswer: 1,
        explanation: "This scenario checks the child’s understanding of social norms and appropriate behavior in specific settings."
    },
    {
        question: "You see someone struggling to carry a heavy box. What could you do?",
        options: ["Ignore them", "Offer to help them", "Laugh at them"],
        correctAnswer: 1,
        explanation: "This question assesses the child’s ability to recognize when someone needs help and respond appropriately."
    },
    {
        question: "A friend says, “Can you pass me that thing over there?” but they don’t point to anything specific. What would you do?",
        options: ["Give them something random", "Ask which thing they mean", "Ignore them"],
        correctAnswer: 1,
        explanation: "This scenario assesses the child’s ability to handle ambiguous language and seek clarification."
    },
    {
        question: "You are having a conversation with someone, but they keep interrupting you. How should you respond?",
        options: ["Tell them to stop interrupting", "Wait for them to finish", "Ignore them and keep talking"],
        correctAnswer: 0,
        explanation: "This question evaluates the child’s understanding of conversational turn-taking and how to manage interruptions."
    },
    {
        question: "A teacher says, “He’s a walking dictionary.” What do you think the teacher means?",
        options: ["The person is very knowledgeable", "The person looks like a dictionary", "The person carries a dictionary everywhere"],
        correctAnswer: 0,
        explanation: "This example tests the child’s ability to recognize and interpret figurative language."
    },
    {
        question: "You just lost a game, and you’re feeling really upset. What should you do if you’re with friends?",
        options: ["Yell at your friends", "Calm down and talk to your friends later", "Leave without saying anything"],
        correctAnswer: 1,
        explanation: "This scenario assesses how well the child can manage their emotions in a social setting."
    },
    {
        question: "You are invited to a formal dinner at a friend’s house. How should you dress?",
        options: ["Wear casual clothes", "Dress nicely in formal attire", "Don’t worry about your appearance"],
        correctAnswer: 1,
        explanation: "This question tests the child’s understanding of social expectations related to appropriate attire in different settings."
    },
    {
        question: "Someone says, “You did a great job on your project!” How should you respond?",
        options: ["Ignore the compliment", "Say thank you", "Criticize your work"],
        correctAnswer: 1,
        explanation: "This scenario assesses the child’s ability to respond appropriately to positive social interactions, such as receiving compliments."
    },
    {
        question: "Your friends want to do something you know is wrong, like skipping class. What would you do?",
        options: ["Agree to go along with them", "Tell them it’s wrong and refuse to join", "Ignore them and walk away"],
        correctAnswer: 1,
        explanation: "This question evaluates the child’s ability to resist peer pressure and make responsible decisions."
    },
    {
        question: "You accidentally bumped into someone and made them drop their books. What should you say?",
        options: ["Ignore them", "Say sorry and help them pick up their books", "Laugh at them"],
        correctAnswer: 1,
        explanation: "This scenario tests the child’s ability to recognize when an apology is needed and how to offer it appropriately."
    },
    {
        question: "You notice that a classmate is struggling to understand the homework. What could you do?",
        options: ["Ignore them", "Offer to help them", "Tell them to ask the teacher"],
        correctAnswer: 1,
        explanation: "This question assesses the child’s ability to recognize when someone needs help and how to offer assistance."
    },
    {
        question: "You tell a joke, and your friend says, “Wow, that was really funny,” but they don’t laugh and roll their eyes. What do you think they mean?",
        options: ["They thought the joke was hilarious", "They are being sarcastic", "They didn’t understand the joke"],
        correctAnswer: 1,
        explanation: "This scenario evaluates the child’s ability to detect sarcasm and understand when someone is not being sincere."
    },
    {
        question: "You meet someone new at a school event. What could you say to start a conversation?",
        options: ["Ignore them", "Introduce yourself and ask a question", "Wait for them to speak first"],
        correctAnswer: 1,
        explanation: "This question tests the child’s ability to engage in small talk and initiate social interactions."
    }
];

const userInfo = document.getElementById("user-info");
const instructions = document.getElementById("instructions");
const testPhase = document.getElementById("test-phase");
const questionContainer = document.getElementById("question-container");
const resultContainer = document.getElementById("result");
const finalScore = document.getElementById("final-score");
const answersContainer = document.getElementById("answers-container");

let currentQuestionIndex = 0;
let score = 0;
let selectedQuestions = [];
let userResponses = [];

document.getElementById("start-info-btn").addEventListener("click", () => {
    userInfo.classList.add("hidden");
    instructions.classList.remove("hidden");
});

document.getElementById("start-test-btn").addEventListener("click", () => {
    instructions.classList.add("hidden");
    testPhase.classList.remove("hidden");

    selectedQuestions = questions.sort(() => 0.5 - Math.random()).slice(0, 5);
    displayQuestion();
});

document.getElementById("next-question-btn").addEventListener("click", () => {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
        const answerIndex = parseInt(selectedOption.value);
        userResponses.push(answerIndex);

        const feedback = document.createElement('p');
        if (answerIndex === selectedQuestions[currentQuestionIndex].correctAnswer) {
            score++;
            feedback.textContent = "Correct!";
            feedback.style.color = "green";
        } else {
            feedback.textContent = `Incorrect! The correct answer is "${selectedQuestions[currentQuestionIndex].options[selectedQuestions[currentQuestionIndex].correctAnswer]}".`;
            feedback.style.color = "red";
        }

        questionContainer.appendChild(feedback);

        document.getElementById("next-question-btn").disabled = true;
        setTimeout(() => {
            document.getElementById("next-question-btn").disabled = false;
            currentQuestionIndex++;
            if (currentQuestionIndex < selectedQuestions.length) {
                displayQuestion();
            } else {
                displayResult();
            }
        }, 2000); // Delay before moving to the next question

    } else {
        alert("Please select an option.");
    }
});

document.getElementById("play-again-btn").addEventListener("click", () => {
    location.reload();
});

function displayQuestion() {
    questionContainer.innerHTML = `
        <p>${selectedQuestions[currentQuestionIndex].question}</p>
        ${selectedQuestions[currentQuestionIndex].options.map((option, index) => `
            <label>
                <input type="radio" name="option" value="${index}">
                ${option}
            </label><br>
        `).join("")}
    `;
}

function displayResult() {
    testPhase.classList.add("hidden");
    resultContainer.classList.remove("hidden");

    finalScore.textContent = `You scored ${score} out of ${selectedQuestions.length}.`;

    answersContainer.innerHTML = selectedQuestions.map((question, index) => `
        <p><strong>Question:</strong> ${question.question}</p>
        <p><strong>Your Answer:</strong> ${question.options[userResponses[index]]}</p>
        <p><strong>Correct Answer:</strong> ${question.options[question.correctAnswer]}</p>
        <p><strong>Explanation:</strong> ${question.explanation}</p>
        <hr>
    `).join("");
}
