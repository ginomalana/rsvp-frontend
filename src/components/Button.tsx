import type { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

const Button = ({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default Button;

const StyledButton = styled.button`
  height: 100%;
  cursor: pointer;
  outline: 0;
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 6px 12px;
  font-size: 1rem;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  color: #0d6efd;
  border-color: #0d6efd;
  &:hover {
    color: #fff;
    background-color: #0d6efd;
    border-color: #0d6efd;
  }
  &:disabled {
    background: #808080;
    color: white;
    border-color: #808080;
    opacity: 0.3;
    cursor: default;
  }
`;
