// The use strict mode changes previously accepted "bad syntax" into real errors.
'use strict'

// Define varibles for the various items used
let board     = document.querySelector(".board");
let player    = document.querySelector(".player");
let playAgain = document.querySelector(".playAgain");
let restart   = document.querySelector(".restart");
let box       = 0;

// The array below defines the combinations for a player that results in a win.
// If either player has selected combinations of locations below, that player
// wins the game
let winningArray = [ 
[0, 1, 2, 3],     [41, 40, 39, 38], [7, 8, 9, 10],    [34, 33, 32, 31], [14, 15, 16, 17], 
[27, 26, 25, 24], [21, 22, 23, 24], [20, 19, 18, 17], [28, 29, 30, 31], [13, 12, 11, 10], 
[35, 36, 37, 38], [6, 5, 4, 3],     [0, 7, 14, 21],   [41, 34, 27, 20], [1, 8, 15, 22],

[40, 32, 24, 16], [9, 7, 25, 33],   [8, 16, 24, 32],  [11, 7, 23, 29],  [12, 18, 24, 30],
[1, 2, 3, 4],     [5, 4, 3, 2],     [8, 9, 10, 11],   [12, 11, 10, 9],  [15, 16, 17, 18], 
[19, 18, 17, 16], [22, 23, 24, 25], [26, 25, 24, 23], [29, 30, 31, 32], [33, 32, 31, 30],

[14, 22, 30, 38], [27, 19, 11, 3],  [35, 29, 23, 17], [6, 12, 18, 24],  [28, 22, 16, 10],
[13, 19, 25, 31], [21, 15, 9, 3],   [20, 26, 32, 38], [36, 30, 24, 18], [5, 11, 17, 23], 
[37, 31, 25, 19], [4, 10, 16, 22],  [2, 10, 18, 26],  [39, 31, 23, 15], [1, 9, 17, 25],

[40, 33, 26, 19], [2, 9, 16, 23],   [39, 32, 25, 18], [3, 10, 17, 24],  [38, 31, 24, 17], 
[4, 11, 18, 25],  [37, 30, 23, 16], [5, 12, 19, 26],  [36, 29, 22, 15], [6, 13, 20, 27],
[35, 28, 21, 14], [0, 8, 16, 24],   [41, 33, 25, 17], [7, 15, 23, 31],  [34, 26, 18, 10],

[36, 37, 38, 39], [40, 39, 38, 37], [7, 14, 21, 28],  [8, 15, 22, 29],  [9, 16, 23, 30],
[10, 17, 24, 31], [11, 18, 25, 32], [12, 19, 26, 33], [13, 20, 27, 34] 
];

// The game starts with player 1. Player 1 will make the first selection.
let currentPlayer = 1;

// Event listener for DOM load. When DOM is loaded, loadDOM is called.
document.addEventListener("DOMContentLoaded", loadDOM);

// Data Object Model (DOM) loading
function loadDOM()
{
    // Create the playing board
    createBoard();

    // Set the innter HTML to the current player number (initially set to "1")
    player.innerHTML = currentPlayer;

    // event listener when user executes a mouse click (selection)
    playAgain.addEventListener("click", reset);
    
    // set the variable squares to the .board div 
    let squares =document.querySelectorAll(".board div");
    
    // iterate through the squares and create click event listeners
    // call clickBox callback
    Array.from(squares).forEach(square=>
        {
            square.addEventListener("click", clickBox)
        }
    )
}

// Function to create the playing board
function createBoard()
{
    for(let i = 0; i < 49; i++)
    {
        let div = document.createElement("div");

        // set the data-id attribute of each circle to the value of the index
        // used to iterate through the number of circles that make up the board
        div.setAttribute("data-id", i);
        div.className = "square";

        // There are 42 circles/squares that make up the playing board
        // Set the upper 7 circles as taken
        if (i >= 42)
        {
            div.className = "taken";
        }

        // add the circle to the board
        board.appendChild(div);
    }
}

// Handle each time a user clicks a circle in the playing board box.
function clickBox()
{
    let squares = document.querySelectorAll(".board div");
    let click   = parseInt(this.dataset.id);
    box++;

    // Make sure the user selects a valid circle on the game board
    if( squares[click+7].classList.contains("taken") && !squares[click].classList.contains("taken"))
    {
        // If the current player is 1, then change the current player to 2 (alternate turns)
        if(currentPlayer === 1)
        { 
            // select the current player to 2
            currentPlayer    = 2;

            // populate the inner HTML with the player number (add text for current player)
            player.innerHTML = currentPlayer;

            // toggle the class name 
            this.className   = "player-one taken";

            // After player selection, check for game winning combination.
            checkWon();
        }
        // If the current player is 2, then change the current player to 1 (alternate turns)
        else if(currentPlayer === 2)
        { 
            // select the current player to 2
            currentPlayer    = 1;

            // populate the inner HTML with the player number (add text for current player)
            player.innerHTML = currentPlayer;

            // toggle the class name
            this.className   = "player-two taken";

            // After player selection, check for game winning combination.
            checkWon();
        }

        // If all boxes on the game board are selected, allow the user to start a new game.
        if(box === 42)
        {
            setTimeout(()=>alert("All boxes are filled! No winner! You can start a new game."),300)
            setTimeout(()=>restart.style.display="flex",500) 
        }
    }
    // If the user selects an invalid circle, let them know. 
    else
    {
        // let the user know they have made an invalid selection
        alert("Not a valid selection. You must choose a valid empty circle.")
    }
}

// Function called after each player selection to check for a winning combination
function checkWon()
{
    let squares = document.querySelectorAll(".board div");

    // Loop through the winning array against each player selections to determine
    // if a winning sequence is detected.
    for (let y = 0; y < winningArray.length; y++)
    {
        let square = winningArray[y];

        if(square.every(q=>squares[q].classList.contains("player-one")))
        {
            setTimeout(() =>alert("Player 1: Red Wins!"), 200);
            setTimeout(() =>restart.style.display="flex", 500);
        }
        else if(square.every(q=>squares[q].classList.contains("player-two")))
        {
            setTimeout(() =>alert("Player 2: Purple wins!"), 200);
            setTimeout(() =>restart.style.display="flex", 500);
        }
    }
}

// Reset the playing board
function reset()
{
    // Clear the innter HTML for the board
    board.innerHTML="";

    // Load the Data Object Model
    loadDOM();

    // setting the restart style 
    restart.style.display = "none";

    // Reset the number of boxes selected to zero
    box=0;
}