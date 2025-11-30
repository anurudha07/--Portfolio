import React from "react";
import styled, { useTheme } from "styled-components";
import { motion } from "framer-motion";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

const Container = styled.section`
  max-width: 700px;
  margin: 60px auto;
  padding: 0 1rem;
`;

const Title = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 400;
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 1rem;
`;

const SkillCard = styled(motion.div)`
  background: ${({ theme }) => (theme.mode === 'dark' ? "#1e1e1e" : "#d3c0c092")};
  border: 1px solid ${({ theme }) => (theme.mode === 'dark' ? "#333" : "#000000ff")};
  padding: 0.6rem;
  border-radius: 10px;
  text-align: center;
  box-shadow: ${({ theme }) => (theme.mode === 'dark' ? "0 2px 6px rgba(0,0,0,0.5)" : "0 2px 6px rgba(0,0,0,0.08)")};
  display: flex;
  flex-direction: column;
  align-items: center;
  img { width: 24px; height: 24px; margin-bottom: 0.4rem; filter: ${({ theme }) => (theme.mode === 'dark' ? "invert(1) brightness(1.2)" : "none")}; }
  span { font-size: 0.7rem; font-weight: 500; color: ${({ theme }) => (theme.mode === 'dark' ? "#eaeaea" : "#333")}; }
`;

const skills = [
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/typescript.svg" },
  { name: "Next.js", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/nextdotjs.svg" },
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/nodedotjs.svg" },
  { name: "Prisma", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/prisma.svg" },
  { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/postgresql.svg" },
  { name: "AWS", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/amazonaws.svg" },
  { name: "MongoDB", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/mongodb.svg" },
  { name: "GitHub", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 250, damping: 18 } },
};

const Skills = () => {
  const reduce = usePrefersReducedMotion();
  const theme = useTheme();
  const dark = theme.mode === "dark";

  return (
    <Container>
      <Title dark={dark}>Skills</Title>
      <Grid
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {skills.map((skill, idx) => (
          <SkillCard
            key={idx}
            dark={dark}
            variants={itemVariants}
            whileHover={reduce ? {} : { scale: 1.05 }}
          >
            <img src={skill.logo} alt={skill.name} />
            <span>{skill.name}</span>
          </SkillCard>
        ))}
      </Grid>
    </Container>
  );
};

export default Skills;
