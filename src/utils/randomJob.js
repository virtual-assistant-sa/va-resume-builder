// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { pick } from "./array";

function generateRandomSentence(...wordArrays) {
  return wordArrays.map(pick).join(" ");
}
export function generateRandomJobTitle() {
  const jobPrefixes = ["Senior", "Lead", "Chief", "Manager", "Associate"];
  const jobAreas = ["Software", "Data", "Marketing", "Product", "Design"];
  const jobRoles = [
    "Engineer",
    "Analyst",
    "Scientist",
    "Manager",
    "Specialist",
  ];
  return generateRandomSentence(jobPrefixes, jobAreas, jobRoles);
}
export function generateRandomJobDescription() {
  const jobAreas = ["Software", "Data", "Marketing", "Product", "Design"];
  const jobRoles = [
    "Engineer",
    "Analyst",
    "Scientist",
    "Manager",
    "Specialist",
  ];
  const jobRequirements = [
    "experience in ",
    "strong understanding of ",
    "background in ",
    "proven track record of success in ",
  ];
  const jobTools = [
    "Java",
    "JavaScript",
    "agile development methodologies",
    "market research",
    "product development",
    "statistics",
    "machine learning",
    "market trends",
    "graphic design",
    "communication skills",
    "positive attitude",
    "finance",
    "Excel",
    "project management methodologies",
  ];

  const randomArea = pick(jobAreas);
  const randomRole = pick(jobRoles);
  const randomRequirement = pick(jobRequirements);
  const randomTool = pick(jobTools);

  return (
    "We are looking for a " +
    randomRole +
    " to join our team. The ideal candidate will have " +
    randomRequirement +
    randomTool +
    " and a strong understanding of " +
    randomArea +
    "."
  );
}
export function generateRandomJobSkill() {
  var skills = {
    "Programming Languages": [
      "JavaScript",
      "Python",
      "C++",
      "Java",
      "PHP",
      "C#",
      "Ruby",
      "Swift",
      "Go",
      "Rust",
    ],
    "Web Development": [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Vue",
      "Angular",
      "Node.js",
      "Express",
      "Next.js",
    ],
    Databases: [
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "SQLite",
      "Oracle",
      "SQL Server",
    ],
    Cloud: ["AWS", "Azure", "Google Cloud", "Heroku"],
    DevOps: ["Docker", "Kubernetes", "Ansible", "Jenkins", "Terraform"],
  };

  const category = pick(Object.keys(skills));
  const skill = pick(skills[category]);
  return [category, skill].join(" - ");
}
