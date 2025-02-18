"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create particles with gradient colors
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 8000;
    const posArray = new Float32Array(particlesCount * 3);
    const velocityArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);

    const color1 = new THREE.Color('#4a90e2');  // Blue
    const color2 = new THREE.Color('#50e3c2');  // Teal
    const color3 = new THREE.Color('#b8e986');  // Light Green

    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Create a more spread out initial position
      posArray[i] = (Math.random() - 0.5) * 50;      // x
      posArray[i + 1] = (Math.random() - 0.5) * 50;  // y
      posArray[i + 2] = (Math.random() - 0.5) * 50;  // z
      
      // Dynamic velocity
      velocityArray[i] = (Math.random() - 0.5) * 0.08;
      velocityArray[i + 1] = (Math.random() - 0.5) * 0.08;
      velocityArray[i + 2] = (Math.random() - 0.5) * 0.08;

      // Gradient colors
      const mixRatio1 = Math.random();
      const mixRatio2 = Math.random();
      const particleColor = new THREE.Color()
        .copy(color1)
        .lerp(color2, mixRatio1)
        .lerp(color3, mixRatio2);

      colorsArray[i] = particleColor.r;
      colorsArray[i + 1] = particleColor.g;
      colorsArray[i + 2] = particleColor.b;
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colorsArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 5;

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - windowHalfX) * 0.0003;
      mouseY = (event.clientY - windowHalfY) * 0.0003;
    };

    document.addEventListener('mousemove', handleMouseMove);

    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      targetX = mouseX * 0.5;
      targetY = mouseY * 0.5;

      particlesMesh.rotation.y += (targetX - particlesMesh.rotation.y) * 0.05;
      particlesMesh.rotation.x += (targetY - particlesMesh.rotation.x) * 0.05;

      // Update particle positions with wave-like movement
      const positions = particlesGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        // Complex wave pattern
        positions[i] += velocityArray[i] * Math.sin(time * 0.5 + i * 0.001) * delta * 15;
        positions[i + 1] += velocityArray[i + 1] * Math.cos(time * 0.3 + i * 0.002) * delta * 15;
        positions[i + 2] += velocityArray[i + 2] * Math.sin(time * 0.4 + i * 0.001) * delta * 15;

        // Smooth boundary transitions
        const bound = 25;
        for (let j = 0; j < 3; j++) {
          const idx = i + j;
          if (Math.abs(positions[idx]) > bound) {
            positions[idx] = Math.sign(positions[idx]) * bound;
            velocityArray[idx] *= -1;
          }
        }
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener('mousemove', handleMouseMove);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <>
      <div ref={containerRef} className="fixed inset-0 -z-10" />
      <div className="gradient-overlay" />
    </>
  );
}