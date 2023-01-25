import { faker } from "@faker-js/faker";
import { nanoid } from "nanoid";
import {
  generateRandomJobSkill,
  generateRandomJobTitle,
  generateRandomJobDescription,
} from "./utils/randomJob";
import { pick, random, fill } from "./utils/array";

const fakeUser = ({
  name = faker.name.firstName(),
  email = faker.internet.email(name),
  role = "employee",
  skills = fill(2 + random(6), generateRandomJobSkill).map((s) => ({
    id: nanoid(),
    text: s,
  })),
  country = faker.address.country(),
  ...data
} = {}) => ({
  id: nanoid(),
  name,
  email,
  role,
  token: nanoid(42),
  verified: faker.datatype.boolean(),
  skills,
  country,
  ...data,
});

const anyUser = (users, role) => pick(users.filter((u) => u.role === role));

const fakeJob = ({
  OwnerId = anyUser(users, "employer")?.id,
  skills = fill(2 + random(4), generateRandomJobSkill).map((s) => ({
    id: nanoid(),
    text: s,
  })),
  modifyDate = faker.date.recent(60).getTime(),
  expireDate = faker.date.soon(60, modifyDate).getTime(),
} = {}) => ({
  id: nanoid(),
  OwnerId,
  modifyDate,
  expireDate,
  title: generateRandomJobTitle(),
  description: generateRandomJobDescription(),
  skills,
});

const users = [
  ...fill(1, () => fakeUser({ role: "super", verified: true })),
  ...fill(2, () => fakeUser({ role: "employer", verified: true })),
  ...fill(3, () => fakeUser({ role: "employee" })),
];

const jobs = fill(50, () => fakeJob({}));

const state = { users, jobs };
export default state;
