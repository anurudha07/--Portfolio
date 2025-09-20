import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";
import dbsLogo from "../assets/logos/dbs.png";

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

const Logo = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;

  @media (max-width: 600px) {
    width: 30px;
    height: 30px;
  }
`;

const Info = styled.div`
  flex: 1;
`;

const Company = styled.h3`
  font-size: 0.95rem;
  margin: 0;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text};
`;

const Role = styled.p`
  font-size: 0.85rem;
  color: ${(props) => props.theme.colors.subtext};
  margin: 0.2rem 0 0.4rem;
`;

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

// ---------- Component ----------
const Experience = () => {
  const reduce = usePrefersReducedMotion();
  const variants = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } };

  const jobs = [
    {
      company: "Freelance",
      role: "Full Stack Developer",
      location: "India · Remote",
      duration: "Aug 2025 – Present",
      logo: dbsLogo,
      bullets: [
        "Developed an Inventory Management Dashboard using Next.js with advanced data grids, filtering, summaries, and effecient product views",
        "Engineered Node backend with Prisma and PostgreSQL, designing schemas and building performant REST APIs, secured with JWT + Google OAuth.",
        "Deployed and managed AWS infrastructure (EC2, RDS, S3, API Gateway), ensuring scalability with production-ready operations.",
      ],
    },
  ];

  return (
    <Container>
      <Title>Work Experience</Title>
      {jobs.map((job, idx) => (
        <Job
          key={idx}
          initial={reduce ? {} : "hidden"}
          whileInView={reduce ? {} : "visible"}
          viewport={{ once: true, amount: 0.2 }}
          variants={variants}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
        >
          <Left>
            {job.logo && <Logo src={job.logo} alt={`${job.company} logo`} />}
            <Info>
              <Company>{job.company}</Company>
              <Role>
                {job.role} · {job.location}
              </Role>
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
      ))}
    </Container>
  );
};

export default Experience;
