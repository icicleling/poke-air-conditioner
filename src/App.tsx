import React, { useState } from "react";
import styled from "styled-components";
import {
  ButtonSoundEffect,
  OnSoundEffect,
  OffSoundEffect,
} from "utils/soundEffect";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [temperature, setTemperature] = useState(23);

  const add = () => {
    if (!isOpen) return;

    ButtonSoundEffect.currentTime = 0;
    ButtonSoundEffect.play();
    setTemperature(temperature + 1);
  };

  const minus = () => {
    if (!isOpen) return;

    ButtonSoundEffect.currentTime = 0;
    ButtonSoundEffect.play();
    setTemperature(temperature - 1);
  };

  const toggleOpen = () => {
    if (isOpen) {
      OffSoundEffect.play();
    } else {
      OnSoundEffect.play();
    }
    setIsOpen(!isOpen);
  };

  return (
    <Root>
      <AirConditioner>
        <Temperature disabled={!isOpen}>
          {isOpen ? temperature : "00"}
          <TemperatureSymbol>℃</TemperatureSymbol>
        </Temperature>
        <Power open={isOpen}>〇</Power>
      </AirConditioner>

      <ButtonGroup>
        <PowerButton onClick={toggleOpen}>🔴</PowerButton>
        <AddButton onClick={add}>➕</AddButton>
        <MinusButton onClick={minus}>➖</MinusButton>
      </ButtonGroup>
    </Root>
  );
}

const Root = styled.div`
  max-width: 600px;
  height: 100vh;
  background: #fff;
  margin: 0 auto;
`;

const AirConditioner = styled.div`
  width: calc(100% - 48px);
  min-width: 320px;
  max-width: 460px;
  height: 120px;
  border: 3px lightgray solid;
  margin: 24px auto;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  box-shadow: 4px 6px 12px #808080cc;
`;

const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  height: 200px;
  gap: 24px;
  padding: 42px 24px 0;
  margin: 0 auto;
`;

const Temperature = styled.div<{ disabled: boolean }>`
  padding: 0 24px;
  font-family: "DigitalDisplay";
  font-size: 24px;
  color: var(--color-blue);
  display: flex;
  justify-content: flex-end;
  text-shadow: 0 0 2px;
  transition: color 0.5s ease-out;

  ${({ disabled }) =>
    disabled &&
    `
    color: lightgray;
    text-shadow: none;
  `}
`;

const TemperatureSymbol = styled.div`
  font-size: 12px;
  position: relative;
  top: -2px;
  margin-left: 2px;
`;

const Power = styled.div<{ open: boolean }>`
  position: absolute;
  right: 12px;
  bottom: 6px;
  color: lightgray;
  font-size: 14px;
  font-weight: 600;
  transition: color 0.5s ease-out;

  ${({ open }) =>
    open &&
    `
     color: var(--color-blue);
     text-shadow: 0 0 4px;
  `};
`;

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

  &:active {
    box-shadow: inset 2px 2px 6px lightgray;
  }
`;

const PowerButton = styled(Button)`
  grid-column-start: 1;
  grid-column-end: 3;
`;

const AddButton = styled(Button)``;
const MinusButton = styled(Button)`
  grid-column-start: 3;
`;

export default App;
