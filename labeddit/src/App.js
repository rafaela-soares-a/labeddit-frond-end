
import GlobalState from "./contexts/globalState";
import { GlobalContext } from "./contexts/globalcontext";
import GlobalStyles from "./styles/global";


function App() {

  const context = GlobalState();
  
  return (
   <GlobalContext.Provider value={context}>
   <GlobalStyles />

   </GlobalContext.Provider>
  );
}

export default App;
