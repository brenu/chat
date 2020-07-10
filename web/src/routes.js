import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//import Login from "./pages/login";
import Chat from "./pages/chat";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/chat" component={Chat} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
