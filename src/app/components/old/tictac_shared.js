import { Fragment } from "react";

//===================================================================================
//Square
const Square = props => 
    <button className="square" onClick={props.onClick}>{props.value} </button>

//Status
const Status = props =>
    props.winner ? 'Winner: ' + props.winner : 'Next player: ' + (props.xIsNext ? 'X' : 'O')

//Board FW['square']
const BaseBoard = IBoard => props =>
    <div>
        { [0,1,2].map( rw => 
            <div key={rw} className="board-row">
                { [0,1,2].map( cl => <Fragment key={rw * 3 + cl} >
                    { IBoard({ value: props.squares[rw * 3 + cl], onClick: () => props.onClick(rw * 3 + cl)}) }
                    </Fragment>
                    )}
            </div>    
        )}
    </div>


//Board
const Board =  BaseBoard(Square)

/*
const Board0 = props =>
    <div>
        { [0,1,2].map( rw => 
            <div key={rw} className="board-row">
                { [0,1,2].map( cl => 
                    <Square key={rw * 3 + cl} value={ props.squares[rw * 3 + cl] }    
                            onClick={ () => props.onClick(rw * 3 + cl) } /> )}
            </div>    
        ) }
    </div>
*/

//===============================================================================
//GameView
const GameView = (IBoard, IStatus) => props => 
    <div className="game">
        <div className="board"> { IBoard( props ) } </div>
        <div className="status">  { IStatus( props ) } </div>
    </div> 

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




export { MyApp_Style, calculateWinner, Board, Square, Status, BaseBoard, GameView }