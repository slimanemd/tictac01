//=======================================================================================
//imports
import { Component } from "react";
import { FW, GbApp } from './tictac'

//=======================================================================================
class GameWithHistory extends Component {
    //constructor
    constructor(props){
        super(props)
        this.state = {            
            history: [Array(9).fill(null)],  //Storing a History of Moves
            stepNumber: 0,
            stat: { xIsNext: false, squares: Array(9).fill(null), editable:true }
        };
    }

    //jumpTo
    jumpTo = move => 
        this.setState({  stat: { 
            xIsNext: (move % 2) === 0, 
            squares: this.state.history[move], 
            editable: move === this.state.history.length-1 } 
    });

    //onPlay
    onPlay = squares => 
        this.setState({
            history: this.state.history.concat( [ squares ]),
            stepNumber: this.state.history.length,
          });

    //render  { (new this.props.game({ view: this.props.view, onPlay: this.onPlay, stat: this.state.stat })).render() }
    render = () =>{ 
        const XGame = this.props.game
        return <div>    
            <XGame view={ this.props.view } onPlay={this.onPlay} stat={ this.state.stat } />
            <h1>Goto move :</h1>
            
            <ol>{
                this.state.history.map((step, move) =>
                <li key={move}><button onClick={() => this.jumpTo(move)}>
                        { '' + (move ? '#'+move : 'start') }
                    </button>
                    <span>{ '   -  ' + move + ' : ' +  step }</span></li>)
            }</ol>
        </div>
    }
}

//My App 
const MyApp = () =><GameWithHistory 
                        game={FW['game']} 
                        view={FW['gameview'](FW['board'], FW['status'])} />
   
//=======================================================================================
//exports
export { MyApp, GbApp, FW }

//=======================================================================================

