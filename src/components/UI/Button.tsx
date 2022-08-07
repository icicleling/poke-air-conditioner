import styled from "styled-components";

const Button = styled.button`
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
  border: none;
  border-radius: 99em;
  outline: none;
  box-shadow: 2px 2px 6px lightgray;
  user-select: none;
  padding: 6px 0;

  &:active {
    box-shadow: inset 2px 2px 6px lightgray;
  }
`;

export default Button;
