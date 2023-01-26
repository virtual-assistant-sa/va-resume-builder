// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { pick } from "../array";

export function randIntroduction(
  industry = "Apple Digestors",
  years = "2",
  name = "Pickles",
  degree = "Fasting"
) {
  let sent0 = [
    `A highly motivated and results-driven individual with a strong background in ${industry}.`,
    `A recent graduate with a degree in ${degree} and a passion for ${industry}.`,
    `An experienced professional with over ${years} years of experience in ${industry}.`,
    `A dedicated and hardworking individual with a proven track record of success in ${industry}.`,
    `${name}, with ${years} years of experience in ${industry} and a ${degree} degree, seeking new opportunities.`,
  ];
  let sent1 = [
    `With over ${years} years of experience in the field, I am confident in my ability to drive success and deliver results.`,
    `I am highly adaptable, and my eagerness to learn new skills and technologies makes me a valuable asset to any team.`,
    `My experience has taught me the importance of clear communication, attention to detail, and the ability to think creatively.`,
    `With a solid understanding of the latest trends and technologies, I am able to think outside the box and develop innovative solutions.`,
    `I am a proactive, results-driven individual with a proven track record of success.`,
  ];
  let sent2 = [
    `I am eager to leverage my skills and experience to make a positive impact in a new role.`,
    `I am confident in my ability to take on new challenges and deliver results.`,
    `I am excited to start my career and make a difference in ${industry}.`,
    `I am excited to bring my skills and experience to a new role and contribute to the success of the team.`,
    `I am excited to bring my skills, experience and passion to a new role and make a difference in ${industry}.`,
  ];

  return [pick(sent0), pick(sent1), pick(sent2)].join(" ");
}
