import React, { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const VoiceVisualizer = ({ isRecording }: { isRecording: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  useEffect(() => {
    if (isRecording) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        const audioContext = new AudioContext();
        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 64;
        source.connect(analyser);
        analyserRef.current = analyser;
        dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
      });
    } else {
      analyserRef.current = null;
      dataArrayRef.current = null;
    }
  }, [isRecording]);

  useFrame(() => {
    if (analyserRef.current && dataArrayRef.current && meshRef.current) {
      analyserRef.current.getByteFrequencyData(dataArrayRef.current);
      const avgFreq =
        dataArrayRef.current.reduce((sum, value) => sum + value, 0) /
        dataArrayRef.current.length;
      meshRef.current.scale.y = 1 + avgFreq / 50;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color={"cyan"} />
    </mesh>
  );
};

const VoiceAnimation = ({ isRecording }: { isRecording: boolean }) => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[2, 3, 4]} />
      <VoiceVisualizer isRecording={isRecording} />
    </Canvas>
  );
};

export default VoiceAnimation;
