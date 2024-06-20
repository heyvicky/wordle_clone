const words = {
    easy: ['APPLE', 'BREAD', 'CRANE', 'DEMON', 'EAGLE'],
    medium: ['STREAM', 'BREEZE', 'CUSTOM', 'SPREAD', 'DETAIL'],
    hard: ['COMPLEX', 'JUMPING', 'PYTHON', 'QUICKLY', 'MAGICAL']
};
let correctWord = '';
let currentGuess = '';
let guesses = [];
let level = 1;
let difficulty = 'easy';

function setDifficulty() {
    const difficultySelect = document.getElementById('difficulty');
    difficulty = difficultySelect.value;
    resetGame();
}

function resetGame() {
    level = 1;
    updateLevelInfo();
    createGameBoard();
    setNewWord();
}

function updateLevelInfo() {
    document.getElementById('level').textContent = level;
}

function setNewWord() {
    const wordList = words[difficulty];
    correctWord = wordList[Math.floor(Math.random() * wordList.length)];
}

function createGameBoard() {
    const gameBoard = document.getElementById('game');
    gameBoard.innerHTML = '';  // Clear previous game state
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            tile.id = `tile-${i}-${j}`;
            gameBoard.appendChild(tile);
        }
    }
}

function submitGuess() {
    const guessInput = document.getElementById('guessInput');
    currentGuess = guessInput.value.toUpperCase().trim();

    if (currentGuess.length !== 5) {
        alert('Please enter a 5-letter word');
        return;
    }

    if (guesses.length >= 6) {
        alert('No more guesses left');
        return;
    }

    validateGuess();
    guesses.push(currentGuess);
    guessInput.value = '';

    if (currentGuess === correctWord) {
        alert('Congratulations! You guessed the word!');
        nextLevel();
    } else if (guesses.length === 6) {
        alert(`Game over! The correct word was ${correctWord}`);
        resetGame();
    }
}

function validateGuess() {
    const guess = currentGuess.split('');
    const correct = correctWord.split('');

    for (let i = 0; i < 5; i++) {
        const tile = document.getElementById(`tile-${guesses.length}-${i}`);
        tile.textContent = guess[i];

        if (guess[i] === correct[i]) {
            tile.classList.add('correct');
        } else if (correct.includes(guess[i])) {
            tile.classList.add('present');
        } else {
            tile.classList.add('absent');
        }
    }
}

function nextLevel() {
    level++;
    if (level > 100) {
        alert('Congratulations! You completed all levels!');
        resetGame();
    } else {
        updateLevelInfo();
        createGameBoard();
        setNewWord();
        guesses = [];
    }
}

// Optional: Add an event listener to handle the Enter key press
document.getElementById('guessInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        submitGuess();
    }
});

// Initialize the game
setDifficulty();
