const tuktuk = document.getElementById('tuktuk');
const van = document.getElementById('van');
const truck = document.getElementById('truck');
const gameOverDiv = document.getElementById('gameOver');
const startBtn = document.getElementById('startBtn');
const startContainer = document.querySelector('.start-container');  // Get the start container
const backgroundOverlay = document.getElementById('backgroundOverlay');  // Get the background overlay

// Define initial position for the tuktuk
let tuktukPosition = 0;  // 0 means on the left side of the road
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

// Function to stop all animations
function stopAllAnimations() {
    van.style.animation = 'none';
    truck.style.animation = 'none';
    tuktuk.style.transition = 'none';  // Stop any transition animation for the tuktuk
}

// Function to restart all animations
function startAllAnimations() {
    van.style.animation = '';  // Restart van animation
    truck.style.animation = '';  // Restart truck animation
    tuktuk.style.transition = 'margin-top 0.5s ease';  // Allow smooth transitions for tuktuk
}

// Function to stop the game and show the game over alert
function gameOver() {
    if (gameOverFlag) return; // Prevent multiple game over alerts

    gameOverFlag = true; // Set the flag to prevent further game overs

    // Stop animations
    stopAllAnimations();

    // Show the game over alert
    gameOverDiv.style.display = "block";

    // Show the background overlay
    backgroundOverlay.style.display = "block";
}

// Start Game logic
function startGame() {
    // Hide the Start Game container
    startContainer.style.display = 'none';

    // Reset the gameOverFlag in case the game was restarted
    gameOverFlag = false;

    // Reset the tuktuk position
    tuktuk.style.marginTop = '1px'; 

    // Hide the game over message if visible
    gameOverDiv.style.display = "none"; 

    // Hide the background overlay
    backgroundOverlay.style.display = "none";

    // Start all animations
    startAllAnimations();

    // Optionally: Start the game logic for vehicle movement
    // You can start a loop or setInterval for continuous vehicle movement here, if necessary.
}

// Add event listener for the Start Game button
startBtn.addEventListener('click', startGame);

// Double-click event to move the tuktuk up or down based on the vehicle's position
tuktuk.addEventListener('dblclick', function(){
    if (tuktuk.style.marginTop === '1px'){
        tuktuk.style.marginTop = '50px';
    } else {
        tuktuk.style.marginTop = '1px';
    }
});

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

// Run the collision check every 100 milliseconds
setInterval(checkCollisions, 100);

// Initially stop animations when the page loads
stopAllAnimations();