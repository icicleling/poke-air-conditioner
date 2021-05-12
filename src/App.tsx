import React, { useState } from "react";
import styled from "styled-components";
import {
  ButtonSoundEffect,
  OnSoundEffect,
  OffSoundEffect,
} from "utils/soundEffect";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [temperature, setTemperature] = useState(0);

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
        <Temperature>{isOpen && <>温度: {temperature}</>}</Temperature>
        <Power open={isOpen}>〇</Power>
      </AirConditioner>

      <ButtonGroup>
        <Button onClick={toggleOpen}>🔴</Button>
        <Button onClick={add}>➕</Button>
        <Button onClick={minus}>➖</Button>
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
  box-shadow: 2px 6px 10px gray;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 200px;
`;

const Temperature = styled.div`
  text-align: right;
  padding: 0 24px;
`;

const Power = styled.div<{ open: boolean }>`
  position: absolute;
  right: 12px;
  bottom: 6px;
  color: lightgray;
  font-size: 16px;
  font-weight: 600;
  transition: color 0.5s ease-out;

  ${({ open }) =>
    open &&
    `
     color: #87d7f6;
     text-shadow: 0 0 4px;
  `};
`;

const Button = styled.button`
  height: 50px;
  width: 50px;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default App;
