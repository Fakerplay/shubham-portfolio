let audioCtx: AudioContext | null = null;

export function playClickSound(volume = 0.12) {
  if (typeof window === "undefined") return;
  
  // Check localStorage mute preference
  const isMuted = localStorage.getItem("mute-clicks") === "true";
  if (isMuted) return;

  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    
    if (!audioCtx) return;
    
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    // Synthesis of a crisp, mechanical physical switch snap:
    // Oscillator sweeps rapidly from 1400Hz to 120Hz in 0.015s
    osc.type = "sine";
    osc.frequency.setValueAtTime(1400, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.015);

    // Gain envelope (instant snap attack, rapid decay)
    gain.gain.setValueAtTime(volume, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.015);

    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + 0.02);
  } catch (e) {
    console.warn("Web Audio API not supported or blocked", e);
  }
}
