const pairTypes = {
    'word-word': [
        { left: 'Sun', right: 'Basket' },
        { left: 'Tree', right: 'Ocean' },
        { left: 'Chair', right: 'Elephant' }
    ],
    'word-image': [
        { left: 'Apple', right: 'star.png' },
        { left: 'Dog', right: 'bicycle.png' },
        { left: 'Mountain', right: 'clock.png' }
    ],
    'image-image': [
        { left: 'cat.png', right: 'ball.png' },
        { left: 'house.png', right: 'car.png' },
        { left: 'pencil.png', right: 'tree.png' }
    ],
    'noun-verb': [
        { left: 'Bird', right: 'Fly' },
        { left: 'Fish', right: 'Swim' },
        { left: 'Car', right: 'Drive' }
    ]
};

let selectedPairs = [];
let currentPairIndex = 0;
let score = 0;

document.querySelectorAll('.pair-option').forEach(button => {
    button.addEventListener('click', function() {
        const pairType = this.dataset.pairType;
        startLearningPhase(pairType);
    });
});

function startLearningPhase(pairType) {
    selectedPairs = pairTypes[pairType];
    document.getElementById('instructions').classList.add('hidden');
    document.getElementById('pair-display').classList.remove('hidden');

    const pairsDiv = document.getElementById('pairs');
    pairsDiv.innerHTML = '';

    selectedPairs.forEach(pair => {
        const pairDiv = document.createElement('div');
        pairDiv.classList.add('pair');

        if (pairType === 'word-image') {
            const leftElement = document.createElement('span');
            leftElement.textContent = pair.left;

            const rightImage = document.createElement('img');
            rightImage.src = `images/${pair.right}`;
            rightImage.alt = pair.right.split('.')[0]; // Alt text without the file extension
            rightImage.classList.add('pair-image');

            pairDiv.appendChild(leftElement);
            pairDiv.appendChild(rightImage);
        } else if (pairType === 'image-image') {
            const leftImage = document.createElement('img');
            leftImage.src = `images/${pair.left}`;
            leftImage.alt = pair.left.split('.')[0];
            leftImage.classList.add('pair-image');

            const rightImage = document.createElement('img');
            rightImage.src = `images/${pair.right}`;
            rightImage.alt = pair.right.split('.')[0];
            rightImage.classList.add('pair-image');

            pairDiv.appendChild(leftImage);
            pairDiv.appendChild(rightImage);
        } else {
            pairDiv.textContent = `${pair.left} - ${pair.right}`;
        }

        pairsDiv.appendChild(pairDiv);
    });

    setTimeout(() => {
        document.getElementById('pair-display').classList.add('hidden');
        startTestPhase(); // Automatically start the test phase after showing the pairs
    }, 5000); // 5 seconds display time
}

function startTestPhase() {
    currentPairIndex = 0;
    score = 0;

    document.getElementById('pair-display').classList.add('hidden');
    document.getElementById('test-phase').classList.remove('hidden');

    showNextPrompt();
}

function showNextPrompt() {
    if (currentPairIndex < selectedPairs.length) {
        const currentPair = selectedPairs[currentPairIndex];
        const promptText = currentPair.left.includes('.png') ? '' : currentPair.left;

        document.getElementById('prompt').innerHTML = ''; // Clear previous content

        if (promptText === '') {
            const promptImage = document.createElement('img');
            promptImage.src = `images/${currentPair.left}`;
            promptImage.alt = currentPair.left.split('.')[0];
            promptImage.classList.add('pair-image');
            document.getElementById('prompt').appendChild(promptImage);
        } else {
            document.getElementById('prompt').textContent = `What was paired with: ${promptText}?`;
        }

        document.getElementById('response').value = '';
        document.getElementById('feedback').textContent = '';
    } else {
        endTest();
    }
}

document.getElementById('submit-answer-btn').addEventListener('click', function() {
    const userAnswer = document.getElementById('response').value.trim().toLowerCase();
    const correctAnswer = selectedPairs[currentPairIndex].right.replace('.png', '').toLowerCase();

    if (userAnswer === correctAnswer) {
        score++;
        document.getElementById('feedback').textContent = 'Correct!';
    } else {
        document.getElementById('feedback').textContent = `Incorrect! The correct answer was: ${correctAnswer}`;
    }

    currentPairIndex++;
    setTimeout(showNextPrompt, 1000); // Move to the next prompt after 1 second
});

function endTest() {
    document.getElementById('test-phase').classList.add('hidden');
    document.getElementById('result').classList.remove('hidden');
    document.getElementById('score').textContent = `You scored ${score} out of ${selectedPairs.length}`;
}

document.getElementById('play-again-btn').addEventListener('click', function() {
    document.getElementById('result').classList.add('hidden');
    document.getElementById('instructions').classList.remove('hidden');
});
