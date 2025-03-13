const canvas = document.getElementById("gameCanvas"); // Get the canvas element
const ctx = canvas.getContext("2d"); // Get the 2D rendering context
const scoreDisplay = document.getElementById("score"); // Get the score display element
const gridSize = 20; // Define the size of each grid cell

let snake = [{ x: 10, y: 10 }]; // Initialize the snake with a starting position
let food = { x: 5, y: 5 }; // Initialize the food with a starting position
let dx = 1; // Initialize the horizontal direction (1 = right, -1 = left, 0 = no horizontal movement)
let dy = 0; // Initialize the vertical direction (1 = down, -1 = up, 0 = no vertical movement)
let score = 0; // Initialize the score

// Function to generate a new random position for the food
function generateFood() {
    food = {
        x: Math.floor(Math.random() * (canvas.width / gridSize)), // Random x-coordinate within the canvas grid
        y: Math.floor(Math.random() * (canvas.height / gridSize)), // Random y-coordinate within the canvas grid
    };
}

// Function to draw the game elements on the canvas
function draw() {
    ctx.fillStyle = "#f8f8f8"; // Set the background color
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the canvas with the background color

    ctx.fillStyle = "red"; // Set the food color
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize); // Draw the food

    snake.forEach(segment => {
        ctx.fillStyle = "green"; // Set the snake color
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize); // Draw each snake segment
    });
}

// Function to update the game state
function update() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy }; // Calculate the new head position

    snake.unshift(head); // Add the new head to the beginning of the snake

    // Check if the snake has eaten the food
    if (head.x === food.x && head.y === food.y) {
        generateFood(); // Generate new food
        score++; // Increment the score
        scoreDisplay.textContent = score; // Update the score display
    } else {
        snake.pop(); // Remove the last segment of the snake if it didn't eat food
    }

    // Check for collision with the canvas boundaries
    if (head.x < 0 || head.x >= canvas.width / gridSize || head.y < 0 || head.y >= canvas.height / gridSize) {
        gameOver(); // End the game if the snake hits a wall
        return; // Exit the update function
    }

    // Check for collision with the snake's own body
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver(); // End the game if the snake hits itself
            return; // Exit the update function
        }
    }
}

// Function to handle game over
function gameOver() {
    alert("Better luck next time! Your score: " + score); // Display game over message with the score
    snake = [{ x: 10, y: 10 }]; // Reset the snake to its initial position
    dx = 1; // Reset the horizontal direction
    dy = 0; // Reset the vertical direction
    generateFood(); // Generate new food
    score = 0; // Reset the score
    scoreDisplay.textContent = score; // Update the score display
}

// Function to run the game loop
function gameLoop() {
    update(); // Update the game state
    draw(); // Draw the game elements
    setTimeout(gameLoop, 400); // Call the game loop again after a delay (adjust the delay to change the game speed)
}

// Event listener for keyboard input
document.addEventListener("keydown", event => {
    switch (event.key) {
        case "ArrowUp":
            if (dy !== 1) { // Prevent the snake from reversing direction
                dx = 0;
                dy = -1;
            }
            break;
        case "ArrowDown":
            if (dy !== -1) { // Prevent the snake from reversing direction
                dx = 0;
                dy = 1;
            }
            break;
        case "ArrowLeft":
            if (dx !== 1) { // Prevent the snake from reversing direction
                dx = -1;
                dy = 0;
            }
            break;
        case "ArrowRight":
            if (dx !== -1) { // Prevent the snake from reversing direction
                dx = 1;
                dy = 0;
            }
            break;
    }
});

generateFood(); // Generate the initial food
gameLoop(); // Start the game loop