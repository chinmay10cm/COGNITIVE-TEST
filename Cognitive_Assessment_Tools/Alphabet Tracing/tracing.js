const canvas = document.getElementById('tracingCanvas');
const ctx = canvas.getContext('2d');
const message = document.getElementById('message');
const scoreDisplay = document.getElementById('score');
const alphabetContainer = document.getElementById('alphabetContainer');
const nameInput = document.getElementById('nameInput');
const startButton = document.getElementById('startButton');
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
let currentLetter = '';
let isDrawing = false;
let tracedPath = [];
let letterBoundary = null;
let score = 0;
let userName = '';
let totalTraced = 0;

startButton.addEventListener('click', () => {
    userName = nameInput.value.trim();
    if (userName) {
        document.getElementById('nameInputContainer').style.display = 'none';
        initAlphabet();
    } else {
        alert('Please enter your name to start tracing.');
    }
});

function initAlphabet() {
    alphabet.forEach(letter => {
        const letterDiv = document.createElement('div');
        letterDiv.className = 'alphabet';
        letterDiv.textContent = letter;
        letterDiv.addEventListener('click', () => selectLetter(letter));
        alphabetContainer.appendChild(letterDiv);
    });
    selectLetter(alphabet[0]); // Start with the first letter
}

function selectLetter(letter) {
    currentLetter = letter;
    drawLetter(currentLetter);
    canvas.style.display = 'block';
    tracedPath = [];
    message.textContent = '';
    totalTraced++;
}

function drawLetter(letter) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '300px Arial';
    ctx.strokeText(letter, 50, 300);
    message.textContent = '';
    letterBoundary = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function checkTracing() {
    if (isWithinBoundary()) {
        message.textContent = "Correct tracing!";
        score++;
        markCorrectTracing();
    } else {
        message.textContent = "Incorrect tracing. Try again.";
    }
    updateScore();
}

function isWithinBoundary() {
    let inBoundsPoints = 0;
    let totalPoints = tracedPath.length;

    for (const point of tracedPath) {
        const pixelIndex = ((point.y * letterBoundary.width) + point.x) * 4;
        const alpha = letterBoundary.data[pixelIndex + 3];

        if (alpha > 0) { 
            // Point is within the letter boundary (on or inside the letter)
            inBoundsPoints++;
        }
    }

    // Check if the tracing is complete (i.e., most points are within the boundary)
    const isComplete = inBoundsPoints > (totalPoints * 0.5);

    // Check if the tracing is within the boundary (i.e., most points are within the boundary)
    const isInBoundary = inBoundsPoints > (totalPoints * 0.7);

    // Consider tracing correct if it's complete and within the boundary
    return isComplete && isInBoundary;
}
function markCorrectTracing() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '300px Arial';
    ctx.strokeStyle = 'blue'; // Mark correct tracing in blue
    ctx.strokeText(currentLetter, 50, 300);

    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'blue';
    
    tracedPath.forEach(point => {
        ctx.lineTo(point.x, point.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
    });
}

function updateScore() {
    scoreDisplay.textContent = `Score: ${score}/${totalTraced}`;
    if (totalTraced === alphabet.length) {
        displayFinalScore();
    }
}

function displayFinalScore() {
    alert(`${userName}, you completed tracing all alphabets! Your final score is ${score}/${alphabet.length}.`);
}

canvas.addEventListener('mousedown', () => {
    isDrawing = true;
    tracedPath = [];
});
canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    ctx.beginPath();
    checkTracing();
});
canvas.addEventListener('mousemove', draw);

function draw(event) {
    if (!isDrawing) return;

    const x = event.clientX - canvas.offsetLeft;
    const y = event.clientY - canvas.offsetTop;

    tracedPath.push({ x, y });

    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'red';

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}
