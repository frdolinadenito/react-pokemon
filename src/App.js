import React from "react";
import { Switch, Route } from "react-router-dom";

// Import Pages
import ListPokemon from "./pages/listPokemonPage/ListPokemon.js";

export default function App() {
  return (
    // <ThemeProvider theme={theme}>
    //   <CssBaseline />
      <div>
       
        <Switch>
          <Route path="/" component={ListPokemon} exact />
           {/* <Route path="/detailpokemon" component={DetailPokemon} /> */}
          {/*<Route path="/listseries" component={ListSeriesScreen} />
          <Route path="/errorscreen" component={ErrorScreen} /> */}
        </Switch>
        
      </div>
    // </ThemeProvider>
  );
}
