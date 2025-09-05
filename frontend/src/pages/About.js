import React from 'react'; 
import styled from 'styled-components'; 
import { motion } from 'framer-motion'; 
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

const Container = styled(motion.section)`
  max-width:800px;
  margin: 60px auto; /* reduce from 80 */
  padding:0 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin: 36px auto;
  }
`;

const Title = styled(motion.h2)`
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
  color: ${props => props.theme.colors.primary};
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
  font-size: 1.4rem; /* reduced for mobile */
  margin-bottom: 0.6rem;
  }

`;

const Content = styled(motion.p)`line-height:1.6;color:${props => props.theme.colors.subtext};text-align:center;`;
const DownloadButton = styled(motion.a)`display:inline-block;padding:0.25rem 0.5rem;font-size:0.875rem;color:${props => props.theme.colors.primary};border:1px solid ${props => props.theme.colors.primary};border-radius:2px;text-decoration:none;cursor:pointer;background:transparent;transition:all 0.2s ease-in-out;&:hover{background:${props => props.theme.colors.primary};color:#fff;}`;
const ButtonContainer = styled(motion.div)`display:flex;justify-content:center;margin-top:1rem;`;

const containerVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, when: 'beforeChildren', staggerChildren: 0.1 } } };
const titleVariants = { hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const contentVariants = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const buttonVariants = { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } }, hover: { scale: 1.05 }, tap: { scale: 0.95 } };

const About = () => {
  const reduce = usePrefersReducedMotion();
  return (
    <Container
      variants={containerVariants}
      initial={reduce ? {} : 'hidden'}
      animate={reduce ? {} : 'visible'}
    >
      <Title variants={titleVariants}>{'About Me'}</Title>
      <Content variants={contentVariants}>
        I am Full-Stack Developer leveraging Node backend with Next.js frontend utilizing PostgreSQL/MongoDB for database management. I build aps from fast MVPs to scalable enterprise applications. I can contribute to your team immediately, find my cv at your convenience.
      </Content>
      <ButtonContainer variants={contentVariants}>
        <DownloadButton
         href={`${process.env.PUBLIC_URL}/Anurudha_Sarkar_resume.pdf`}
         download
         variants={buttonVariants}
         whileHover={reduce ? {} : 'hover'}
         whileTap={reduce ? {} : 'tap'}
      >
         Download CV
      </DownloadButton>

      </ButtonContainer>
    </Container>
  );
};

export default About;
