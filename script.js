/* Game State Data */

const board = [
    null, 0, null, 1, null, 2, null, 3, 
    4, null, 5, null, 6, null, 7, null,
    null, 8, null, 9, null, 10, null, 11, 
    null, null, null, null, null, null, null, null, 
    null, null, null, null, null, null, null, null, 
    12, null, 13, null, 14, null, 15, null, 
    null, 16, null, 17, null, 18, null, 19, 
    20, null, 21, null, 22, null, 23, null
]

/* Cached Variables */

/* Parses piece ID's and returns the indes of that piece's place on the board */
let findPiece = function (pieceId) {
    let parsed = parseInt(pieceId);
    return board.indexOf(parsed);
};

/* DOM References */
const cells = document.querySelectorAll('td');
let redPieces = document.querySelectorAll('p');
let blackPieces = document.querySelectorAll('span');
const redTurn = document.querySelectorAll('.red-turn');
const blackTurn = document.querySelectorAll('.black-turn');
const divider = document.querySelectorAll('#divider');

/* Player Properties */
let turn = true; /* true = Red's turn, false = Black's turn */
let redScore = 12; /* Score = remaining pieces. Score = 0  = loss */
let blackScore = 12;
let playerPieces; /* Holds all of the pieces */

/* Selected Piece Properties */
let selectedPiece = {
    pieceId: -1,
    indexOfBoardPiece: -1,
    isKing: false,
    seventhSpace: false,
    ninthSpace: false,
    fourteenthSpace: false,
    eighteenthSpace: false,
    minusSeventhSpace: false,
    minusNinthSpace: false,
    minusFourteenthSpace: false,
    minusEighteenthSpace: false
}

/* Event Listeners */

/* Initialize event listeners on pieces */
function givePiecesEventListeners() {
    if (turn) {
        for (let i = 0; i < redPieces.length; i++) {
            redPieces[i].addEventListener('click', getPlayerPieces);
        }
    } else {
        for (let i = 0; i < blackPieces.length; i++) {
            blackPieces[i].addEventListener('click', getPlayerPieces);
        }
    }
}

/* Logic Functions */

/* Holds length of player's piece count */
function getPlayerPieces() {
    if (turn) {
        playerPieces = redPieces;
    } else {
        playerPieces = blackPieces;
    }
    removeCellOnClick();
    resetBorders();
}

/* Removes possible moves from old selected piece */
function removeCellOnClick() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeAttribute('onClick');
    }
}

/* Resets borders to default */
function resetBorders() {
    for (let i = 0; i < playerPieces.length; i++) {
        playerPieces[i].style.border = '1px solid white';
    }
    resetSelectedPieceProperties();
    getSelectedPiece();
}

/* Resets selected piece properties */
function resetSelectedPieceProperties() {
    selectedPiece.pieceId = -1;
    selectedPiece.pieceId = -1;
    selectedPiece.isKing = false;
    selectedPiece.seventhSpace = false;
    selectedPiece.ninthSpace = false;
    selectedPiece.fourteenthSpace = false;
    selectedPiece.eighteenthSpace = false;
    selectedPiece.minusSeventhSpace = false;
    selectedPiece.minusNinthSpace = false;
    selectedPiece.minusFourteenthSpace = false;
    selectedPiece.minusEighteenthSpace = false;
}

/* Gets piece ID and index of board location */
function getSelectedPiece() {
    selectedPiece.pieceId = parseInt(e.target.id);
    selectedPiece.indexOfBoardPiece = findPiece(selectedPiece.pieceId);
    isPieceKing();
}

/* Checks to see if piece is King */
function isPieceKing() {
    if (document.getElementById(selectedPiece.pieceId).classList.contains('king')) {
        selectedPiece.isKing = true;
    } else {
        selectedPiece.isKing = 'false';
    }
    getAvailableSpaces();
}

/* Get the moves the selected piece can make */
function getAvailableSpaces() {
    if (board[selectedPiece.indexOfBoardPiece + 7] === null &&
        cells[selectedPiece.indexOfBoardPiece + 7].classList.contains('noPieceHere') !== true) {
            selectedPiece.seventhSpace = true;
        }
    if (board[selectedPiece.indexOfBoardPiece + 9] === null &&
        cells[selectedPiece.indexOfBoardPiece + 9].classList.contains('noPieceHere') !== true) {
            selectedPiece.ninthSpace = true;
        }
    if (board[selectedPiece.indexOfBoardPiece - 7] === null &&
        cells[selectedPiece.indexOfBoardPiece - 7].classList.contains('noPieceHere') !== true) {
            selectedPiece.minusSeventhSpace = true;
        }
    if (board[selectedPiece.indexOfBoardPiece - 9] === null &&
        cells[selectedPiece.indexOfBoardPiece - 9].classList.contains('noPieceHere') !== true) {
            selectedPiece.minusNinthSpace = true;
        }
    checkAvailableJumpSpaces();
}

/* Gets the moves the selected piece can jump */
function checkAvailableJumpSpaces() {
    if (turn) {
        if (board[selectedPiece.indexOfBoardPiece + 14] === null &&
            cells[selectedPiece.indexOfBoardPiece + 14].classList.contains('noPieceHere') !== true &&
            board[selectedPiece.indexOfBoardPiece + 7] >= 12) {
                selectedPiece.fourteenthSpace = true;
            }
        if (board[selectedPiece.indexOfBoardPiece + 18] === null &&
            cells[selectedPiece.indexOfBoardPiece + 18].classList.contains('noPieceHere') !== true &&
            board[selectedPiece.indexOfBoardPiece + 9] >= 12) {
                selectedPiece.eighteenthSpace = true;
            }
        if (board[selectedPiece.indexOfBoardPiece - 14] === null &&
            cells[selectedPiece.indexOfBoardPiece - 14].classList.contains('noPieceHere') !== true &&
            board[selectedPiece.indexOfBoardPiece - 7] >= 12) {
                selectedPiece.minusFourteenthSpace = true;
            }
        if (board[selectedPiece.indexOfBoardPiece - 18] === null &&
            cells[selectedPiece.indexOfBoardPiece -18].classList.contains('noPieceHere') !== true &&
            board[selectedPiece.indexOfBoardPiece - 9] >= 12) {
                selectedPiece.minusEighteenthSpace = true;
            }
    } else {
        if (board[selectedPiece.indexOfBoardPiece + 14] === null &&
            cells[selectedPiece.indexOfBoardPiece + 14].classList.contains('noPieceHere') !== true &&
            board[selectedPiece.indexOfBoardPiece + 7] < 12 && board[selectedPiece.indexOfBoardPiece + 7] !== null) {
                selectedPiece.fourteenthSpace = true;
            }
        if (board[selectedPiece.indexOfBoardPiece + 18] === null &&
            cells[selectedPiece.indexOfBoardPiece + 18].classList.contains('noPieceHere') !== true &&
            board[selectedPiece.indexOfBoardPiece + 9] < 12 && board[selectedPiece.indexOfBoardPiece + 9] !== null) {
                selectedPiece.eighteenthSpace = true;
            }
        if (board[selectedPiece.indexOfBoardPiece - 14] === null &&
            cells[selectedPiece.indexOfBoardPiece - 14].classList.contains('noPieceHere') !== true &&
            board[selectedPiece.indexOfBoardPiece - 7] < 12 && board[selectedPiece.indexOfBoardPiece -7] !== null) {
                selectedPiece.minusFourteenthSpace = true;
            }
        if (board[selectedPiece.indexOfBoardPiece - 18] === null &&
            cells[selectedPiece.indexOfBoardPiece - 18].classList.contains('noPieceHere') !== true &&
            board[selectedPiece.indexOfBoardPiece - 9] < 12 && board[selectedPiece.indexOfBoardPiece - 9] !== null) {
                selectedPiece.minusEighteenthSpace = true;
            }
    }
    checkPieceConditions();
}

/* Restricts movements if piece is King */
function checkPieceConditions() {
    if (selectedPiece.isKing) {
        givePieceBorder();
    } else {
        if (turn) {
            selectedPiece.minusSeventhSpace = false;
            selectedPiece.minusNinthSpace = false;
            selectedPiece.minusFourteenthSpace = false;
            selectedPiece.minusEighteenthSpace = false;
        } else {
            selectedPiece.seventhSpace = false;
            selectedPiece.ninthSpace = false;
            selectedPiece.fourteenthSpace = false;
            selectedPiece.eighteenthSpace = false;
        }
        givePieceBorder();
    }
}

/* Highlight selected piece in green border indicating it can move */
function givePieceBorder() {
    if (selectedPiece.seventhSpace || selectedPiece.ninthSpace || selectedPiece.fourteenthSpace || selectedPiece.eighteenthSpace || selectedPiece.minusSeventhSpace || selectedPiece.minusNinthSpace || selectedPiece.minusFourteenthSpace || selectedPiece.minusEighteenthSpace) {
        document.getElementById(selectedPiece.pieceId).style.border = '3px solid green';
        giveCellsClick();
    } else {
        return;
    }
}


/* Gives cells on board a 'click' based on possible moves */
function giveCellsClick() {
    if (selectedPiece.seventhSpace) {
        cells[selectedPiece.indexOfBoardPiece + 7].setAttribute('onClick', 'makeMove(7)');
    }
    if (selectedPiece.ninthSpace) {
        cells[selectedPiece.indexOfBoardPiece + 9].setAttribute('onClick', 'makeMove(9)');
    }
    if (selectedPiece.fourteenthSpace) {
        cells[selectedPiece.indexOfBoardPiece + 14].setAttribute('onClick', 'makeMove(14)');
    }
    if (selectedPiece.eighteenthSpace) {
        cells[selectedPiece.indexOfBoardPiece + 18].setAttribute('onClick', 'makeMove(18)');
    }
    if (selectedPiece.minusSeventhSpace) {
        cells[selectedPiece.indexOfBoardPiece - 7].setAttribute('onClick', 'makeMove(-7)');
    }
    if (selectedPiece.minusNinthSpace) {
        cells[selectedPiece.indexOfBoardPiece - 9].setAttribute('onClick', 'makeMove(-9)');
    }
    if (selectedPiece.minusFourteenthSpace) {
        cells[selectedPiece.indexOfBoardPiece - 14].setAttribute('onClick', 'makeMove(-14)');
    }
    if (selectedPiece.minusEighteenthSpace) {
        cells[selectedPiece.indexOfBoardPiece - 18].setAttribute('onClick', 'makeMove(-18)');
    }
}

/* When cell is clicked */

/* Makes the move that was clicked */
function makeMove(number) {
    document.getElementById(selectedPiece.pieceId).remove();
    cells[selectedPiece.indexOfBoardPiece].innerHTML = '';
    if (turn) {
        if (selectedPiece.isKing) {
            cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<p class = 'red-piece king' id = '${selectedPiece.pieceId}'></p>`;
            redPieces = document.querySelectorAll('p');
        } else {
            cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<p class = 'red-piece' id = '${selectedPiece.pieceId}'></p>`;
            redPieces = document.querySelectorAll('p');
        }
    } else {
        if (selectedPiece.isKing) {
            cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<span class = 'black-piece king' id = '${selectedPiece.pieceId}'></span>`;
            blackPieces = document.querySelectorAll('span');
        } else {
            cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<span class = 'black-piece' id = '${selectedPiece.pieceId}'></span>`;
            blackPieces = document.querySelectorAll('span');
        }
    }

    let indexOfPiece = selectedPiece.indexOfBoardPiece;
    if (number === 14 || number  === -14 || number === 18 || number === -18) {
        changeData(indexOfPiece, indexOfPiece + number, indexOfPiece + number / 2);
    } else {
        changeData(indexOfPiece, indexOfPiece + number);
    }
}

/* Changes the board states data on back end */
function changeData(indexOfBoardPiece, modifiedIndex, removePiece) {
    board[indexOfBoardPiece] = null;
    board[modifiedIndex] = parseInt(selectedPiece.pieceId);
    if (turn && selectedPiece.pieceId < 12 && modifiedIndex >= 57) {
        document.getElementById(selectedPiece.pieceId).classList.add('king');
    }
    if (turn === false && selectedPiece.pieceId >= 12 && modifiedIndex <= 7) {
        document.getElementById(selectedPiece.pieceId).classList.add('king');
    }
    if (removePiece) {
        board[removePiece] = null;
        if (turn && selectedPiece.pieceId < 12) {
            cells[removePiece].innerHTML = '';
            blackScore --;
        }
        if (turn === false && selectedPiece.pieceId >= 12) {
            cells[removePiece].innerHTML = '';
            redScore --;
        }
    }
    resetSelectedPieceProperties();
    removeCellOnClick();
    removeEventListeners();
}

/* Removes the onClick event listeners for pieces */
function removeEventListeners() {
    if (turn) {
        for (let i = 0; i < redPieces.length; i++) {
            redPieces[i].removeEventListener('click', getPlayerPieces);
        }
    } else {
        for (let i = 0; i < blackPieces.length; i++) {
            blackPieces[i].removeEventListener('click', getPlayerPieces);
        }
    }
    checkForWin();
}

/* Checks to see if either side won */
function checkForWin() {
    if (blackScore === 0) {
        divider.style.display = 'none';
        for (let i = 0; i < redTurn.length; i++) {
            redTurn[i].style.color = 'black';
            blackTurn[i].style.color = 'none';
            redTurn[i].textContent = 'RED WINS!!!';
        }
    } else if (redScore === 0) {
        divider.style.display = 'none';
        for (let i = 0; i < blackTurn.length; i++) {
            blackTurn[i].style.color = 'black';
            redTurn[i].style.color = 'none';
            blackTurn[i].textContent = 'BLACK WINS!!!';
        }
    }
    changePlayer();
}

/* Swap players turn */
function changePlayer() {
    if (turn) {
        turn = false;
        for (let i = 0; i < redTurn.length; i++) {
            redTurn[i].style.color = 'lightGrey';
            blackTurn[i].style.color = 'black';
        }
    } else {
        turn = true;
        for (let i = 0; i < blackTurn.length; i++) {
            blackTurn[i].style.color = 'lightGrey';
            redTurn[i].style.color = 'black';
        }
    }
    givePiecesEventListeners();
}

givePiecesEventListeners();
