//=======================================================================================
//imports
import React, { Component } from "react";
import { MyApp_Style } from './tictac_style'
import { calculateWinner as calWinner, Square, Status, BaseBoard, GameView } from './old/tictac_shared'

//===================================================================================
const FW = {}

//===================================================================================
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
            //do action play i
            const squares = this.state.squares.slice();
            if (this.calculateWinner() || squares[i]) return;
            squares[i] = this.state.xIsNext ? 'X' : 'O';

            this.setState({
                squares: squares,
                xIsNext: !this.state.xIsNext,
            });

            //notify oobservers of action play i
            this.props.onPlay(squares)
        }
    }

    //update state before render
    static getDerivedStateFromProps(props, state) {
        if( state.s0 === props.stat ) return state
        return { ...props.stat, s0: props.stat } ;
    }

    //render
    render = () =>{
        return this.props.view({ 
            squares: this.state.squares,  onClick: (i) => this.tictacCell(i),
            winner: this.calculateWinner(), xIsNext: this.state.xIsNext,
    })}
}

//Test
//Default values
FW['square'] = Square
FW['status'] = Status
FW['board'] = BaseBoard(FW['square']) //Board
FW['gameview'] = GameView             //
FW['game'] = Game


//My App Game
let dx = Array(9).fill(null)
dx[0]='X'
const s00 = { xIsNext: false, squares: dx }

const MyApp = () =><Game view={FW['gameview'](FW['board'], FW['status'])} onPlay={s => console.log(s)} 
    stat={ { ...s00, editable: true, s0: s00 }} />
   
//=======================================================================================
//Global / App Style
const GbApp ={ ...MyApp_Style, }

//=======================================================================================
//exports
export { MyApp, GbApp, FW }

//=======================================================================================
