import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { DogsRouter } from "./Dogs/Router";
import { dogReducer, initialState } from "./Dogs/ducks/Dog.duck";

const store = createStore(dogReducer, initialState());

const App: React.FC = () => {
  return (
    <Provider store={store as any}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Redirect to="/dogs" />
          </Route>
          <Route path="/dogs">
            <DogsRouter />
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
