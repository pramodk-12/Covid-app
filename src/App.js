import React, { useContext } from "react";
import './App.css';
import {Redirect, Route,Switch} from "react-router-dom";
import Covid from "./Pages/Covid"
import {StateContext} from "./Components/Context/Contextprovider";
import Loading from "./Components/Loading/Loading"

function App() {
  const context = useContext(StateContext)
  return (
    <div className="home" >
      {context.loading ? <Loading /> : 
      <Switch>
          <Route exact path="/">
            <Redirect to="/covid-app" />
          </Route>
          <Route path="/covid-app">
            <Covid />
          </Route>
      </Switch> }
    </div>
  );
}

export default App;
