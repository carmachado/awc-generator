import React, { ButtonHTMLAttributes } from "react";

import { StyledButton } from "./styles";

const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <StyledButton type="button" {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;
