//
import { SheetsRegistry } from 'react-jss';
import jss from 'jss';
import preset from 'jss-preset-default';

//
import { MyApp, GbApp } from './tictac';


//==========================================================
//
const setupJss = () => {
  jss.setup(preset());
  const sheetsRegistry = new SheetsRegistry();
  const globalStyleSheet = jss.createStyleSheet({ '@global': GbApp }).attach();
  sheetsRegistry.add(globalStyleSheet);
  return sheetsRegistry;
}

//
const sheets = setupJss();

//============================================================
//
function App() {
  return (
    <MyApp />
  );
}

export default App;
