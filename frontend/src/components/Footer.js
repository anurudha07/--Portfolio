import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Foot = styled.footer`
  width: 100%;
  /* make footer broader (taller) */
  min-height: 156px;
  padding: 1rem 1rem;
  background: ${props => props.theme.colors.glassBg};
  backdrop-filter: blur(10px);
  margin-top: 2rem;

  /* center contents and prevent children from pushing the text up */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  /* subtle top/bottom padding distribution keeps the text slightly higher visually */
  padding-top: 0.75rem;
  padding-bottom: 1.25rem;

  /* ensure no accidental horizontal overflow on small devices */
  box-sizing: border-box;
  overflow: hidden;
`;

/* main text style */
const Text = styled(motion.p)`
  margin: 0;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1;
  user-select: none;
`;

/* optional row for icons/links placed beneath the text so they don't push it */
const ExtrasRow = styled.div`
  display: flex;
  gap: 0.6rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 720px;
`;

/* individual icon wrapper if you add icons later */
const IconWrap = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.3rem;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const Footer = () => (
  <Foot>
    <Text
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      © {new Date().getFullYear()} @Anurudha. All rights reserved.
    </Text>

  </Foot>
);

export default Footer;
