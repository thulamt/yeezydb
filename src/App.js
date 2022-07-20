import React from 'react';
import{BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavbarDefault from './NavbarDefault'
import Home from './Home'
import Models from './Models'
import ModelProfile from './ModelProfile'
import Ratings from './Ratings'
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
    <NavbarDefault />
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/models">
        <Models />
      </Route>
      <Route path="/models/:id">
        <ModelProfile />
      </Route>
      <Route path="/ratings/:id">
        <Ratings />
      </Route>
    </Switch>
    </Router>
  );
}

export default App;
