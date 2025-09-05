import React from 'react';
import styled from 'styled-components';
import { FaSun, FaMoon } from 'react-icons/fa';

const Toggle = styled.button`
  background: none; border: none; cursor: pointer; font-size: 1.25rem;
  color: ${props => props.theme.colors.primary};
  transition: transform 0.3s;
  &:hover { transform: rotate(20deg); }
`;

export default function ThemeToggle({ theme, toggleTheme }) {
  return (
    <Toggle onClick={toggleTheme} aria-label="Toggle theme">
      {theme === 'light' ? <FaMoon /> : <FaSun />}
    </Toggle>
  );
}
