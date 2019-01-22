import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home"

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />
      </div>
    </Router>
  );
}

export default App;
