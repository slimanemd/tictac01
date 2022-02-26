//Iterations
// 4: Declare winner
// 5: Add time travel
// 6: Showing the Past Moves

//=======================================================================================
//imports
import React, { Component } from "react";
import { MyApp_Style, calculateWinner, Board } from "./tictac_shared";


//======================================================================================
//Game
class Game extends Gameold {

    // Lifting State Up, Again
    constructor(props) {
        super(props);
    }
    
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

//Game
class Gameold extends React.Component {

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
    tictacCell(i) {
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
    jumpTo(step) {
        this.setState({
          stepNumber: step,
          xIsNext: (step % 2) === 0,
        });
      }

    //
    getStatus = squares => {
        const winner = calculateWinner(squares);
        if (winner)  return 'Winner: ' + winner;
        return 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    //
    getMoves = history => history.map(
        (step, move) =>
            <li key={move}><button onClick={() => this.jumpTo(move)}>
                { 'Go to ' + (move ? 'move #'+move : 'game start') }
            </button></li>
        )
        
    //
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];  //const current = history[history.length - 1];        //const winner = calculateWinner(current.squares);

        return (
        <div className="game">
            <div className="game-board">
                <Board squares={current.squares}  onClick={(i) => this.tictacCell(i) } />
            </div>
            <div className="game-info">
                <div>{ this.getStatus(current.squares) }</div>
                <ol>{ this.getMoves(history) }</ol>
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