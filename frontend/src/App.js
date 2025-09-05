import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Education from './pages/Education';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Experience from './pages/Experience';

function App({ themeMode, toggleTheme }) {
  return (
    <>
      <Navbar themeMode={themeMode} toggleTheme={toggleTheme} />
      <main>
        <section id="home"><Home /></section>
        <section id="about"><About /></section>
        <section id="about"><Experience /></section>
        <section id="skills"><Skills /></section>
        <section id="projects"><Projects /></section>
        <section id="education"><Education /></section>
        <section id="contact"><Contact /></section>
      </main>
      <Footer />
    </>
  );
}

export default App;
