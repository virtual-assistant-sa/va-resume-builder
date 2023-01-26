import { faker } from "@faker-js/faker";
import { pick, random, fill } from "../array";
import { nanoid } from "nanoid";
import { randJobSkill } from "./job";
import { randHobby } from "./hobby";
import { randIntroduction } from "./intro";
import { randResponsibilities } from "./responsibilities";

const randEducation = ({
  start = faker.date.past(10).getTime(),
  end = faker.date.future(2, start).getTime(),
  what = pick(randResponsibilities),
  where = faker.address.city(),
} = {}) => ({
  id: nanoid(),
  start,
  end,
  what,
  where,
});

const randExperience = ({
  start = faker.date.past(10).getTime(),
  end = faker.date.future(5, start).getTime(),
} = {}) => ({
  id: nanoid(),
  start,
  end,
  where: {
    business: faker.company.name(),
    country: faker.address.countryCode(),
  },
  responsibilities: fill(5, () => ({
    id: nanoid(),
    text: pick(randResponsibilities),
  })),
});

export default function generateEmployeeProfile() {
  return {
    educations: fill(4, () => randEducation()),
    experiences: fill(3, () => randExperience()),
    skills: fill(2 + random(6), randJobSkill).map((s) => ({
      id: nanoid(),
      text: s,
    })),
    hobbies: fill(3, () => randHobby()).map((s) => ({
      id: nanoid(),
      text: s,
    })),
    intro: randIntroduction(),
    verified: faker.datatype.boolean(),
  };
}
