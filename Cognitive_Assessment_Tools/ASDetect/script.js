document.addEventListener('DOMContentLoaded', function () {
    displayPreviousResults();
});

function startAssessment() {
    document.getElementById('startContainer').style.display = 'none';
    document.getElementById('questionnaireContainer').style.display = 'block';
}

document.querySelectorAll('.options button').forEach(button => {
    button.addEventListener('click', function () {
        const question = this.getAttribute('data-question');
        document.querySelectorAll(`.options button[data-question="${question}"]`).forEach(btn => {
            btn.classList.remove('selected');
        });
        this.classList.add('selected');
    });
});

document.getElementById('questionnaireForm').addEventListener('submit', function (event) {
    event.preventDefault();
    submitResults();
});

function submitResults() {
    let score = 0;
    let responses = [];
    for (let i = 1; i <= 27; i++) {
        const selectedButton = document.querySelector(`.options button.selected[data-question="${i}"]`);
        if (selectedButton) {
            const value = parseInt(selectedButton.getAttribute('data-value'));
            score += value;
            responses.push({
                question: i,
                response: selectedButton.innerText,
                value: value
            });
        }
    }

    const resultText = score <= 12
        ? 'Score: ' + score + ' - No indication of autism.'
        : score <= 54
            ? 'Score: ' + score + ' - May indicate autism.'
            : 'Score: ' + score + ' - High indication of autism. Please consult a physician.';
    
    document.getElementById('currentResult').textContent = resultText;

    // Store result in local storage
    const previousResults = JSON.parse(localStorage.getItem('results')) || [];
    previousResults.push({ score, resultText, date: new Date().toISOString(), responses });
    localStorage.setItem('results', JSON.stringify(previousResults));

    displayPreviousResults();

    document.getElementById('questionnaireContainer').style.display = 'none';
    document.getElementById('resultContainer').style.display = 'block';
}

function retakeTest() {
    document.getElementById('resultContainer').style.display = 'none';
    document.getElementById('questionnaireForm').reset();
    document.querySelectorAll('.options button').forEach(button => {
        button.classList.remove('selected');
    });
    document.getElementById('currentResult').textContent = '';
    document.getElementById('questionnaireContainer').style.display = 'block';
}

function displayPreviousResults() {
    const previousResults = JSON.parse(localStorage.getItem('results')) || [];
    const previousResultsContainer = document.getElementById('previousResults');
    previousResultsContainer.innerHTML = '';
    
    previousResults.forEach(result => {
        const resultElement = document.createElement('div');
        resultElement.className = 'previous-result';
        resultElement.innerHTML = `
            <strong>Date:</strong> ${new Date(result.date).toLocaleString()}<br>
            <strong>Score:</strong> ${result.score}<br>
            <strong>Result:</strong> ${result.resultText}
        `;
        previousResultsContainer.appendChild(resultElement);
    });
}
