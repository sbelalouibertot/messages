import React from "react";
import "./App.scss";
import HeaderContainer from "../components/header/HeaderContainer";
import MessageDetailsContainer from "../components/realtors/message-details/MessageDetailsContainer";
import MessagesContainer from "../components/realtors/messages/MessagesContainer";
import { Redirect, Route } from "react-router-dom";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import RealtorsAppContainer from "../components/realtors/RealtorsAppContainer";

const App = () => (
  <Router>
    <div className="app">
      <HeaderContainer />
      <main className="app-content">
        <Switch>
          <Route path="/" exact>
            <Redirect to="/realtors" />
          </Route>
          <Route path="/realtors">
            <RealtorsAppContainer>
              <Route
                path="/realtors/:realtorId/:messages?"
                component={MessagesContainer}
              />
              <Route
                path="/realtors/:realtorId/messages/:messageId?"
                component={MessageDetailsContainer}
              />
            </RealtorsAppContainer>
          </Route>
          <Route path="/">
            <p className="error-message">
              Oups, quelque chose s'est mal passé... 🤕
            </p>
          </Route>
        </Switch>
      </main>
    </div>
  </Router>
);

export default App;
