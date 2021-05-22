export const ButtonSoundEffect = new Audio("/assets/sound_effect/button.mp3");
export const OnSoundEffect = new Audio("/assets/sound_effect/on.mp3");
export const OffSoundEffect = new Audio("/assets/sound_effect/off.mp3");
export const AirConditionerSoundEffect = new Audio(
  "/assets/sound_effect/air_conditioner.ogg"
);

let prevIntervalId: number;

export const volumeFadeIn = (audio: HTMLAudioElement) => {
  return new Promise<void>((res, rej) => {
    clearInterval(prevIntervalId);
    const intervalId = window.setInterval(() => {
      if (audio.volume >= 1) {
        clearInterval(intervalId);
        res();
        return;
      }

      audio.volume = Number(audio.volume.toFixed(2)) + 0.01;
    }, 50);
    prevIntervalId = intervalId;
  });
};

export const volumeFadeOut = (audio: HTMLAudioElement) => {
  clearInterval(prevIntervalId);
  return new Promise<void>((res, rej) => {
    const intervalId = window.setInterval(() => {
      if (audio.volume <= 0) {
        clearInterval(intervalId);
        res();
        return;
      }

      audio.volume = Number(audio.volume.toFixed(2)) - 0.01;
    }, 80);
    prevIntervalId = intervalId;
  });
};
