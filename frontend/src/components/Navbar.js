import React from "react";
import styled from "styled-components";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaMoon,
  FaSun,
  FaHome,
  FaFileDownload,
} from "react-icons/fa";

const Box = styled.div`
  position: fixed;
  top: 25%;
  right: 1rem;
  transform: translateY(-40%);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: ${({ theme }) => theme.colors.cardBg};
  padding: 0.9rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  z-index: 1000;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    top: auto;
    bottom: 1rem;
    right: 50%;
    transform: translateX(50%);
    flex-direction: row;
    gap: 0.9rem;
    padding: 0.6rem 0.9rem;
    width: auto;
    border-radius: 999px;
  }
`;


const IconLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.2rem;
  height: 2.2rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.3rem;
  transition: color 0.3s;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.2rem;
  height: 2.2rem;
  background: none;
 border: none;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;


const SocialBox = ({ themeMode, toggleTheme }) => {
  return (
    <Box>
      {/* Home */}
      <IconLink href="#home">
        <FaHome />
      </IconLink>

      {/* Resume Download */}
      <IconLink
      href="/Anurudha_Sarkar_resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
      >
        <FaFileDownload />
      </IconLink>




      {/* GitHub */}
      <IconLink
        href="https://github.com/anurudha07"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaGithub />
      </IconLink>

      {/* LinkedIn */}
      <IconLink
        href="https://www.linkedin.com/in/anurudha-sarkar-3b77ab228/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaLinkedin />
      </IconLink>

      {/* Email */}
      <IconLink href="mailto:anurudhs567@gmail.com">
        <FaEnvelope />
      </IconLink>

      {/* Theme Switch */}
      <ToggleButton onClick={toggleTheme}>
        {themeMode === "dark" ? <FaSun /> : <FaMoon />}
      </ToggleButton>
    </Box>
  );
};

export default SocialBox;
