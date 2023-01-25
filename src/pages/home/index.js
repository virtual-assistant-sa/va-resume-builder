import React from "react";
import { Stack, Container } from "@mui/material";

export default function Home() {
  return (
    <Container>
      <Stack>
        <h1>Home</h1>
        <p>
          Welcome to our job listings site! We are dedicated to connecting
          talented job seekers with top employers in a variety of industries.
        </p>
        <p>
          Our easy-to-use platform allows you to search for jobs by location,
          keyword, and job type, making it simple to find the perfect
          opportunity for you. Whether you're a recent graduate, experienced
          professional, or just looking for a career change, we have something
          for everyone. With new job listings added daily, you're sure to find
          the perfect fit.
        </p>
        <p>
          Create a profile and upload your resume today to start your job search
          and take the first step towards your dream career. Apply now and let
          us help you find your next job opportunity!
        </p>
      </Stack>
    </Container>
  );
}
