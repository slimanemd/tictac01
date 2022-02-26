//
import { SheetsRegistry } from 'react-jss';
import jss from 'jss';
import preset from 'jss-preset-default';

//App
import { MyApp, GbApp } from './components/tictachisto';


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
////const App = () => <MyApp />
export default MyApp;
