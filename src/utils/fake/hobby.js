// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { pick } from "../array";

const hobbies = [
  {
    name: "Zero-gravity yoga",
    description:
      "Practicing yoga poses while floating in the weightlessness of space.",
  },
  {
    name: "Asteroid gardening",
    description:
      "Growing plants in specially designed gardens on asteroids or other small celestial bodies.",
  },
  {
    name: "Space scuba diving",
    description:
      "Exploring the depths of space in a specially designed suit that simulates the experience of scuba diving.",
  },
  {
    name: "Meteorite collecting",
    description:
      "Collecting and studying meteorites that have landed on celestial bodies in the solar system.",
  },
  {
    name: "Orbital skydiving",
    description:
      "Jumping out of a spacecraft and free falling in the vacuum of space, using a specially designed suit to survive.",
  },
];
export const randHobby = () => pick(hobbies).name;
