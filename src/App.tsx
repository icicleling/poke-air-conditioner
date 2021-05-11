import React, { useState } from "react";
import styled from "styled-components";
import {
  ButtonSoundEffect,
  OnSoundEffect,
  OffSoundEffect,
} from "utils/soundEffect";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  // TODO: 保存到 localStorage
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
  max-width: 900px;
  min-width: 600px;
  height: 100vh;
  background: #fff;
  margin: 0 auto;
`;

const AirConditioner = styled.div`
  max-width: 460px;
  height: 140px;
  border: 3px lightgray solid;
  margin: 24px auto;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
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
  font-weight: 500;
  font-size: 16px;

  ${({ open }) =>
    open &&
    `
     color: #4fc5f3;
  `};
`;

const Button = styled.button`
  height: 50px;
  width: 50px;
  font-size: 24px;
`;

export default App;
