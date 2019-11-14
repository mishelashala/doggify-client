import styled from "styled-components";
import * as colors from "../styles/colors";

export enum ButtonVariantTypes {
  PRIMARY = "PRIMARY",
  WARNING = "WARNING"
}

export interface IButtonProps {
  variant?: ButtonVariantTypes;
}

export const backgroundColor = (
  variant: ButtonVariantTypes = ButtonVariantTypes.PRIMARY
) => {
  return variant === ButtonVariantTypes.PRIMARY
    ? colors.PRIMARY_BLUE
    : colors.PRIMARY_RED;
};

export const Button = styled.button<IButtonProps>`
  background-color: ${props => backgroundColor(props.variant)};
  border: none;
  border-radius: 0.25rem;
  box-sizing: border-box;
  color: ${colors.WHITE};
  display: inline-block;
  font-family: arial;
  font-size: 0.7rem;
  padding: 0.75rem;

  &[disabled] {
    background-color: gray;
  }
`;
