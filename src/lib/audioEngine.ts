let audioContext: AudioContext | null = null;
let oscillator: OscillatorNode | null = null;
let gainNode: GainNode | null = null;
let binauralOsc: OscillatorNode | null = null;
let binauralGain: GainNode | null = null;

function getContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
}

export function playFrequency(hz: number, volume = 0.3) {
  stopFrequency();
  const ctx = getContext();

  if (ctx.state === "suspended") {
    void ctx.resume();
  }

  // Main oscillator
  oscillator = ctx.createOscillator();
  gainNode = ctx.createGain();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(hz, ctx.currentTime);
  gainNode.gain.setValueAtTime(0, ctx.currentTime);
  gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.5);
  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);
  oscillator.start();

  // For very low frequencies (<20Hz), add a carrier tone so user can "hear" it as binaural beat
  if (hz < 20) {
    const carrierHz = 200;
    binauralOsc = ctx.createOscillator();
    binauralGain = ctx.createGain();
    binauralOsc.type = "sine";
    binauralOsc.frequency.setValueAtTime(carrierHz + hz, ctx.currentTime);
    binauralGain.gain.setValueAtTime(0, ctx.currentTime);
    binauralGain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.5);
    binauralOsc.connect(binauralGain);
    binauralGain.connect(ctx.destination);
    binauralOsc.start();

    // Change the main oscillator to the base carrier
    oscillator.frequency.setValueAtTime(carrierHz, ctx.currentTime);
  }
}

export function stopFrequency() {
  const ctx = audioContext;
  if (gainNode && oscillator && ctx) {
    gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);
    const osc = oscillator;
    setTimeout(() => { try { osc.stop(); } catch {} }, 400);
  }
  if (binauralGain && binauralOsc && ctx) {
    binauralGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);
    const osc = binauralOsc;
    setTimeout(() => { try { osc.stop(); } catch {} }, 400);
  }
  oscillator = null;
  gainNode = null;
  binauralOsc = null;
  binauralGain = null;
}

export function setVolume(vol: number) {
  const ctx = audioContext;
  if (gainNode && ctx) {
    gainNode.gain.linearRampToValueAtTime(vol, ctx.currentTime + 0.1);
  }
  if (binauralGain && ctx) {
    binauralGain.gain.linearRampToValueAtTime(vol, ctx.currentTime + 0.1);
  }
}
