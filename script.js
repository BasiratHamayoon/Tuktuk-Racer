const tuktuk = document.getElementById('tuktuk');
const van = document.getElementById('van');
const truck = document.getElementById('truck');
const gameOverDiv = document.getElementById('gameOver');

// Define initial position for the tuktuk
let tuktukPosition = 0; // 0 means on the left side of the road
const laneHeight = 150;  // Height of one lane in pixels (adjust as needed)
const roadHeight = 160; // Total height of the road container (use your actual height here)
let tuktukSide = 'left'; // Track which side the tuktuk is on: 'left' or 'right'

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
    if (gameOverFlag) return; // Prevent multiple game over alerts

    gameOverFlag = true; // Set the flag to prevent further game overs

    // Stop animations by pausing their animation-play-state
    van.style.animationPlayState = 'paused';
    truck.style.animationPlayState = 'paused';

    // Show the game over alert
    gameOverDiv.style.display = "block";

    // const gameOverSound = document.getElementById('gameOverSound');
    // gameOverSound.play();
}

// Move the tuktuk up (when vehicle and tuktuk are on the same side)
function moveTuktukUp() {
    if (tuktukPosition > 0) {
        tuktukPosition -= laneHeight; // Move the tuktuk up by one lane
        tuktuk.style.marginTop = `${tuktukPosition}px`;
    }
}

// Move the tuktuk down (when vehicle and tuktuk are on the same side)
function moveTuktukDown() {
    if (tuktukPosition < roadHeight - laneHeight) { 
        tuktukPosition += laneHeight; // Move the tuktuk down by one lane
        tuktuk.style.marginTop = `${tuktukPosition}px`;
    }
}

// Function to check if the tuktuk is aligned with the van or truck
function checkAlignment() {
    const vanRect = van.getBoundingClientRect();
    const truckRect = truck.getBoundingClientRect();
    const tuktukRect = tuktuk.getBoundingClientRect();

    const vanTop = vanRect.top;
    const truckTop = truckRect.top;
    const tuktukTop = tuktukRect.top;

    // If the tuktuk and van are on the same lane (same top position)
    if (Math.abs(vanTop - tuktukTop) <= 1) {
        return 'van';
    }

    // If the tuktuk and truck are on the same lane (same top position)
    if (Math.abs(truckTop - tuktukTop) <= 1) {
        return 'truck';
    }

    return null; // No alignment
}

// Check for collision when the tuktuk is aligned with either van or truck
function checkCollisions() {
    const alignment = checkAlignment(); // Check alignment of tuktuk with van or truck

    if (alignment === 'van' && isColliding(tuktuk, van)) {
        gameOver(); // Stop the game if tuktuk collides with van
    } 
    else if (alignment === 'truck' && isColliding(tuktuk, truck)) {
        gameOver(); // Stop the game if tuktuk collides with truck
    }
}

// Double-click event to move the tuktuk up or down based on the vehicle's position
tuktuk.style.marginTop = '1px';
tuktuk.addEventListener('dblclick', function(){
    if (tuktuk.style.marginTop === '1px'){
        tuktuk.style.marginTop = '50px';
    } else {
        tuktuk.style.marginTop = '1px';
    }
});
// Run the collision check every 100 milliseconds
setInterval(checkCollisions, 100);





