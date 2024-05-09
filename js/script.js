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
    
    const getGameBoard = function() {
        return board;
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

    const checkBoardFull = function() {
        return !(board[0].includes('b') || 
                board[1].includes('b') || 
                board[2].includes('b'));
    }

    const resetGameBoard = function() {
        board.forEach((row, index) => board[index] = ['b', 'b', 'b']);
    }

    return { setSlot, getSlot, checkBoardFull, checkGameWin, 
        resetGameBoard, checkIfBlank, getWinStats, getGameBoard };
})();

function createPlayer(name) {
    const getName = function() {
        return name;
    }

    return { getName }
}

const player1 = createPlayer('x');
const player2 = createPlayer('o');

const gameController = (function() {
    let roundCount = 1;
    let playerTurn = 'x';
    
    const score = { 
        player1: 0,
        player2: 0
    }

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

const displayController = (function() {
    const gameBoardDiv = document.querySelector('#game-board');
    const emptyGameBoardDiv = gameBoardDiv.cloneNode(true);
    const announcements = document.querySelector('.announcements');
    const restartBtn = document.querySelector('#restart-btn');

    announcements.textContent = player1.getName() + '\'s turn';

    const styleWinningSlots = function() {
        const winningSlotIds = gameBoard.getWinStats().winningSlotIds;
        for (let i = 0; i < winningSlotIds.length; i++) {
            const winningRow = winningSlotIds[i][0];
            const winningColumn = winningSlotIds[i][1];
            const winningSlotDiv = getDivSlotReference(winningRow, winningColumn);
            
            if (gameController.getPlayerTurn() === 'x') {
                winningSlotDiv.classList.add('winning-slot-one');
                winningSlotDiv.classList.remove('player-one');
            }
            else {
                winningSlotDiv.classList.add('winning-slot-two');
                winningSlotDiv.classList.remove('player-two');
            }
            winningSlotDiv.classList.remove('board-slot');
        }
    }

    const getDivSlotReference = function(row, column) {
        slotId = row + '' + column;
        for (let i = 0; i < gameBoardDiv.children.length; i++) {
            if (gameBoardDiv.children[i].id === slotId) {
                return gameBoardDiv.children[i];
            }
        }
    }

    const setPlayerTurnAnnouncement = function() {
        if (gameController.getPlayerTurn() == "x") {
            announcements.textContent = player1.getName() + '\'s turn';
        }
        else {
            announcements.textContent = player2.getName() + '\'s turn';
        }
        
    }

    const interactGameBoardDiv = (event) => {
        if (event.target.classList.contains('board-slot')) {
            
            const boardSlot = event.target;
            const row = boardSlot.id[0];
            const column = boardSlot.id[1];
            
            if (gameBoard.checkIfBlank(row, column)) {
                gameBoard.setSlot(row, column, gameController.getPlayerTurn());
                boardSlot.textContent = gameBoard.getSlot(row, column);
                //style slot according to turn
                if (gameController.getPlayerTurn() == 'x') {
                    boardSlot.classList.remove('player-one-hover');
                    boardSlot.classList.add('player-one');
                }
                else {
                    boardSlot.classList.remove('player-two-hover');
                    boardSlot.classList.add('player-two');
                }

                boardSlot.classList.add('bounce-animation');

                //end game checks
                if (gameBoard.checkGameWin()) {
                    announcements.textContent = 'Game won'
                    gameBoardDiv.removeEventListener('click', interactGameBoardDiv);
                    styleWinningSlots();
                }
                else if (gameBoard.checkBoardFull()) {
                    announcements.textContent = 'Game tied';
                    gameBoardDiv.removeEventListener('click', interactGameBoardDiv);
                }
                else { 
                    gameController.togglePlayerTurn();
                    setPlayerTurnAnnouncement();
                }
                
            }
        }
    }

    const hoverBoardSlot = (event) => {
        if (event.target.classList.contains('board-slot')) {
            const boardSlot = event.target;
            const row = boardSlot.id[0];
            const column = boardSlot.id[1];
            
            if (gameBoard.checkIfBlank(row, column)) {
                boardSlot.textContent = gameController.getPlayerTurn();
                if (gameController.getPlayerTurn() == 'x') {
                    boardSlot.classList.add('player-one-hover');
                }
                else {
                    boardSlot.classList.add('player-two-hover');
                }
            }
        }
    }

    const unhoverBoardSlot = (event) => {
        if (event.target.classList.contains('board-slot')) {
            const boardSlot = event.target;
            const row = boardSlot.id[0];
            const column = boardSlot.id[1];
            
            if (gameBoard.checkIfBlank(row, column)) {
                boardSlot.textContent = '';
                if (gameController.getPlayerTurn() == 'x') {
                    boardSlot.classList.remove('player-one-hover');
                }
                else {
                    boardSlot.classList.remove('player-two-hover');
                }
            }
        }
    }

    const resetGameBoardDiv = function() {
        while (gameBoardDiv.firstChild) {
            gameBoardDiv.removeChild(gameBoardDiv.firstChild);
        }
        
        emptyGameBoardDiv.childNodes.forEach((child) => {
            gameBoardDiv.appendChild(child.cloneNode(true));
        })
       
    }

    const resetGameDisplay = function() {
        resetGameBoardDiv();
        announcements.textContent = '';
    }

    gameBoardDiv.addEventListener('click', interactGameBoardDiv);

    restartBtn.addEventListener('click', () => {
        resetGameDisplay(); 
        gameController.reset();
        gameBoard.resetGameBoard();
        //re-add event listener because it's removed upon game end
        gameBoardDiv.addEventListener('click', interactGameBoardDiv);
        setPlayerTurnAnnouncement();
    });

    gameBoardDiv.addEventListener('mouseover', hoverBoardSlot);
    gameBoardDiv.addEventListener('mouseout', unhoverBoardSlot);

})();