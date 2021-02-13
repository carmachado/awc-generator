import React, { ButtonHTMLAttributes } from "react";

import { StyledButton } from "./styles";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
}

const Button: React.FC<Props> = ({
  children,
  color,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <StyledButton color={color} type="button" {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;
