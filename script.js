// Select the elements
const tuktuk = document.getElementById('tuktuk');
const van = document.getElementById('van');
const truck = document.getElementById('truck');
var gameOverDiv = document.getElementById('gameOver');

// Define initial position for the tuktuk
let tuktukPosition = 0; // 0 means on the left side of the road
const laneHeight = 150;  // Height of one lane in pixels (adjust as needed)
const roadHeight = 160; // Total height of the road container (use your actual height here)

// Flag to track if the game is over
let gameOverFlag = false;

// Function to check if two elements are colliding
function isColliding(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();
    
    return !(rect1.right < rect2.left || 
             rect1.left > rect2.right || 
             rect1.bottom < rect2.top || 
             rect1.top > rect2.bottom);
}

// Function to stop animations and show the Game Over alert
function gameOver() {
    // Prevent multiple alerts by checking the gameOverFlag
    if (gameOverFlag) return;
    
    gameOverFlag = true;  // Set the flag to true to prevent further game over triggers

    // Stop animations by pausing their animation-play-state
    van.style.animationPlayState = 'paused';
    truck.style.animationPlayState = 'paused';
    
    // Show the game over alert
    gameOverDiv.style.display = "block";
}

// Move the tuktuk up to avoid collision
function moveTuktukUp() {
    if (tuktukPosition > 0) {
        tuktukPosition -= laneHeight; // Move the tuktuk up by one lane
        tuktuk.style.marginTop = `${tuktukPosition}px`;
    }
}

// Move the tuktuk down to avoid collision
function moveTuktukDown() {
    if (tuktukPosition < roadHeight - laneHeight) { 
        tuktukPosition += laneHeight; // Move the tuktuk down by one lane
        tuktuk.style.marginTop = `${tuktukPosition}px`;
    }
}

// Function to check the tuktuk's collision with the van
function checkCollisions() {
    // Check if the tuktuk is in the same lane as the van
    if (isColliding(tuktuk, van)) {
        if (tuktukPosition === 0) { // If the tuktuk is on the same side as the van
            gameOver(); // Game Over
        } else {
            // The tuktuk is on the other side, no collision, game continues
            console.log("Tuktuk is safe, continue playing.");
        }
    }
}

// Listen for key presses to move the tuktuk (for manual movement)
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp') {
        moveTuktukUp(); // Move the tuktuk up (avoid collision)
    } else if (event.key === 'ArrowDown') {
        moveTuktukDown(); // Move the tuktuk down (avoid collision)
    }
});

// Run the collision check every 100 milliseconds
setInterval(checkCollisions, 100);
