"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CHORDS = [
  [220, 261.63, 329.63, 392],
  [174.61, 220, 261.63, 329.63],
  [130.81, 196, 246.94, 329.63],
  [196, 246.94, 293.66, 369.99],
];
const BEAT = 3.2;

export function useAmbient() {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const busRef = useRef<AudioNode | null>(null);
  const timerRef = useRef<number | null>(null);
  const stepRef = useRef(0);

  const playChord = useCallback((at: number) => {
    const ctx = ctxRef.current;
    const bus = busRef.current;
    if (!ctx || !bus) return;
    const notes = CHORDS[stepRef.current % CHORDS.length];
    stepRef.current += 1;
    [...notes, notes[0] / 2].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const env = ctx.createGain();
      osc.type = i === notes.length ? "sine" : "triangle";
      osc.frequency.value = freq;
      osc.detune.value = (i % 2 ? 1 : -1) * 6;
      env.gain.setValueAtTime(0, at);
      env.gain.linearRampToValueAtTime(i === notes.length ? 0.22 : 0.09, at + 1.1);
      env.gain.linearRampToValueAtTime(0, at + BEAT + 1.4);
      osc.connect(env).connect(bus);
      osc.start(at);
      osc.stop(at + BEAT + 1.5);
    });
  }, []);

  const start = useCallback(() => {
    if (!ctxRef.current) {
      const ctx = new AudioContext();
      const master = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      const delay = ctx.createDelay();
      const feedback = ctx.createGain();
      filter.type = "lowpass";
      filter.frequency.value = 1400;
      delay.delayTime.value = 0.42;
      feedback.gain.value = 0.32;
      filter.connect(master);
      filter.connect(delay);
      delay.connect(feedback).connect(delay);
      delay.connect(master);
      master.gain.value = 0;
      master.connect(ctx.destination);
      ctxRef.current = ctx;
      masterRef.current = master;
      busRef.current = filter;
    }
    const ctx = ctxRef.current;
    const master = masterRef.current!;
    void ctx.resume();
    const now = ctx.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setValueAtTime(master.gain.value, now);
    master.gain.linearRampToValueAtTime(0.5, now + 1.5);
    playChord(now + 0.05);
    timerRef.current = window.setInterval(() => playChord(ctx.currentTime + 0.05), BEAT * 1000);
    setPlaying(true);
  }, [playChord]);

  const stop = useCallback(() => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = null;
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (ctx && master) {
      const now = ctx.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setValueAtTime(master.gain.value, now);
      master.gain.linearRampToValueAtTime(0, now + 0.8);
    }
    setPlaying(false);
  }, []);

  useEffect(
    () => () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      void ctxRef.current?.close();
    },
    [],
  );

  return { playing, start, stop, toggle: () => (playing ? stop() : start()) };
}
