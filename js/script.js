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
        for(let i = 0; i <= 2; i++) {
            //row win
            if (board[i][0] === board[i][1] === board[i][2] &&
                board[i][0] !== "b") { 
                return true;
            }
            //column win
            else if (board[0][i] === board[1][i] === board[2][i] &&
                board[0][i] !== "b") { 
                return true;
            }
        }
        //diagonal wins
        if (board[0][0] === board[1][1] === board[2][2]  &&
            board[1][1] !== "b") { 
            return true;
        }
        else if (board[0][2] === board[1][1] === board[2][0]  &&
            board[1][1] !== "b") {
            return true;
        }
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
        resetGameBoard, checkIfBlank };
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

    const gameBoardDiv = document.querySelector('#game-board');

    gameBoardDiv.addEventListener('click', (event) => {
        if (event.target.className === 'board-slot') {
            const boardSpace = event.target;
            const row = boardSpace.id[0];
            const column = boardSpace.id[1];
            
            if (gameBoard.checkIfBlank(row, column)) {
                gameBoard.placePiece(row, column, playerTurn);
                boardSpace.textContent = playerTurn;
                togglePlayerTurn();
            }


        }
    })

    return { getRoundCount, incrementRoundCount, 
        getPlayerTurn, togglePlayerTurn, reset }
})();

const displayController = (function () {

})();

function playRound() {

}

function playGame() {
    let player1 = createPlayer('x');
    let player2 = createPlayer('o');

    console.log( gameBoard.getBoard() );
}