const faces = [
    { name: 'chetak', image: 'images/chetak.jpeg' },
    { name: 'Neha', image: 'images/Neha.jpeg' },
    { name: 'Arpit', image: 'images/Arpit.jpeg' },
    { name: 'Khushi', image: 'images/Khushi.jpeg' },
    { name: 'Dhwani', image: 'images/Dhwani.jpeg' }
];

let currentFaceIndex = 0;
let randomRecallFaceIndex = 0;

document.getElementById('start-info-btn').addEventListener('click', function() {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;

    if (name && age) {
        document.getElementById('user-info').classList.add('hidden');
        document.getElementById('instructions').classList.remove('hidden');
    } else {
        alert("Please enter your name and age.");
    }
});

document.getElementById('start-test-btn').addEventListener('click', startTest);

function startTest() {
    document.getElementById('instructions').classList.add('hidden');
    document.getElementById('test-phase').classList.remove('hidden');
    showNextFace();
}

function showNextFace() {
    if (currentFaceIndex < faces.length) {
        const face = faces[currentFaceIndex];
        document.getElementById('face-image').src = face.image;
        document.getElementById('name-display').textContent = face.name;

        currentFaceIndex++;

        setTimeout(showNextFace, 5000);
    } else {
        document.getElementById('test-phase').classList.add('hidden');
        startRecallPhase();
    }
}

function startRecallPhase() {
    randomRecallFaceIndex = Math.floor(Math.random() * faces.length);
    const face = faces[randomRecallFaceIndex];

    document.getElementById('recall-phase').classList.remove('hidden');
    document.getElementById('recall-image').src = face.image;
    document.getElementById('recall-prompt').textContent = "What is the name associated with this face?";
}

document.getElementById('submit-recall-btn').addEventListener('click', function() {
    const userAnswer = document.getElementById('recall-name').value.trim().toLowerCase();
    const correctAnswer = faces[randomRecallFaceIndex].name.toLowerCase();

    if (userAnswer === correctAnswer) {
        document.getElementById('feedback').textContent = 'Correct!';
    } else {
        document.getElementById('feedback').textContent = `Incorrect! The correct answer was ${faces[randomRecallFaceIndex].name}.`;
    }

    setTimeout(endTest, 2000);
});

function endTest() {
    document.getElementById('recall-phase').classList.add('hidden');
    document.getElementById('result').classList.remove('hidden');

    if (document.getElementById('feedback').textContent === 'Correct!') {
        document.getElementById('final-feedback').textContent = 'Congratulations, you recalled the name correctly!';
    } else {
        document.getElementById('final-feedback').textContent = 'Better luck next time! You can play again to improve your memory.';
    }
}

document.getElementById('play-again-btn').addEventListener('click', function() {
    currentFaceIndex = 0;
    document.getElementById('result').classList.add('hidden');
    document.getElementById('user-info').classList.remove('hidden');
});
