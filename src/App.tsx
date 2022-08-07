import { Button } from "components/UI";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { powerOnTime } from "utils/constants";
import {
  ButtonSoundEffect,
  OnSoundEffect,
  OffSoundEffect,
  AirConditionerSoundEffect,
  volumeFadeIn,
  volumeFadeOut,
} from "utils/soundEffect";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [temperature, setTemperature] = useState(23);

  const audioContextRef = useRef<AudioContext>();

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
      setIsOpen(false);
      volumeFadeOut(AirConditionerSoundEffect).then(() => {
        audioContextRef.current?.suspend();
      });
      return;
    }

    OnSoundEffect.play();
    audioContextRef.current?.resume();

    if (AirConditionerSoundEffect.paused === true) {
      AirConditionerSoundEffect.volume = 0;
      AirConditionerSoundEffect.loop = true;
      AirConditionerSoundEffect.play();
    }

    setIsOpen(true);
    volumeFadeIn(AirConditionerSoundEffect);
  };

  useEffect(() => {
    if (audioContextRef.current) return;
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();

    const source = audioContext.createMediaElementSource(
      AirConditionerSoundEffect
    );
    source.connect(audioContext.destination);
    audioContextRef.current = audioContext;

    return () => {
      source.disconnect(audioContext.destination);
      audioContext.close();
    };
  }, []);

  return (
    <Root>
      <AirConditioner>
        <Temperature disabled={!isOpen}>
          {isOpen ? temperature : "00"}
          <TemperatureSymbol>℃</TemperatureSymbol>
        </Temperature>
        <Power open={isOpen}>〇</Power>
        <AirOutlet>
          <Shutter open={isOpen} />
        </AirOutlet>
      </AirConditioner>

      <Controller>
        <ButtonGroup>
          <PowerButton onClick={toggleOpen}>🔴</PowerButton>
          <AddButton onClick={add}>➕</AddButton>
          <MinusButton onClick={minus}>➖</MinusButton>
        </ButtonGroup>
        <Brand>Pocket-AC</Brand>
      </Controller>
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

const Controller = styled.div`
  padding: 24px;
  margin: 0 auto;
  position: fixed;
  bottom: 5em;
  left: 0;
  right: 0;
  max-width: 300px;
  box-shadow: inset 0px 0px 6px darkgrey;
  border-radius: 8px;
`;

const Brand = styled.div`
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  color: darkgray;
`;

const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 24px;
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

const PowerButton = styled(Button)`
  grid-column-start: 1;
  grid-column-end: 3;
`;

const AddButton = styled(Button)``;
const MinusButton = styled(Button)`
  grid-column-start: 3;
`;

const AirOutlet = styled.div`
  height: 20px;
  background: #333;
  position: absolute;
  bottom: 0;
  width: 80%;
  margin-left: 16px;
  border-radius: 2px 2px 0 0;
  perspective: 900px;
`;

const Shutter = styled.div<{ open: boolean }>`
  height: 18px;
  background: #f8f8f8;
  border-radius: 2px 2px 0 0;
  margin: 2px 2px 0;
  transform: rotateX(0deg);
  transform-style: preserve-3d;
  transform-origin: 0 16px;
  border: 1px solid lightgray;
  transition: transform ${powerOnTime}s linear;

  ${({ open }) =>
    open &&
    `
    transform: rotateX(-160deg);
  `}
`;

export default App;
