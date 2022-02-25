//=======================================================================================
//imports
import React, { Component } from "react";

//===================================================================================
//Square
const Square = props => 
    <button className="square" onClick={props.onClick}>{props.value} </button>

//Board
const Board = props =>
    <div>
        { [0,1,2].map( rw => 
            <div key={rw} className="board-row">
                { [0,1,2].map( cl => 
                    <Square key={rw * 3 + cl} value={ props.squares[rw * 3 + cl] }    onClick={ () => props.onClick(rw * 3 + cl) } />
                    )}
            </div>    
        ) }
    </div>

//Status
const Status = props =>
    props.winner ? 'Winner: ' + props.winner : 'Next player: ' + (props.xIsNext ? 'X' : 'O')

//GameView
const GameView = (IBoard, IStatus) => props => 
    <div className="game">
        <div className="game-board"> { IBoard( props ) } </div>
        <div className="game-info">  { IStatus( props ) } </div>
    </div> 

//=======================================================================================================
//Game
class Game extends React.Component {
    // Lifting State Up, Again
    constructor(props) {
        super(props);
        this.state = {            //Storing a History of Moves
            squares: Array(9).fill(null),
            xIsNext: true,
        };
      }

    // calculateWinner
    calculateWinner = () => {
        const squares = this.state.squares
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
            if ( squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    //
    tictacCell = i => {       
        const squares = this.state.squares.slice();
        if (this.calculateWinner() || squares[i]) return;
        squares[i] = this.state.xIsNext ? 'X' : 'O';

        this.setState({
          squares: squares,
          xIsNext: !this.state.xIsNext,
        });
      }

    //
    render = () => this.props.view({ 
        squares: this.state.squares,  onClick: (i) => this.tictacCell(i),
        winner: this.calculateWinner(), xIsNext: this.state.xIsNext,
    })
}

//=======================================================================================
//My App
export const MyApp = () =><Game view={GameView(Board, Status)} />

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
    
//Global / App Style
export const GbApp ={ ...MyApp_Style, }

//=======================================================================================