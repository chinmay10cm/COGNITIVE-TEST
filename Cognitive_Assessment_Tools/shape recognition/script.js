const shapes = [
    { name: "Square", image: "square.png", options: ["Square", "Circle", "Triangle"] },
    { name: "Rectangle", image: "rectangle.png", options: ["Oval", "Rectangle", "Hexagon"] },
    { name: "Circle", image: "circle.png", options: ["Pentagon", "Octagon", "Circle"] },
    { name: "Triangle", image: "triangle.png", options: ["Cone", "Triangle", "Cuboid"] },
    { name: "Pentagon", image: "pentagon.png", options: ["Pentagon", "Cylinder", "Sphere"] },
    { name: "Octagon", image: "octagon.png", options: ["Pentagon", "Octagon", "Sphere"] },
    { name: "Hexagon", image: "hexagon.png", options: ["Hexagon", "Cylinder", "Sphere"] },
    { name: "Cube", image: "cube.png", options: ["Pentagon", "Cube", "Sphere"] },
    { name: "Oval", image: "oval.png", options: ["Pentagon", "Cylinder", "Oval"] },
    // Add more shapes if needed
];

let selectedShapes = [];
let currentShapeIndex = 0;
let score = 0;

document.getElementById("start-btn").addEventListener("click", startGame);
document.getElementById("next-btn").addEventListener("click", nextShape);
document.getElementById("play-again-btn").addEventListener("click", playAgain);

function startGame() {
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const email = document.getElementById("email").value;

    if (name && age && email) {
        document.getElementById("user-info").classList.add("hidden");
        document.getElementById("game").classList.remove("hidden");
        selectRandomShapes();
        loadShape();
    } else {
        alert("Please enter all details to start the game.");
    }
}

function selectRandomShapes() {
    // Shuffle and pick 5 random shapes from the shapes array
    const shuffledShapes = shapes.sort(() => 0.5 - Math.random());
    selectedShapes = shuffledShapes.slice(0, 5);
}

function loadShape() {
    const shape = selectedShapes[currentShapeIndex];
    document.getElementById("shape-question").textContent = `Identify this shape:`;
    document.getElementById("shape-image").src = `images/${shape.image}`;
    const buttons = document.querySelectorAll(".option-btn");

    buttons.forEach((button, index) => {
        button.textContent = shape.options[index];
        button.onclick = () => checkAnswer(button.textContent);
    });

    document.getElementById("feedback").textContent = "";
    document.getElementById("next-btn").classList.add("hidden");
}

function checkAnswer(selectedOption) {
    const shape = selectedShapes[currentShapeIndex];
    if (selectedOption === shape.name) {
        document.getElementById("feedback").textContent = "Correct!";
        score++;
    } else {
        document.getElementById("feedback").textContent = `Wrong! Correct answer was ${shape.name}.`;
    }
    document.getElementById("next-btn").classList.remove("hidden");
}

function nextShape() {
    currentShapeIndex++;
    if (currentShapeIndex < selectedShapes.length) {
        loadShape();
    } else {
        endGame();
    }
}

function endGame() {
    document.getElementById("game").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");
    document.getElementById("score").textContent = `Your score is ${score} out of ${selectedShapes.length}`;
}

function playAgain() {
    currentShapeIndex = 0;
    score = 0;
    selectedShapes = [];
    document.getElementById("result").classList.add("hidden");
    document.getElementById("user-info").classList.remove("hidden");
}
