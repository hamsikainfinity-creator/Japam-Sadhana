// AudioContext singleton to prevent multiple contexts
let audioCtx: AudioContext | null = null;

const getAudioContext = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
};

/**
 * Generates a soft "Om-like" bell sound using oscillators.
 * It combines a fundamental frequency with harmonics and a soft attack/decay envelope.
 */
export const playOmSound = (duration: number = 4): Promise<void> => {
  return new Promise((resolve) => {
    try {
      const ctx = getAudioContext();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;
      const fundamental = 136.1; // C#3 approx (Om frequency)

      // Master Gain for volume control of this specific note
      const masterGain = ctx.createGain();
      masterGain.connect(ctx.destination);
      
      // Envelope
      masterGain.gain.setValueAtTime(0, now);
      masterGain.gain.linearRampToValueAtTime(0.3, now + 0.5); // Slow attack (0.5s)
      masterGain.gain.exponentialRampToValueAtTime(0.001, now + duration); // Long decay

      // Oscillator 1: Fundamental (Sine - Pure)
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.value = fundamental;
      osc1.connect(masterGain);

      // Oscillator 2: First Harmonic (lower volume, slightly detuned for richness)
      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle'; // Triangle adds soft harmonics
      osc2.frequency.value = fundamental * 2;
      const osc2Gain = ctx.createGain();
      osc2Gain.gain.value = 0.1; // Lower volume
      osc2.connect(osc2Gain);
      osc2Gain.connect(masterGain);

      // Oscillator 3: Sub-harmonic for depth
      const osc3 = ctx.createOscillator();
      osc3.type = 'sine';
      osc3.frequency.value = fundamental / 2;
      const osc3Gain = ctx.createGain();
      osc3Gain.gain.value = 0.15;
      osc3.connect(osc3Gain);
      osc3Gain.connect(masterGain);

      // Start all oscillators
      osc1.start(now);
      osc2.start(now);
      osc3.start(now);

      // Stop all after duration
      osc1.stop(now + duration);
      osc2.stop(now + duration);
      osc3.stop(now + duration);

      // Resolve promise after sound finishes
      setTimeout(() => {
        resolve();
      }, duration * 1000);

    } catch (e) {
      console.error("Audio generation failed", e);
      // Resolve anyway so the app logic continues
      resolve(); 
    }
  });
};
