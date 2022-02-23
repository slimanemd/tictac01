import React from "react";

//
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


//
function Square(props) {
    //
    return (
        <button className="square" onClick={() => this.props.onClick() }>
          {props.value}
        </button>
    )
}

//
class Board extends React.Component {
    constructor(props){
        super(props)
        this.state ={ squares: Array(9).fill(null) }
    }

    handleClick = i => {
        const squares = this.state.squares.slice()
        squares[i]='X'

        this.setState({ squares:squares })
    }

    renderSquare(i) {
        return <Square value={ this.state.squares[i] }    onClick={ () => this.handleClick(i) } />;
    }

    render() {
        const status = 'Next player: X';

        return (
        <div>
            <div className="status">{status}</div>
            { [0,1,2].map( rw => 
                <div className="board-row">
                    { [0,1,2].map( cl => this.renderSquare(rw * 3 + cl))}
                </div>    
            ) }
        </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
        <div className="game">
            <div className="game-board">
            <Board />
            </div>
            <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
            </div>
        </div>
        );
    }
}

// ========================================
  
//
export const GbApp ={ ...MyApp_Style, }

//
export const MyApp = () =><Game />