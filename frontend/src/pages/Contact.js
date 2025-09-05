import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

const Container = styled.section`
  max-width: 420px;
  margin: 60px auto;
  padding: 0 1rem;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  letter-spacing: 0.3px;
  color: ${(props) => props.theme.colors.primary};
`;

const Subtitle = styled.p`
  font-size: 0.85rem;
  color: ${(props) => props.theme.colors.subtext};
  margin-bottom: 1.25rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const Input = styled.input`
  padding: 0.55rem 0.7rem;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 6px;
  background: ${(props) => props.theme.colors.cardBg};
  font-size: 0.85rem;
  color: ${(props) => props.theme.colors.text};
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 140, 255, 0.15);
  }
`;

const Textarea = styled.textarea`
  padding: 0.55rem 0.7rem;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 6px;
  background: ${(props) => props.theme.colors.cardBg};
  font-size: 0.85rem;
  color: ${(props) => props.theme.colors.text};
  resize: vertical;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 140, 255, 0.15);
  }
`;

const Button = styled.button`
  padding: 0.55rem;
  background: ${(props) => props.theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.15s ease, background 0.2s;

  &:hover {
    transform: translateY(-2px);
    background: ${(props) => props.theme.colors.accent};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const Message = styled.p`
  color: ${(props) => (props.$success ? "#2ecc71" : "#e74c3c")};
  font-size: 0.8rem;
  margin-top: 0.6rem;
`;

const Contact = () => {
  const reduce = usePrefersReducedMotion();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(null);
    const { name, email, message } = formData;

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({ success: false, msg: "All fields are required." });
      return;
    }
    if (!isValidEmail(email)) {
      setStatus({ success: false, msg: "Invalid email address." });
      return;
    }

    const to = "anurudhs567@gmail.com";
    const subject = encodeURIComponent(`Contact from ${name.trim()}`);
    const body = encodeURIComponent(
      [`Name: ${name.trim()}`, `Email: ${email.trim()}`, "", message.trim()].join(
        "\n"
      )
    );

    setSending(true);
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    setTimeout(() => {
      setSending(false);
      setFormData({ name: "", email: "", message: "" });
      setStatus({ success: true, msg: "Mail client opened. Please send." });
    }, 1000);
  };

  return (
    <Container
      as={motion.div}
      initial={reduce ? {} : { opacity: 0, y: 20 }}
      animate={reduce ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Title>Contact Me</Title>
      <Subtitle>Let's do a great work together</Subtitle>
      <Form onSubmit={handleSubmit}>
        <Input
          name="name"
          type="text"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          disabled={sending}
        />
        <Input
          name="email"
          type="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          disabled={sending}
        />
        <Textarea
          name="message"
          rows="4"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          disabled={sending}
        />
        <Button type="submit" disabled={sending}>
          {sending ? "Opening..." : "Send"}
        </Button>
      </Form>
      {status && <Message $success={status.success}>{status.msg}</Message>}
    </Container>
  );
};

export default Contact;
