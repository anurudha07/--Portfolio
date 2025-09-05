import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

const Container = styled.section`
  max-width: 800px;
  margin: 80px auto;
  padding: 0 1rem;
`;

const Title = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  text-align: center;
  color: ${(props) => props.theme.colors.primary};
`;

const List = styled.ul`
  list-style: disc;
  padding-left: 1.5rem;
  margin: 0;
  color: ${(props) => props.theme.colors.text};
`;

const Item = styled(motion.li)`
  margin-bottom: 0.75rem;
  line-height: 1.4;
`;

const School = styled.span`
  font-weight: 50;
  color: ${(props) => props.theme.colors.primary};
  font-size: 1rem;
`;

const Degree = styled.span`
  font-weight: 50;
  font-size: 0.9rem;
`;

const Period = styled.span`
  color: ${(props) => props.theme.colors.subtext};
  font-size: 0.9rem;
`;

const Details = styled.span`
  color: ${(props) => props.theme.colors.subtext};
  font-size: 0.9rem;
`;

const educations = [
  {
    school: "MAKAUT University",
    degree: "B.Tech. in Computer Science",
    period: "Sep 2021 – June 2025",
    details: "Graduated with 8.1 CGPA",
  },
  {
    school: "The St. Xavier's School",
    degree: "Higher Secondary",
    period: "Jun 2019 – July 2021",
    details: "Passed out with 91% in ISC",
  },
];

const variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const Education = () => {
  const reduce = usePrefersReducedMotion();
  return (
    <Container
      as={motion.div}
      initial={reduce ? {} : "hidden"}
      animate={reduce ? {} : "visible"}
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
      transition={{ duration: 0.8 }}
    >
      <Title>Education</Title>
      <List>
        {educations.map((edu, idx) => (
          <Item
            key={idx}
            initial={reduce ? {} : "hidden"}
            animate={reduce ? {} : "visible"}
            variants={variants}
            transition={{ delay: idx * 0.15, duration: 0.5 }}
          >
            <School>{edu.school}</School> — <Degree>{edu.degree}</Degree> (
            <Period>{edu.period}</Period>)
            {edu.details && <> — <Details>{edu.details}</Details></>}
          </Item>
        ))}
      </List>
    </Container>
  );
};

export default Education;
