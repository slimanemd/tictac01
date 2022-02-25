//Iterations
// 4: Declare winner
// 5: Add time travel
// 6: Showing the Past Moves

//=======================================================================================
//imports
import React, { Component } from "react";

//=======================================================================================
//Style
const MyApp_Style = {

//'style':{
    body:{
            font: '14px "Century Gothic", Futura, sans-serif',
            margin: '20px'
        },
    
    'ol, ul': {
        'padding-left': 30
    },
    
    
    '.board-row:after':{
        clear: 'both',
        content: "",
        display: 'table',
    },
    

    '.status':{
        'margin-bottom': 10
    },
    
    
    '.square':{
        background: '#fff',
        border: '1px solid #999',
        float: 'left',
        'font-size': 24,
        'font-weight': 'bold',
        //'line-height': 0,
        height: 34,
        'margin-right': '-1px',
        'margin-top': '-1px',
        padding: 0,
        'text-align': 'center',
        width: 34,
    },
    
    
    '.square:focus': {
        outline: 'none'
    },
    
    '.kbd-navigation .square:focus': {
        background: '#ddd'
    },
    
    '.game': {
        display: 'flex',
        'flex-direction': 'row',
    },
    
    '.game-info': {
        'margin-left': 20
    }
}

//=======================================================================================
// calculateWinner
const calculateWinner = squares => {
        const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
        }
        return null;
    }


//===================================================================================
//Square
const Square = props => 
    <button className="square" onClick={props.onClick}>{props.value} </button>


//Board
const Board = props =>
    <div>
        { [0,1,2].map( rw => 
            <div key={rw} className="board-row">
                { [0,1,2].map( 
                    cl => 
                    <Square key={rw * 3 + cl} value={ props.squares[rw * 3 + cl] }    onClick={ () => props.onClick(rw * 3 + cl) } />
                    )}
            </div>    
        ) }
    </div>



//Game
class Game extends React.Component {

    // Lifting State Up, Again
    constructor(props) {
        super(props);
        this.state = {            //Storing a History of Moves
            history: [{  squares: Array(9).fill(null),  }],
            stepNumber: 0,
            xIsNext: true,
        };
      }
    
    //
    tictacCell = i => {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);   //const history = this.state.history;
        const current = history[history.length - 1];  //history[this.state.stepNumber]; //
        
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) return;
        squares[i] = this.state.xIsNext ? 'X' : 'O';

        this.setState({
          history: history.concat([{ squares: squares, }]),
          stepNumber: history.length,
          xIsNext: !this.state.xIsNext,
        });
      }

    //
    jumpTo = step => this.setState({
          stepNumber: step,
          xIsNext: (step % 2) === 0,
        })

    //
    getStatus = squares => {
        const winner = calculateWinner(squares);
        return (winner ? 'Winner: ' + winner : 'Next player: ' + (this.state.xIsNext ? 'X' : 'O'));
    }

    //
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];

        return (
        <div className="game">
            <div className="game-board">
                <Board squares={current.squares}  onClick={(i) => this.tictacCell(i) } />
            </div>
            <div className="game-info">
                <div>{ this.getStatus(current.squares) }</div>
                <ol>{ history.map((step, move) =>
                        <li key={move}><button onClick={() => this.jumpTo(move)}>
                            { 'Go to ' + (move ? 'move #'+move : 'game start') }
                        </button></li>
                    )}</ol>
            </div>
        </div>
        );
    }
}


//=======================================================================================
//Global / App Style
export const GbApp ={ ...MyApp_Style, }

//My App
export const MyApp = () =><Game />
//=======================================================================================