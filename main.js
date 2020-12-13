// 1 object array | 10 objects | Each object has 2 properties (name & img)
var cardsArray = [{
        'name': 'CSS',
        'img': 'https://github.com/robgmerrill/img/blob/master/css3-logo.png?raw=true',
    },
    {
        'name': 'HTML',
        'img': 'https://github.com/robgmerrill/img/blob/master/html5-logo.png?raw=true',
    },
    {
        'name': 'jQuery',
        'img': 'https://github.com/robgmerrill/img/blob/master/jquery-logo.png?raw=true',
    },
    {
        'name': 'JS',
        'img': 'https://github.com/robgmerrill/img/blob/master/js-logo.png?raw=true',
    },
    {
        'name': 'Node',
        'img': 'https://github.com/robgmerrill/img/blob/master/nodejs-logo.png?raw=true',
    },
    {
        'name': 'Photo Shop',
        'img': 'https://github.com/robgmerrill/img/blob/master/photoshop-logo.png?raw=true',
    },
    {
        'name': 'PHP',
        'img': 'https://github.com/robgmerrill/img/blob/master/php-logo_1.png?raw=true',
    },
    {
        'name': 'Python',
        'img': 'https://github.com/robgmerrill/img/blob/master/python-logo.png?raw=true',
    },
    {
        'name': 'Ruby',
        'img': 'https://github.com/robgmerrill/img/blob/master/rails-logo.png?raw=true',
    },
    {
        'name': 'Sass',
        'img': 'https://github.com/robgmerrill/img/blob/master/sass-logo.png?raw=true',
    },
    {
        'name': 'Sublime',
        'img': 'https://github.com/robgmerrill/img/blob/master/sublime-logo.png?raw=true',
    },
    {
        'name': 'Wordpress',
        'img': 'https://github.com/robgmerrill/img/blob/master/wordpress-logo.png?raw=true',
    }
];

// Duplicate the cardsArray using the concat method and loop through it
var gameGrid = cardsArray.concat(cardsArray);

// Randomise the gameGrid on each load
gameGrid.sort(function() {
    return 0.5 - Math.random();
})

// Grab the div with an id of game-board and assign it the variable Game
var game = document.getElementById('game-board');
// Create a section element and assign it to the grid variable
var grid = document.createElement('section');
// Give section element a class of grid
grid.setAttribute('class', 'grid');
// Append the grid section to the game-board div
game.appendChild(grid);

// Loop through each item in our cardsArray
for (i = 0; i < gameGrid.length; i++) {
    // Create a div element and assign to variable card
    var card = document.createElement('div');
    // Apply a card class to that div
    card.classList.add('card');
    // Set the data-name attribute of the div to the cardsArray name
    card.dataset.name = gameGrid[i].name;

    // create back of cards
    var front = document.createElement('div');
    // add class of back
    front.classList.add('front');

    // create back of the cards
    var back = document.createElement('div');
    back.classList.add('back');
    // Apply the background image of the back to the cardsArray image
    back.style.backgroundImage = `url(${gameGrid[i].img})`;

    // Append the div to the grid section
    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
};



var firstGuess = '';
var secondGuess = '';
// Set value of count to zero
var count = 0;
var previousTarget = null;
var delay = 1200;

// create a function to add match class
var match = function() {
    var selected = document.querySelectorAll('.selected');
    // loop through array-like object containing .selected
    for (i = 0; i < selected.length; i++) {
        selected[i].classList.add('match');
    }
}
// Reset guesses after two attempts
var resetGuesses = function() {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;

    var selected = document.querySelectorAll('.selected');
    for (i = 0; i < selected.length; i++) {
        selected[i].classList.remove('selected');
    }
}


// add an event listener to the game
grid.addEventListener('click', function(event) {
    // declare a variable to target the clicked item
    var clicked = event.target;
    // only select the divs inside the grid, not the section itself
    if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('match') || clicked.parentNode.classList.contains('selected')) {
        return;
    }
    // Only add the 'selected' class if the current value of count is less than 2
    if (count < 2) {
        count++;

        if (count === 1) {
            // Assign firstGuess
            firstGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        } else {
            // Assign secondGuess
            secondGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        }
        // Make sure both strings (guesses) are not empty - otherwise they would always be a match
        if (firstGuess != '' && secondGuess != '') {
            // Add if the firstGuess matches the secondGuess
            if (firstGuess === secondGuess) {
                // Run the match function
                setTimeout(match, delay);
                setTimeout(resetGuesses, delay);
            } else {
                setTimeout(resetGuesses, delay);
            }
        }
        previousTarget = clicked;
    }
})
