import * as React from "react";
import { useSelector } from "react-redux";
import { NavBarContainer } from "../atoms/NavBarContainer";
import { NavBarLink } from "../atoms/NavBarLink";
import { IAppState } from "../ducks/Dog";
import { When } from "../components/When";
import { CheckoutContainer } from "../atoms/CheckoutContainer";
import { CheckoutCount } from "../atoms/CheckoutCount";

export const NavBar = () => {
  const basketCount = useSelector((store: IAppState) => store.basket.length);

  return (
    <NavBarContainer>
      <div />
      <div>
        <NavBarLink
          to="/dogs"
          exact
          activeStyle={{
            color: "purple"
          }}
        >
          DOGS
        </NavBarLink>
        <NavBarLink
          to="/dogs/adopted"
          activeStyle={{
            color: "purple"
          }}
        >
          ADOPTIONS
        </NavBarLink>
      </div>

      <CheckoutContainer>
        <NavBarLink
          to="/dogs/checkout"
          activeStyle={{
            color: "purple"
          }}
        >
          CHECKOUT{" "}
          <When predicate={basketCount > 0}>
            <CheckoutCount>{basketCount}</CheckoutCount>
          </When>
        </NavBarLink>
      </CheckoutContainer>
    </NavBarContainer>
  );
};
