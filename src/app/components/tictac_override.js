//=======================================================================================
//imports
import { MyApp, GbApp as ga, FW } from "./tictachisto.js";

//===================================================================================
//Square override
const Square_with_color = props => 
    <button className={ "square " + (props.value === 'X' && 'xplay' )  + " " +  (props.value === 'O' && 'oplay' ) }  
        onClick={props.onClick}>{props.value}</button>

//Status
const Status_french = props =>
    props.winner ? 'Winner: ' + props.winner : 'XJoueur suivant : ' + (props.xIsNext ? 'X' : 'O')

FW['square'] = Square_with_color
FW['status'] = Status_french

//=======================================================================================
//Style
const MyApp_Style2 = {
    '.xplay':{
        background: '#dc685a',
        
    },

    '.oplay':{
        background: '#ecaf4f',
    },
}

const GbApp= { ...ga, ...MyApp_Style2, }

//Global / App Style
export { MyApp, GbApp }  

//=======================================================================================
