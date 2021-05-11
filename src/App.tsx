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
        <div>电源: {isOpen && "*"}</div>
        <div>温度: {temperature}</div>
      </AirConditioner>

      <ButtonGroup>
        <button onClick={toggleOpen}>🔴</button>
        <button onClick={add}>➕</button>
        <button onClick={minus}>➖</button>
      </ButtonGroup>
    </Root>
  );
}

const Root = styled.div`
  height: 100vh;
  background: #fff;
`;

const AirConditioner = styled.div`
  height: 150px;
`;

const ButtonGroup = styled.div`
  & > button:not(:first-child) {
    margin-left: 24px;
  }
`;

export default App;
