// src/pages/Home.js
import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import coderAnimation from '../assets/coder.json'; // Lottie JSON animation file

/* ------------------ STYLES ------------------ */

/* Section — prevent horizontal and mobile vertical overflow */
const Section = styled.section`
  position: relative;
  width: 100%;
  min-height: 80vh;
  height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  cursor: none;

  /* stop horizontal overflow that causes right-shifts */
  overflow-x: hidden;
  /* on desktop allow natural vertical content, on mobile avoid extra page scroll */
  overflow-y: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: 70vh;
    height: auto;
    cursor: auto;
    /* crucial: hide any accidental extra scroll from decorative elements */
    overflow-x: hidden;
    overflow-y: hidden;
    padding-bottom: 28px;
  }
`;

/* AnimationWrapper — keep Lottie inside viewport so it doesn't add scroll */
const AnimationWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 50%;
  max-width: 500px;
  pointer-events: none;
  z-index: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    /* keep Lottie small and inside viewport to avoid vertical overflow */
    width: 52%;
    max-width: 260px;
    left: 50%;
    transform: translateX(-50%);
    right: auto;
    bottom: -2%;
    opacity: 0.95;
    z-index: 1;
    pointer-events: none;
  }
`;

/* Canvas for particle network - hidden on mobile to save vertical space & CPU */
const Canvas = styled.canvas`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;


/* Content overlay for text and CTA */
const ContentWrapper = styled(motion.div)`
  position: relative;
  z-index: 10; /* above animation */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 100%;
  padding: 2rem;
  transform: translateY(-18%);
  pointer-events: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    position: relative;
    left: auto;
    transform: translateY(0);
    width: calc(100% - 2.5rem);
    max-width: 720px;
    margin: 8px auto 0 auto;
    align-items: center;
    text-align: center;
    padding: 1rem 1.25rem;
    height: auto;
  }
`;

/* Gradient animation for title */
const gradientAnim = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Title = styled.h1`
  font-size: 2.4rem;
  margin: 0;
  line-height: 1.05;
  background: linear-gradient(270deg, #FF4D4D, #1ABC9C, #FF8787);
  background-size: 600% 600%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${gradientAnim} 8s ease infinite;

  /* fallback color to ensure visibility in browsers with poor clip support */
  color: ${({ theme }) => theme.colors.text};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 4rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.7rem;
    /* disable gradient clipping on tiny screens (some mobile browsers render it invisibly) */
    background: none;
    -webkit-background-clip: initial;
    -webkit-text-fill-color: initial;
    background-clip: initial;
    color: ${({ theme }) => theme.colors.text};
    font-weight: 700;
  }
`;

const Subtitle = styled.p`
  font-size: 1rem;
  margin-top: 0.75rem;
  color: ${({ theme }) => theme.colors.subtext};
  line-height: 1.3;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1.4rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.95rem;
    margin-top: 0.5rem;
  }
`;

/* Custom cursor (hidden on small devices) */
const CursorDot = styled.div`
  position: fixed;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  pointer-events: none;
  transform: translate(-50%, -50%);
  z-index: 30;
  transition: transform 0.08s ease-out;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

const Button = styled(motion.a)`
  display: inline-block;
  margin-top: 2rem;
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  pointer-events: auto;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: block;
    width: fit-content;
    margin: 1.2rem auto 0 auto; /* center on mobile */
    padding: 0.6rem 1rem;
  }
`;


const Home = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: null, y: null, radius: 120 });
  const [cursorPos, setCursorPos] = useState({ x: -50, y: -50 });

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth <= 480) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.clientWidth || canvas.width;
    let height = canvas.clientHeight || canvas.height;
    canvas.width = width;
    canvas.height = height;

    let rafId;

    const onResize = () => {
      width = canvas.clientWidth || canvas.width;
      height = canvas.clientHeight || canvas.height;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const onTouchMove = (e) => {
      const touch = e.touches && e.touches[0];
      if (!touch) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = touch.clientX - rect.left;
      mouseRef.current.y = touch.clientY - rect.top;
    };

    const onMouseOut = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('mouseout', onMouseOut);
    window.addEventListener('touchend', onMouseOut);

    class Particle {
      constructor(x, y, dx, dy, size) {
        Object.assign(this, { x, y, dx, dy, size, baseSize: size });
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.fill();
      }
      update() {
        this.x += this.dx;
        this.y += this.dy;
        if (this.x < 0 || this.x > width) this.dx *= -1;
        if (this.y < 0 || this.y > height) this.dy *= -1;
        if (mouseRef.current.x !== null) {
          const dist = Math.hypot(mouseRef.current.x - this.x, mouseRef.current.y - this.y);
          if (dist < mouseRef.current.radius) this.size = Math.min(this.baseSize * 4, this.size + 1);
          else if (this.size > this.baseSize) this.size -= 0.3;
        }
        this.draw();
      }
    }

    const initParticles = () => {
      particlesRef.current = [];
      const count = Math.max(20, Math.floor((width * height) / 12000));
      for (let i = 0; i < count; i++) {
        const size = Math.random() * 3 + 1;
        const x = Math.random() * (width - size * 2) + size;
        const y = Math.random() * (height - size * 2) + size;
        const dx = (Math.random() - 0.5) * 1.2;
        const dy = (Math.random() - 0.5) * 1.2;
        particlesRef.current.push(new Particle(x, y, dx, dy, size));
      }
    };

    const connectParticles = () => {
      for (let i = 0; i < particlesRef.current.length; i++) {
        const pA = particlesRef.current[i];
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const pB = particlesRef.current[j];
          const dist = Math.hypot(pA.x - pB.x, pA.y - pB.y);
          if (dist < 100) {
            ctx.strokeStyle = `rgba(255,255,255,${1 - dist / 100})`;
            ctx.beginPath();
            ctx.moveTo(pA.x, pA.y);
            ctx.lineTo(pB.x, pB.y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particlesRef.current.forEach((p) => p.update());
      connectParticles();
      rafId = requestAnimationFrame(animate);
      animationRef.current = rafId;
    };

    initParticles();
    animate();

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('mouseout', onMouseOut);
      window.removeEventListener('touchend', onMouseOut);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const mailto = `mailto:anurudhs567@gmail.com?subject=Hiring You as Full-Stack Engineer&body=Hi Anurudha,%0A%0ALet's connect!`;

  return (
    <Section>
      <Canvas ref={canvasRef} />
      <AnimationWrapper aria-hidden="true">
        <Lottie animationData={coderAnimation} loop />
      </AnimationWrapper>

      <ContentWrapper
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Title>Welcome, I’m Anurudha</Title>
        <Subtitle>Full Stack Engineer | Node · Next</Subtitle>
        <Button href={mailto} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          Hire Me
        </Button>
      </ContentWrapper>

      <CursorDot style={{ top: `${cursorPos.y}px`, left: `${cursorPos.x}px` }} />
    </Section>
  );
};

export default Home;
