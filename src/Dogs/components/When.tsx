import * as React from "react";

export interface IWhenProps {
  predicate?: boolean;
}

export const When: React.FC<IWhenProps> = ({ predicate = false, children }) => {
  return !predicate ? (
    <React.Fragment />
  ) : (
    <React.Fragment>{children}</React.Fragment>
  );
};
