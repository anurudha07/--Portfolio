import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }
  html { scroll-behavior: smooth; }

  body {
    margin: 0;
    padding: 0;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: 'Inter', sans-serif;
    transition: background ${({ theme }) => theme.transition},
                color ${({ theme }) => theme.transition};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    cursor: ${({ theme }) => {
      const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24'><circle cx='12' cy='12' r='5' fill='${theme.colors.primary}'/></svg>`;
      return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}") 12 12, auto`;
    }};
  }

  /* Smooth theme transitions for common elements */
  body, button, input, textarea, a, select, label, header, footer, section, div {
    transition: background ${({ theme }) => theme.transition},
                color ${({ theme }) => theme.transition},
                border-color ${({ theme }) => theme.transition},
                box-shadow ${({ theme }) => theme.transition};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    body {
      cursor: auto; /* disable custom cursor on mobile */
      font-size: 14px;
    }
  }

  /* General link styles */
  a {
    text-decoration: none;
    color: inherit;
    position: relative;

    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -2px;
      width: 100%;
      height: 2px;
      background: ${({ theme }) => theme.colors.primary};
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.3s;
    }

    &:hover:after {
      transform: scaleX(1);
    }
  }

  /* Kill underline hover animation specifically for LinkButton */
  .no-underline:after {
    content: none !important;
  }

  ul, ol { margin: 0; padding: 0; list-style: none; }
  img { display: block; max-width: 100%; height: auto; }
  button { font-family: inherit; }

  /* Custom scrollbar */
  ::-webkit-scrollbar { width: 8px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 4px;
    transition: background ${({ theme }) => theme.transition};
  }
`;
