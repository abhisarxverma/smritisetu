// Web Audio API Synthesis for Dignified, Calm Acoustic Feedback (100% Offline, Zero Network Lag)

class AudioService {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopSpeech();
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Plays a warm, harmonic wooden bell / singing bowl chord for positive recall
  public playGentleChime(type: 'success' | 'encouragement' | 'transition' | 'rest') {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const masterGain = ctx.createGain();
      masterGain.connect(ctx.destination);

      if (type === 'success') {
        // Pentatonic warm bell: E4 (329.63Hz) -> G#4 (415.3Hz) -> B4 (493.88Hz)
        const freqs = [329.63, 415.3, 493.88, 659.25];
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);

          gain.gain.setValueAtTime(0, now + idx * 0.08);
          gain.gain.linearRampToValueAtTime(0.08, now + idx * 0.08 + 0.04);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 1.2);

          osc.connect(gain);
          gain.connect(masterGain);
          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 1.2);
        });
      } else if (type === 'encouragement') {
        // Soft calming warm interval: A3 (220Hz) -> C#4 (277.18Hz)
        [220, 277.18].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.12);

          gain.gain.setValueAtTime(0, now + idx * 0.12);
          gain.gain.linearRampToValueAtTime(0.06, now + idx * 0.12 + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.12 + 1.0);

          osc.connect(gain);
          gain.connect(masterGain);
          osc.start(now + idx * 0.12);
          osc.stop(now + idx * 0.12 + 1.0);
        });
      } else if (type === 'rest') {
        // Meditative singing bowl resonance: 174Hz (Solfeggio frequency of relaxation)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(174, now);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.12, now + 0.5);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);

        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(now);
        osc.stop(now + 3.5);
      } else {
        // Subtle transition swipe
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(261.63, now); // C4
        osc.frequency.exponentialRampToValueAtTime(329.63, now + 0.2);

        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(now);
        osc.stop(now + 0.25);
      }
    } catch {
      // Gracefully silent if Web Audio unavailable
    }
  }

  // Text-To-Speech using Web Speech API with fallback
  public speakText(text: string, lang: 'en' | 'as' | 'hi' = 'en', onEnd?: () => void) {
    if (this.isMuted) {
      if (onEnd) onEnd();
      return;
    }
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (onEnd) setTimeout(onEnd, 1500);
      return;
    }

    try {
      window.speechSynthesis.cancel(); // Stop any pending utterance
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.82; // Deliberate gentle pace for elderly auditory comprehension
      utterance.pitch = 1.0;

      // Select matching voice if available
      const voices = window.speechSynthesis.getVoices();
      let selectedVoice = voices.find(v => v.lang.includes('hi') || v.lang.includes('as'));
      if (!selectedVoice) {
        selectedVoice = voices.find(v => v.lang.includes('en-IN') || v.lang.includes('en-GB') || v.lang.includes('en'));
      }
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      utterance.onend = () => {
        if (onEnd) onEnd();
      };
      utterance.onerror = () => {
        if (onEnd) onEnd();
      };

      window.speechSynthesis.speak(utterance);
    } catch {
      if (onEnd) setTimeout(onEnd, 1000);
    }
  }

  public stopSpeech() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const audioService = new AudioService();
