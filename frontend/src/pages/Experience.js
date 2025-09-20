import React from "react";
import styled, { useTheme } from "styled-components";
import { motion } from "framer-motion";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";
import dbsLight from "../assets/logos/dbs-light.png";
import dbsDark from "../assets/logos/dbs-dark.png";

// ---------- Styled ----------
const Container = styled.section`
  max-width: 800px;
  margin: 70px auto;
  padding: 0 1rem;
`;

const Title = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 400;
  color: ${(props) => props.theme.colors.text};
`;

const Logo = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  display: block;

  /* tiny neutral badge so logo never disappears on extreme backgrounds */
  background: ${(p) => (p.theme?.mode === "light" ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.12)")};
  padding: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  border: 1px solid ${(p) => (p.theme?.mode === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)")};

  @media (max-width: 600px) {
    width: 30px;
    height: 30px;
    padding: 3px;
  }
`;

const Job = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  gap: 1rem;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.6rem;
  }
`;

const Left = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  flex: 1;
`;

const Info = styled.div`
  flex: 1;
`;

/* Company stays the same */
const Company = styled.h3`
  font-size: 0.95rem;
  margin: 0;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text};
`;

/* Role style preserved exactly (no font-size/style change) */
const Role = styled.p`
  font-size: 0.85rem;
  color: ${(props) => props.theme.colors.subtext};
  margin: 0.2rem 0 0;
`;

/* Location uses same style as Role (keeps font and look identical) but on the next line */
const Location = styled(Role)`
  margin-top: 0.18rem;
`;

/* Bullets unchanged */
const Bullets = styled.ul`
  margin: 0.3rem 0 0;
  padding-left: 1rem;
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.subtext};
  line-height: 1.35;
  list-style-type: disc;

  li {
    margin-bottom: 0.15rem;
  }
`;

const Dates = styled.div`
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.subtext};
  white-space: nowrap;
  min-width: 100px;
  text-align: right;

  @media (max-width: 600px) {
    display: none;
  }
`;

const MobileDates = styled.div`
  display: none;

  @media (max-width: 600px) {
    display: block;
    font-size: 0.8rem;
    color: ${(props) => props.theme.colors.subtext};
    margin-bottom: 0.4rem;
  }
`;

// ---------- Data ----------
const jobs = [
  {
    company: "Freelance",
    role: "Full Stack Developer",
    location: "India · Remote",
    duration: "Aug 2025 – Present",
    logoLight: dbsLight,
    logoDark: dbsDark,
    bullets: [
      "Developed an Inventory Management Dashboard using Next.js with multiple data grids and summaries.",
      "Engineered Node backend with Prisma and PostgreSQL, building performant REST APIs.",
      "Deployed and managed AWS infrastructure, ensuring scalability with production-readiness.",
    ],
  },
];

// ---------- Component ----------
const Experience = () => {
  const reduce = usePrefersReducedMotion();
  const theme = useTheme(); // reads theme.mode ("light" | "dark")
  const variants = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } };

  return (
    <Container>
      <Title>Work Experience</Title>

      {jobs.map((job, idx) => {
        // *** IMPORTANT: inverted mapping so dbs-light appears in LIGHT mode, per your request ***
        const logoSrc = theme?.mode === "light" ? job.logoLight : job.logoDark;

        return (
          <Job
            key={idx}
            initial={reduce ? {} : "hidden"}
            whileInView={reduce ? {} : "visible"}
            viewport={{ once: true, amount: 0.2 }}
            variants={variants}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <Left>
              {(job.logoLight || job.logoDark) && <Logo src={logoSrc || job.logoDark} alt={`${job.company} logo`} />}

              <Info>
                <Company>{job.company}</Company>

                {/* Role on first line, Location on next line (same font/style as Role) */}
                <Role>{job.role}</Role>
                <Location>{job.location}</Location>

                <MobileDates>{job.duration}</MobileDates>

                <Bullets>
                  {job.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </Bullets>
              </Info>
            </Left>

            <Dates>{job.duration}</Dates>
          </Job>
        );
      })}
    </Container>
  );
};

export default Experience;
