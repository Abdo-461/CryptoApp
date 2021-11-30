import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./components/Layout/NavBar";
import CoinPagination from "./components/CoinPagination";
import CoinFilter from "./components/CoinFilter";

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={CoinPagination} />
          <Route exact path="/filter" component={CoinFilter} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
