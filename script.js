const tuktuk = document.getElementById('tuktuk');
const van = document.getElementById('van');
const truck = document.getElementById('truck');

// Function to check if two elements are colliding
function isColliding(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();
    
    return !(rect1.right < rect2.left || 
             rect1.left > rect2.right || 
             rect1.bottom < rect2.top || 
             rect1.top > rect2.bottom);
}

// Function to stop animations and show Game Over alert
function gameOver() {
    // Stop animations by pausing their animation-play-state
    van.style.animationPlayState = 'paused';
    truck.style.animationPlayState = 'paused';
    tuktuk.style.animationPlayState = 'paused';  // Optional, if you have an animation for the tuktuk
    
    // Show the game over alert
    alert('Game Over! The Tuktuk collided with another vehicle.');
}

// Animation loop to check for collisions
function checkCollisions() {
    if (isColliding(tuktuk, van) || isColliding(tuktuk, truck)) {
        gameOver();
    }
}

// Run the collision check every 100 milliseconds
setInterval(checkCollisions, 100);