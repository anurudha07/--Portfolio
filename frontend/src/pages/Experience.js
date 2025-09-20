import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";
import dbsLogo from "../assets/logos/dbs.png";

// ---------- Styled ----------
const Container = styled.section`
  max-width: 880px;
  margin: 70px auto;
  padding: 0 1rem;
`;

const Title = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  text-align: center;
  color: ${(props) => props.theme.colors.primary};
`;

/* Job row */
const Job = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.25rem;
  padding: 0.6rem 0.25rem;

  @media (max-width: 680px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

/* Left column: logo + text */
const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 0.9rem;
  flex: 1;

  @media (max-width: 680px) {
    align-items: flex-start;
    gap: 0.6rem;
  }
`;

const Logo = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
  background: transparent;

  /* Theme-driven inversion (if you use theme.isDark) */
  ${(props) => props.theme && props.theme.isDark && `filter: invert(1) brightness(1.2);`}

  /* System preference fallback (covers devices where theme flag isn't set) */
  @media (prefers-color-scheme: dark) {
    filter: invert(1) brightness(1.2);
  }

  @media (max-width: 680px) {
    width: 38px;
    height: 38px;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

/* Company name */
const Company = styled.h3`
  font-size: 0.98rem;
  margin: 0;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 680px) {
    font-size: 0.95rem;
  }
`;

/* Role and location */
const Role = styled.p`
  font-size: 0.85rem;
  color: ${(props) => props.theme.colors.subtext};
  margin: 0.22rem 0 0.28rem;
  line-height: 1.15;

  @media (max-width: 680px) {
    font-size: 0.8rem;
  }
`;

const Location = styled.span`
  display: block;
  font-size: 0.85rem;
  color: ${(props) => props.theme.colors.subtext};
  margin-top: 0.12rem;

  @media (max-width: 680px) {
    font-size: 0.8rem;
  }
`;

/* Date shown on right for desktop */
const Dates = styled.div`
  font-size: 0.82rem;
  color: ${(props) => props.theme.colors.subtext};
  white-space: nowrap;
  text-align: right;
  min-width: 110px;

  @media (max-width: 680px) {
    display: none;
  }
`;

/* Mobile date shown under role for small screens */
const MobileDate = styled.div`
  display: none;
  font-size: 0.82rem;
  color: ${(props) => props.theme.colors.subtext};
  margin-top: 0.2rem;

  @media (max-width: 680px) {
    display: block;
  }
`;

/* Optional small description/bullets area (keeps consistent sizing) */
const Details = styled.div`
  margin-top: 0.35rem;
  font-size: 0.86rem;
  color: ${(props) => props.theme.colors.text};
  opacity: 0.95;
  line-height: 1.35;

  @media (max-width: 680px) {
    font-size: 0.82rem;
  }
`;

/* animation variants */
const variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
};

// ---------- Component ----------
const Experience = () => {
  const reduce = usePrefersReducedMotion();

  const jobs = [
    {
      logo: dbsLogo,
      company: "Freelance",
      role: "Full Stack Developer",
      location: "India · Remote",
      duration: "Aug 2025 – Present",
      details:
        "Built Inventory Management Dashboard using Next.js, Tailwind, and Node.js; deployed on AWS (EC2, RDS, S3) with production-ready configuration.",
    },
  ];

  return (
    <Container as={motion.section}>
      <Title>Work Experience</Title>

      <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
        {jobs.map((job, i) => (
          <Job
            as="li"
            key={i}
            initial={reduce ? {} : "hidden"}
            whileInView={reduce ? {} : "visible"}
            viewport={{ once: true, amount: 0.2 }}
            variants={variants}
            transition={{ duration: 0.45, delay: i * 0.08 }}
          >
            <Left>
              {job.logo && <Logo src={job.logo} alt={`${job.company} logo`} />}
              <Info>
                <Company>{job.company}</Company>
                <Role>
                  {job.role}
                  <Location>{job.location}</Location>
                </Role>

                {/* mobile date (visible only on small screens) */}
                <MobileDate>{job.duration}</MobileDate>

                {/* short project summary (optional) */}
                <Details>{job.details}</Details>
              </Info>
            </Left>

            {/* desktop date (hidden on mobile) */}
            <Dates>{job.duration}</Dates>
          </Job>
        ))}
      </ul>
    </Container>
  );
};

export default Experience;
