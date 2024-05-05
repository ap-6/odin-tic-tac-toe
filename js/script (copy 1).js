const gameBoard = (function () {
    const board = [
        ['b', 'b', 'b'], //row 0
        ['b', 'b', 'b'], //row 1
        ['b', 'b', 'b']  //row 2
    ];

    const checkGameWin = function() {
        if (board[0][0] === board[0][1] === board[0][2] || //row 0 win
            board[1][0] === board[1][1] === board[1][2] || //row 1 win
            board[2][0] === board[2][1] === board[2][2] || //row 2 win
            board[0][0] === board[1][0] === board[2][0] || //column 0 win
            board[0][1] === board[1][1] === board[2][1] || //column 1 win
            board[0][2] === board[1][2] === board[2][2] || //column 2 win
            board[0][0] === board[1][1] === board[2][2] || //diagonal 1 win
            board[0][2] === board[1][1] === board[2][0]) { //diagonal 2 win
            return true;
        }
        else return false;
    }

    const checkGameOver = function() {
        return board.includes("b");
    }
})();
   

const gameBoard = (function () {
    const board = new Array(9).fill("b");

    const checkGameWin = function() {
        if (board[0] === board[1] === board[2] || //horizontal win
            board[3] === board[4] === board[5] ||
            board[6] === board[7] === board[8] ||
            board[0] === board[3] === board[6] || //vertical win
            board[1] === board[4] === board[7] ||
            board[2] === board[5] === board[8] ||
            board[0] === board[4] === board[8] || //diagonal win
            board[2] === board[4] === board[6]) {
            return true;
        }
        else return false;
    }

    const checkGameOver = function() {
        return board.includes("b");
    }
})();
   


