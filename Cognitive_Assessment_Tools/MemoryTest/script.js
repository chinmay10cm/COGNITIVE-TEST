const images = [
    "images/image1.png",
    "images/image2.png",
    "images/image3.png"
];

const correctItems = [
    [
        "apple", "flower", "cat", "bell", "cup", "cake", "glasses", "hand", "football", "truck",
        "whiteboard", "sandwich", "balloons", "gift", "bird", "magnifying glass", "dog", "pencil",
        "seven", "tree", "flag", "trumpet", "globe", "bicycle", "book",
        "fruit", "blossom", "kitten", "chime", "mug", "dessert", "spectacles", "palm", "soccer ball", "lorry",
        "marker board", "sub", "present", "avian", "lens", "hound", "pen", "number 7", "plant", "banner",
        "horn", "earth", "bike", "novel"
    ],
    [
        "sewing machine", "key", "knight", "open book", "shoe", "heels", "markers", "pinwheel", "notebook", 
        "paper clips", "chess piece", "backpack", "pool ball", "dice", "glue", "briefcase", "phone", "pipe", 
        "marbles", "teddy bear", "sneaker", "star", "trophy", "book", "rocket", "tennis racket",
        "stitching machine", "lock opener", "chess knight", "unfolded book", "footwear", "heel", "pens", 
        "spinner", "journal", "clips", "rook", "school bag", "billiard ball", "die", "adhesive", "case", 
        "telephone", "smoking pipe", "beads", "teddy", "shoe", "medal", "cup", "manual", "spacecraft", "racquet"
    ],
    [
        "helicopter", "wine glass", "wine", "aeroplane", "guitar", "fish", "football", "baby bottle", "bone", 
        "blender", "sandcastle", "kite", "sofa", "wagon", "paint palette", "toy car", "laptop", "carrot", 
        "basketball", "pizza", "rocket", "soccer ball", "flag", "saw", "watermelon", "sandwich", "skull", "robot",
        "chopper", "glass", "alcohol", "plane", "instrument", "seafood", "soccer", "infant bottle", "skeletal part", 
        "mixer", "castle", "glider", "couch", "cart", "palette", "toy vehicle", "notebook", "vegetable", 
        "hoops", "pie", "spacecraft", "ball", "banner", "cutting tool", "melon", "sub", "cranium", "android"
    ]
];

let selectedImageIndex = 0;
let score = 0;

document.getElementById("start-btn").addEventListener("click", showInstructions);
document.getElementById("start-memory-btn").addEventListener("click", startMemoryTest);
document.getElementById("submit-recall-btn").addEventListener("click", submitRecall);
document.getElementById("play-again-btn").addEventListener("click", playAgain);

function showInstructions() {
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;

    if (name && age) {
        document.getElementById("user-info").classList.add("hidden");
        document.getElementById("instructions").classList.remove("hidden");
    } else {
        alert("Please enter your name and age to start the game.");
    }
}

function startMemoryTest() {
    document.getElementById("instructions").classList.add("hidden");
    document.getElementById("memory-test").classList.remove("hidden");

    // Select a random image
    selectedImageIndex = Math.floor(Math.random() * images.length);
    document.getElementById("memory-image").src = images[selectedImageIndex];

    // Display the image for 15 seconds
    setTimeout(() => {
        document.getElementById("memory-test").classList.add("hidden");
        document.getElementById("recall").classList.remove("hidden");
    }, 15000); // 15 seconds
}

function submitRecall() {
    const recallInput = document.getElementById("recall-input").value.toLowerCase();
    const recallItems = recallInput.split(',').map(item => item.trim());
    
    score = 0;
    recallItems.forEach(item => {
        if (correctItems[selectedImageIndex].includes(item)) {
            score++;
        }
    });

    document.getElementById("recall").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");
    document.getElementById("score").textContent = `You remembered ${score} out of ${correctItems[selectedImageIndex].length} items correctly!`;
}

function playAgain() {
    score = 0;
    document.getElementById("result").classList.add("hidden");
    document.getElementById("user-info").classList.remove("hidden");
}
