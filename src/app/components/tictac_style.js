//=======================================================================================
//Style
const MyApp_Style = {
    /*================================= Global Classes ======================================*/
    '*':{
        font: "24px 'Open Sans', sans-serif",
        border: '0px solid red',
        'box-sizing': 'border-box',
        width: '100%',
    },

    body:{
        width: '50%',
        margin: 'auto',
        'margin-top': 100,
        display: 'flex',
        'align-items': 'center'
    },

    button : {
        width: '40%',
        'border-bottom' : '1px solid #fff'
    },

    /*================================= Game Classes ======================================*/
    '.status':{
        'margin-bottom': 10,
        'margin-left': 10,
        color: 'red',
        'text-align': 'center'
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

    '.board':{
        width: 170, height: 170,
        margin: 20
    },

    '.game': {
        display: 'flex',
        'flex-direction': 'column',
        'align-items': 'center',
        width: '100%',
    },
}


export { MyApp_Style }