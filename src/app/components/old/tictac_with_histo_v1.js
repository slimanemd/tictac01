//=======================================================================================
//imports
import React, { Component } from "react";
import { MyApp_Style, calculateWinner as calWinner, Board } from "./tictac_shared";

//===================================================================================
//override
Square = props => 
<button className={ "square " + (props.value === 'X' && 'xplay' )  + " " +  (props.value === 'O' && 'oplay' ) }  onClick={props.onClick}>{props.value}</button>

//Status
const Status = props =>
    props.winner ? 'Winner: ' + props.winner : 'Next player: ' + (props.xIsNext ? 'X' : 'O')

//===============================================================================
//GameView
const GameView = (IBoard, IStatus) => props => 
    <div className="game">
        <div className="game-board"> { IBoard( props ) } </div>
        <div className="game-info">  { IStatus( props ) } </div>
    </div> 

//=======================================================================================================
//Game
class Game extends Component {
    // Lifting State Up, Again
    constructor(props) {
        super(props);
        this.state = { ...this.props.stat, s0: this.props.stat, }
      }

    // calculateWinner
    calculateWinner = () => calWinner(this.state.squares)

    //
    tictacCell = i => { 
        if(this.state.editable){      
            const squares = this.state.squares.slice();
            if (this.calculateWinner() || squares[i]) return;
            squares[i] = this.state.xIsNext ? 'X' : 'O';

            this.setState({
                squares: squares,
                xIsNext: !this.state.xIsNext,
            });
            this.props.onPlay(squares)
      }
    }

    //
    static getDerivedStateFromProps(props, state) {
        if( state.s0 === props.stat ) return state
        return { ...props.stat, s0: props.stat } ;
    }

    //
    render = () =>{
        return this.props.view({ 
            squares: this.state.squares,  onClick: (i) => this.tictacCell(i),
            winner: this.calculateWinner(), xIsNext: this.state.xIsNext,
    })}
}


//My App Game
let dx = Array(9).fill(null)
dx[0]='X'
const s00 = { xIsNext: false, squares: dx }

/* 
export const MyApp = () =><Game view={GameView(Board, Status)} onPlay={s => console.log(s)} 
    stat={ { ...s00, editable: false, s0: s00 }} />
*/

//=======================================================================================
class GameWithHistory extends Component {
    //
    constructor(props){
        super(props)
        this.state = {            
            history: [Array(9).fill(null)],  //Storing a History of Moves
            stepNumber: 0,
            stat: { xIsNext: false, squares: Array(9).fill(null), editable:true }
        };
    }

    //
    jumpTo = move => 
        this.setState({  stat: { 
            xIsNext: (move % 2) === 0, 
            squares: this.state.history[move], 
            editable: move === this.state.history.length-1 } 
    });

    //
    onPlay = squares => 
        this.setState({
            history: this.state.history.concat( [ squares ]),
            stepNumber: this.state.history.length,            //stat: { xIsNext: (step % 2) === 0, squares: Array(9).fill(null) }
          });

    //
    render = () =>{
        const XGame = this.props.game
        return <div>
            <XGame view={ this.props.view } onPlay={this.onPlay} stat={ this.state.stat } />
            <h1>XHello extended</h1>
            
            <ol>{
                this.state.history.map((step, move) =>
                <li key={move}><button onClick={() => this.jumpTo(move)}>
                        { 'Go to ' + (move ? 'move #'+move : 'game start') }
                    </button>
                    { '   -  ' + move + ' : ' +  step }</li>) 
            }</ol>
        </div>
    }
}

//My App 
export const MyApp = () =><GameWithHistory game={Game} view={GameView(Board, Status)} />

//=======================================================================================
//Style
const MyApp_Style = {
    
    '*':{
        font: "24px 'Open Sans', sans-serif",
    },


    body:{           
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
        background: '#78bec5',
        'border-radius': '8px',           
        color: '#fff',
        border: '2px solid #fff',
        
        cursor: 'pointer',

        float: 'left',

        'font-size': 34, //'font-weight': 'bold',
        width: 54, height: 54,

        'margin-right': '-1px',
        'margin-top': '-1px',
        padding: 0,
        
        'text-align': 'center',
        'text-shadow': '2px 2px 4px rgb(0 0 0 / 50%);'
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
//Style
const MyApp_Style2 = {
    ...MyApp_Style,
        
    '.xplay':{
        background: '#dc685a',
        
    },

    '.oplay':{
        background: '#ecaf4f',
    },
}

//Global / App Style
export const GbApp ={ ...MyApp_Style2, }

//=======================================================================================
