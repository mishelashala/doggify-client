import * as React from "react";
import { Route, useRouteMatch } from "react-router-dom";
import { DogListViewFactory } from "./views/DogListView";
import { AdoptedDogListViewFactory } from "./views/AdoptedDogListView";
import { AxiosDogServiceFactory } from "./services/AxiosDogService";
import { CheckoutViewFactory } from "./views/CheckoutView";
import { NavBar } from "./components/NavBar";

const axiosDogService = AxiosDogServiceFactory();
const DogListView = DogListViewFactory(axiosDogService);
const AdoptedDogListView = AdoptedDogListViewFactory(axiosDogService);
const CheckoutView = CheckoutViewFactory(axiosDogService);

export const DogsRouter = () => {
  let match = useRouteMatch() as any;

  return (
    <React.Fragment>
      <NavBar />

      <Route exact path={`${match.path}`}>
        <DogListView />
      </Route>

      <Route path={`${match.path}/adopted`}>
        <AdoptedDogListView />
      </Route>

      <Route path={`${match.path}/checkout`}>
        <CheckoutView />
      </Route>
    </React.Fragment>
  );
};
