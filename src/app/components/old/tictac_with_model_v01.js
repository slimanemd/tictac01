//Iterations
// 4: Declare winner
// 5: Add time travel
// 6: Showing the Past Moves

//=======================================================================================
//imports
import React, { Component } from "react";
import { MyApp_Style, calculateWinner as calWinner, Board } from "./tictac_shared";

//=======================================================================================
// logic

//Game
class TicTacModel { //extends Component {
    // Lifting State Up, Again
    constructor() {
        this.state = {            //Storing a History of Moves
            history: [{  squares: Array(9).fill(null),  }],
            stepNumber: 0,
            xIsNext: true,
        };
        this.winner = null 
    }

    // calculateWinner
    calculateWinner = calWinner

    //
    tictacCell = i => {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);   //const history = this.state.history;
        const current = history[history.length - 1];  //history[this.state.stepNumber]; //
        
        const squares = current.squares.slice();
        if (this.calculateWinner() || squares[i]) return;
        squares[i] = this.state.xIsNext ? 'X' : 'O';

        this.state = {
          history: history.concat([{ squares: squares, }]),
          stepNumber: history.length,
          xIsNext: !this.state.xIsNext,
        };

        return this
      }

    //
    jumpTo = step => {
        this.state ={
          stepNumber: step,
          xIsNext: (step % 2) === 0,
        };

        return this
    }
}


//===================================================================================
//
class Game extends Component{
    constructor(props){
        super(props)
        this.state ={ model: props.model }
    }
    
    handleClick =  i => this.setState({ model: this.state.model.tictacCell(i)})
    jumpTo = move =>{  this.setState({ model: this.state.model.jumpTo(move)})}


    //getStatus(current.squares)
    render(){
        const history = this.state.model.state.history;
        const current = history[this.state.model.state.stepNumber];

        return (
        <div className="game">
            <div className="game-board">
                <Board squares={current.squares}  onClick={(i) => this.handleClick(i) } />
            </div>
            <div className="game-info">
                <div>
                    { this.state.model.calculateWinner() ? 'Winner: ' + this.state.model.winner :
                        'Next player: ' + (this.state.model.state.xIsNext ? 'X' : 'O')
                          }
                </div>
                <ol>{
                    history.map((step, move) =>
                        <li key={move}><button onClick={() => this.jumpTo(move)}>
                            { 'Go to ' + (move ? 'move #'+move : 'game start') }
                        </button></li>)
                }</ol>
            </div>
        </div>
        );
    }
}



//=======================================================================================
//Global / App Style
export const GbApp ={ ...MyApp_Style, }

//My App
export const MyApp = () =><Game model={ new TicTacModel() } />
//=======================================================================================