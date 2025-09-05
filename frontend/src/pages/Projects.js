import React, { useRef } from 'react';
import styled, { useTheme } from 'styled-components';
import { motion } from 'framer-motion';
import img3 from '../images/image3.png';
import img7 from '../images/image7.png';
import img8 from '../images/image8.png';
import Lottie from 'lottie-react';
import paperPlane from '../assets/developer-animation.json';

const AnimationWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: -160px;
  transform: translateX(-50%);
  width: 900px;
  height: 160px;
  z-index: 10;
  pointer-events: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 320px;
    height: 120px;
    top: -110px;
  }
`;

const Container = styled.section`
  max-width: 1100px;
  margin: 120px auto; /* reduced from 160 */
  padding: 0 1rem;
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin: 60px auto; /* much smaller on mobile */
    padding: 0 12px;
  }
`;

/* helper: small safe access for theme values */
const get = (theme, key, fallback) =>
  (theme && theme.colors && theme.colors[key]) ? theme.colors[key] : fallback;

const Note = styled.p`
  text-align: center;
  font-size: 0.9rem;
  color: ${({ theme }) => get(theme, 'subtext', theme.mode === 'dark' ? '#ddd' : '#444')};
  margin-bottom: 0.8rem;
  font-style: italic;
`;

const Title = styled.h2`
  font-size: 1.15rem;
  margin-bottom: 1rem;
  text-align: center;
  color: ${({ theme }) => get(theme, 'text', theme.mode === 'dark' ? '#fff' : '#000')};
`;

/* Grid — slightly wider cards */
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 320px); /* +20px wider */
  gap: 1rem;
  justify-content: center;
  justify-items: center;

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, 300px);
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    justify-items: stretch;
    padding: 0 12px;
    grid-auto-rows: 1fr; 
  }
`;

/* Card — slightly taller vertically */
const Card = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1.12; /* taller than a square */
  background: ${({ theme }) => get(theme, 'cardBg', 'rgba(255,255,255,0.9)')};
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => get(theme, 'border', 'rgba(0,0,0,0.08)')};
  box-shadow: ${({ theme }) => theme.mode === 'dark' ? '0 8px 24px rgba(0,0,0,0.6)' : '0 8px 24px rgba(0,0,0,0.06)'};
  perspective: 1000px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  @media (max-width: 640px) {
    aspect-ratio: initial;
    height: auto;
    padding-bottom: 10px;
  }

  &:hover { transform: translateY(-6px); }
`;

/* image area takes a bit more vertical space now (~45%) */
const ImgWrapper = styled.div`
  flex: 0 0 45%;
  height: 45%;
  overflow: hidden;
  background: linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0.06));
`;

/* small padding increase for content */
const CardContent = styled.div`
  flex: 1 1 55%;
  padding: 1rem; /* a tiny bit larger */
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  min-height: 0;
`;



const CardInner = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  transform-style: preserve-3d;
  transition: transform 0.45s ease;
`;


const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: ${({ theme }) => (theme.mode === 'dark' ? 'brightness(0.9) contrast(1.05)' : 'none')};
`;


const ProjectTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => get(theme, 'text', theme.mode === 'dark' ? '#fff' : '#000')};
  font-size: 0.86rem;
  line-height: 1.1;
  font-weight: 600;
`;

const Description = styled.p`
  color: ${({ theme }) => get(theme, 'subtext', theme.mode === 'dark' ? '#ddd' : '#444')};
  margin: 0;
  font-size: 0.72rem;
  flex-shrink: 0;
`;

const BulletList = styled.ul`
  margin: 0.2rem 0 0.6rem 1rem;
  padding: 0;
  color: ${({ theme }) => get(theme, 'subtext', theme.mode === 'dark' ? '#ddd' : '#444')};
  list-style: disc;
  font-size: 0.72rem;
  overflow: visible; 
`;

const BulletItem = styled.li`
  margin-bottom: 0.28rem;
  line-height: 1.2;
  font-size: .8rem;
`;

/* New: Tech/tag list as small boxes */
const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.45rem;
`;

const Tag = styled.span`
  padding: 0.28rem 0.5rem;
  font-size: 0.66rem;
  border-radius: 999px;
  background: ${({ theme }) => (theme.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)')};
  color: ${({ theme }) => get(theme, 'text', theme.mode === 'dark' ? '#fff' : '#000')};
  border: 1px solid ${({ theme }) => (theme.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)')};
  white-space: nowrap;
`;

const Links = styled.div`
  display: flex;
  gap: 0.4rem;
  margin-top: auto;
  align-items: center;
`;

/* BUTTONS: black background + white text in LIGHT mode; WHITE background + black text in DARK mode */
const LinkButton = styled.a.attrs({ className: 'no-underline' })`
  padding: 0.42rem 0.8rem;
  background: ${({ theme }) => (theme.mode === 'dark' ? '#fff' : '#000')};
  color: ${({ theme }) => (theme.mode === 'dark' ? '#000' : '#fff')};
  border-radius: 6px;
  font-size: 0.72rem;
  text-align: center;
  border: 1px solid
    ${({ theme }) => (theme.mode === 'dark' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)')};
  box-shadow: ${({ theme }) =>
    theme.mode === 'dark' ? '0 6px 16px rgba(0,0,0,0.3)' : '0 6px 16px rgba(0,0,0,0.08)'};
  cursor: pointer;
  text-decoration: none !important;
`;

/* short project list for demo - note `tech` is an array of skill strings */
const projectList = [
  {
    title: 'Rental',
    bullets: [
      'Production-grade rental marketplace with AWS cloud infrastructure, interactive property mapping, and advanced location-based search.'
    ],
    tech: ['Next.js', 'Typescript', 'PostgreSQL', 'Node',],
    image: img7,
    github: 'https://github.com/anurudha07/Rental'
  },
  {
    title: 'Noted | Minimal Note Taking',
    bullets: ['Redis-powered faster note taking, background reminder system. Schedule smartly increase productivity.'],
    tech: ['Next.js', 'Node.js', 'BullMQ'],
    image: img8,
    github: 'https://github.com/anuradha07/Noted',
    live: 'https://noted-5ahw.onrender.com/'
  },
  {
    title: 'Augbit | AI Email SaaS',
    bullets: ['AI email revolution with GPT-4 integration, real-time sync transform email management into an intelligent, automated experience.'],
    tech: ['Next.js','Stripe', 'openAI'],
    image: img3,
    github: 'https://github.com/anurudha07/Augbit',
    
  }
];

const Projects = () => {
  const theme = useTheme();
  const isDark = theme && theme.mode === 'dark';
  const cardRefs = useRef([]);
  const innerRefs = useRef([]);

  const handleMouseMove = (e, idx) => {
    const card = cardRefs.current[idx];
    const inner = innerRefs.current[idx];
    if (!card || !inner) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / 22).toFixed(2);
    const rotateY = (x / 22).toFixed(2);
    inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };
  const handleMouseLeave = (idx) => {
    const inner = innerRefs.current[idx];
    if (!inner) return;
    inner.style.transform = 'rotateX(0deg) rotateY(0deg)';
  };

  return (
    <Container aria-label="projects">
      <AnimationWrapper>
        <Lottie animationData={paperPlane} loop={true} style={{ width: '100%', height: '100%' }} />
      </AnimationWrapper>

      <Title>Projects</Title>
      <Note>I've built all kinds of stuff—from chill websites to some next-level web apps. here are a few of my favs.</Note>

      <Grid>
        {projectList.map((proj, idx) => (
          <Card
            key={idx}
            ref={(el) => (cardRefs.current[idx] = el)}
            onMouseMove={(e) => handleMouseMove(e, idx)}
            onMouseLeave={() => handleMouseLeave(idx)}
            role="article"
            aria-labelledby={`proj-title-${idx}`}
          >
            <CardInner ref={(el) => (innerRefs.current[idx] = el)}>
              {proj.image && (
                <ImgWrapper>
                  <CardImage src={proj.image} alt={proj.title} />
                </ImgWrapper>
              )}

              <CardContent>
                <ProjectTitle id={`proj-title-${idx}`}>{proj.title}</ProjectTitle>

                {proj.bullets && proj.bullets.length > 0 ? (
                  <BulletList>
                    {proj.bullets.map((b, i) => (
                      <BulletItem key={i}>{b}</BulletItem>
                    ))}
                  </BulletList>
                ) : (
                  <Description>{proj.description}</Description>
                )}

                {/* render tech tags as small boxes */}
                {proj.tech && proj.tech.length > 0 && (
                  <TagList aria-label={`technologies used in ${proj.title}`}>
                    {proj.tech.map((t, i) => (
                      <Tag key={i}>{t}</Tag>
                    ))}
                  </TagList>
                )}

                <Links>
                  {proj.github && (
                    <LinkButton href={proj.github} target="_blank" rel="noopener noreferrer">
                      Code
                    </LinkButton>
                  )}
                  {proj.live && (
                    <LinkButton href={proj.live} target="_blank" rel="noopener noreferrer">
                      Live
                    </LinkButton>
                  )}
                </Links>
              </CardContent>
            </CardInner>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};

export default Projects;
