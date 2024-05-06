const gameBoard = (function () {
    const board = [
        ['b', 'b', 'b'], //row 0
        ['b', 'b', 'b'], //row 1
        ['b', 'b', 'b']  //row 2
    ]; //'b' for blank

    const getBoard = function() {
        return board;
    }

    const checkIfBlank = function (row, column) {
        return board[row][column] === 'b';
    } 

    const placePiece = function(row, column, playerTurn) {
        board[row][column] = playerTurn;
    }

    const checkGameWin = function() {
        for(let i = 0; i <= 2; i++) { //check each row and column
            //row win
            if (board[i][0] === board[i][1] && 
                board[i][1] === board[i][2] &&
                !checkIfBlank(i, 0)) { 
                return true;
            }
            //column win
            else if (board[0][i] === board[1][i] &&
                board[1][i] === board[2][i] &&
                !checkIfBlank(0, i)) {
                return true;
            }
        }
        //check diagonal wins
        if (board[0][0] === board[1][1] &&
            board[1][1] === board[2][2] &&
            !checkIfBlank(1, 1)) {
            return true;
        }
        else if (board[0][2] === board[1][1] &&
            board[1][1] === board[2][0] &&
            !checkIfBlank(1, 1)) {
            return true;
        }
        
        return false;
    }

    const getWinStats = function() {
        const winningPieces = [];
        let winningPlayer = "";

        for(let i = 0; i <= 2; i++) { //check each row and column
            //row win
            if (board[i][0] === board[i][1] && 
                board[i][1] === board[i][2] &&
                !checkIfBlank(i, 0)) { 
                winningPieces.push(i + "0");
                winningPieces.push(i + "1");
                winningPieces.push(i + "2");
            }
            //column win
            if (board[0][i] === board[1][i] &&
                board[1][i] === board[2][i] &&
                !checkIfBlank(0, i)) {
                winningPieces.push("0" + i);
                winningPieces.push("1" + i);
                winningPieces.push("2" + i);
            }
        }
        //check diagonal wins
        if (board[0][0] === board[1][1] &&
            board[1][1] === board[2][2] &&
            !checkIfBlank(1, 1)) {
            winningPieces.push("00");
            winningPieces.push("11");
            winningPieces.push("22");
        }
        if (board[0][2] === board[1][1] &&
            board[1][1] === board[2][0] &&
            !checkIfBlank(1, 1)) {
            winningPieces.push("02");
            winningPieces.push("11");
            winningPieces.push("20");
        }

        //determine winning player
        if (winningPieces.length > 0) {
            winningPlayer = board[winningPieces[0][0]][winningPieces[0][1]];
        }
        
        return { winningPlayer, winningPieces };
    }

    const checkGameOver = function() {
        return !(board[0].includes('b') || 
                board[1].includes('b') || 
                board[2].includes('b'));
    }

    const resetGameBoard = function() {
        board = [
            ['b', 'b', 'b'], //row 0
            ['b', 'b', 'b'], //row 1
            ['b', 'b', 'b']  //row 2
        ]; 
    }

    return { getBoard, placePiece, checkGameOver, checkGameWin, 
        resetGameBoard, checkIfBlank, getWinStats};
})();

function createPlayer(playerPiece) {


    return { playerPiece }
}

const gameController = (function() {
    let roundCount = 1;
    let playerTurn = 'x';

    const getRoundCount = () => roundCount;
    const incrementRoundCount = () => roundCount++;
    const getPlayerTurn = () => playerTurn;
    const togglePlayerTurn = function () {
        playerTurn = playerTurn === 'x' ? 'o' : 'x';
    }
    const reset = function () {
        roundCount = 1;
        playerTurn = 'x';
    }

    return { getRoundCount, incrementRoundCount, 
        getPlayerTurn, togglePlayerTurn, reset }
})();

const displayController = (function () {
    const gameBoardDiv = document.querySelector('#game-board');
    const announcements = document.querySelector('.announcements');

    const interactGameBoardDiv = (event) => {
        if (event.target.className === 'board-slot') {
            const boardSlot = event.target;
            const row = boardSlot.id[0];
            const column = boardSlot.id[1];
            
            if (gameBoard.checkIfBlank(row, column)) {
                gameBoard.placePiece(row, column, gameController.getPlayerTurn());
                boardSlot.textContent = gameController.getPlayerTurn();
                gameController.togglePlayerTurn();

                if (gameBoard.checkGameWin()) {
                    announcements.textContent = 'Game won'
                    gameBoardDiv.removeEventListener('click', interactGameBoardDiv);
                    console.log(gameBoard.getWinStats());
                }
                else if (gameBoard.checkGameOver()) {
                    announcements.textContent = 'Game tied';
                }
            }
        }
    }

    gameBoardDiv.addEventListener('click', interactGameBoardDiv);
})();

function playRound() {

}

function playGame() {
    let player1 = createPlayer('x');
    let player2 = createPlayer('o');

    console.log( gameBoard.getBoard() );
}