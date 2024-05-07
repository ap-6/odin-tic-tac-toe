const gameBoard = (function () {
    const board = [
        ['b', 'b', 'b'], //row 0
        ['b', 'b', 'b'], //row 1
        ['b', 'b', 'b']  //row 2
    ]; //'b' for blank

    const checkIfBlank = function (row, column) {
        return board[row][column] === 'b';
    } 

    const setSlot = function(row, column, playerTurn) {
        board[row][column] = playerTurn;
    }

    const getSlot = function(row, column) {
        return board[row][column];
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
        const winningSlotIds = [];
        let winningPlayer = "";

        for(let i = 0; i <= 2; i++) { //check each row and column
            //row win
            if (board[i][0] === board[i][1] && 
                board[i][1] === board[i][2] &&
                !checkIfBlank(i, 0)) { 
                winningSlotIds.push(i + "0");
                winningSlotIds.push(i + "1");
                winningSlotIds.push(i + "2");
            }
            //column win
            if (board[0][i] === board[1][i] &&
                board[1][i] === board[2][i] &&
                !checkIfBlank(0, i)) {
                winningSlotIds.push("0" + i);
                winningSlotIds.push("1" + i);
                winningSlotIds.push("2" + i);
            }
        }
        //check diagonal wins
        if (board[0][0] === board[1][1] &&
            board[1][1] === board[2][2] &&
            !checkIfBlank(1, 1)) {
            winningSlotIds.push("00");
            winningSlotIds.push("11");
            winningSlotIds.push("22");
        }
        if (board[0][2] === board[1][1] &&
            board[1][1] === board[2][0] &&
            !checkIfBlank(1, 1)) {
            winningSlotIds.push("02");
            winningSlotIds.push("11");
            winningSlotIds.push("20");
        }

        //determine winning player
        if (winningSlotIds.length > 0) {
            winningPlayer = board[winningSlotIds[0][0]][winningSlotIds[0][1]];
        }
        
        return { winningPlayer, winningSlotIds };
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

    return { setSlot, getSlot, checkGameOver, checkGameWin, 
        resetGameBoard, checkIfBlank, getWinStats };
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

    const styleWinningSlots = function () {
        const winningSlotIds = gameBoard.getWinStats().winningSlotIds;
        for (let i = 0; i < gameBoardDiv.children.length; i++) {
            let boardSlotDiv = gameBoardDiv.children[i];
            if (winningSlotIds.includes(boardSlotDiv.id)) {
                boardSlotDiv.classList.add("winning-slot");
                boardSlotDiv.classList.remove("board-slot");
                
            }
        }
    }

    const interactGameBoardDiv = (event) => {
        if (event.target.className === 'board-slot') {
            const boardSlot = event.target;
            const row = boardSlot.id[0];
            const column = boardSlot.id[1];
            
            if (gameBoard.checkIfBlank(row, column)) {
                gameBoard.setSlot(row, column, gameController.getPlayerTurn());
                boardSlot.textContent = gameBoard.getSlot(row, column);
                gameController.togglePlayerTurn();

                if (gameBoard.checkGameWin()) {
                    announcements.textContent = 'Game won'
                    gameBoardDiv.removeEventListener('click', interactGameBoardDiv);
                    styleWinningSlots();
                }
                else if (gameBoard.checkGameOver()) {
                    announcements.textContent = 'Game tied';
                }
            }
        }
    }

    gameBoardDiv.addEventListener('click', interactGameBoardDiv);
})();

