document.getElementById('start-test').addEventListener('click', function() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    if (name && email) {
        document.getElementById('user-info').style.display = 'none';
        document.getElementById('questionnaire').style.display = 'block';
    } else {
        alert('Please enter both your name and email.');
    }
});

document.getElementById('questionnaire').addEventListener('submit', function(e) {
    e.preventDefault();
    
    let score = 0;
    for (let i = 1; i <= 10; i++) {
        const answer = document.querySelector(`input[name="q${i}"]:checked`).value;
        score += parseInt(answer);
    }

    document.getElementById('questionnaire').style.display = 'none';
    document.getElementById('result').style.display = 'block';

    const resultText = document.getElementById('result-text');
    
    if (score >= 7) {
        resultText.innerText = `Your score is ${score}. This score is above the cutoff for Borderline Personality Disorder. Please consult a healthcare professional for further evaluation.`;
    } else if (score >= 5) {
        resultText.innerText = `Your score is ${score}. Further evaluation for Borderline Personality Disorder is recommended.`;
    } else {
        resultText.innerText = `Your score is ${score}. The symptoms are not consistent with Borderline Personality Disorder.`;
    }
});
