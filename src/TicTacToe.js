import React, { useState } from 'react';
import "./TicTacToe.css";

function TicTacToe(){
    return(
        <div>
            <Board />
        </div>
    );
}

export default TicTacToe;

// square 
// value(prop)
// onclick function(prop)
function Square(props) {
    return (
        <button className="square" onClick ={props.onClick}>
            {props.value}
        </button>
    );
}

//board
function Board(){
    //boardState
    const [boardSquares, setBoardSquares] = useState(Array(9).fill(null));
    //turnState
    const [xIsNext, setIsNext] = useState(true);

    //handleClick
    const handleClick = index => {
        //copy of our board state
        const squares = [...boardSquares];

        //if the index of the board is filled, return
        if(calculateWinner(boardSquares) || squares[index]) return;
        
        // add x or o
        squares[index] = xIsNext ? 'X' : 'O';
        
        //calculate next turn 
        //set the state of the board
        setBoardSquares(squares);
        
        // set the state of the turn
        setIsNext(!xIsNext);
    
    };
    
    //create our board
    //create a render square function
    //take in an index
    //return a square with the correct value and function
    const renderSquare = (index) => {
        return <Square value={boardSquares[index]} onClick={()=> handleClick(index)}/>
    }

    let status;
    const winner = calculateWinner(boardSquares);
    status = winner 
    ? `Winner is: ${winner}`
    :`Next player: ${xIsNext ? "X" : "O"}`;
        
    return (
        <div>
            <div className="status">{status}</div>
                <div className= "eachSquare">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)} 
                </div>
                <div className= "eachSquare">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)} 
                </div>
                <div className= "eachSquare">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)} 
                </div>
           
        </div>
    );

    //function that calculates the winner
    function calculateWinner(squares){
        //set of winning lines
        const winningLines = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];

        // loop through this set
        for(let i= 0; i < winningLines.length; i++){
            const [a,b,c] = winningLines[i];
            if(squares[a] && squares[a]=== squares[b] && squares[b] === squares[c]){
                // if so, return x or o
                return squares[a];
            }
        }
        // else, return nothing
        return null;
    }

}

