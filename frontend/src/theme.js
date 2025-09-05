// theme.js
export const lightTheme = {
  transition: '400ms ease',
  colors: {
    primary: '#FF4D4D',
    accent: '#FF8787',
    background: '#f0f0f3',
    text: '#222',
    subtext: '#555',
    cardBg: 'rgba(255,255,255,0.6)',
    glassBg: 'rgba(255,255,255,0.2)',
    border: 'rgba(0,0,0,0.1)',
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px'
  }
};

export const darkTheme = {
  transition: '400ms ease',
  colors: {
    primary: '#1ABC9C',
    accent: '#16A085',
    background: '#121212',
    text: '#EEE',
    subtext: '#AAA',
    cardBg: 'rgba(18,18,18,0.6)',
    glassBg: 'rgba(255,255,255,0.1)',
    border: 'rgba(255,255,255,0.2)',
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px'
  }
};
