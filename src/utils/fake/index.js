import { faker } from "@faker-js/faker";
import { nanoid } from "nanoid";
import { randJobSkill, randJobTitle, randJobDescription } from "./job";
import { pick, random, fill } from "../array";
import generateEmployerProfile from "./employer";
import generateEmployeeProfile from "./employee";

const generateProfile = {
  super: () => ({}),
  employer: generateEmployerProfile,
  employee: generateEmployeeProfile,
};

const fakeUser = ({
  name = faker.name.firstName(),
  email = faker.internet.email(name),
  role = "employee",
  country = faker.address.country(),
  profile = generateProfile[role](name),
  ...data
} = {}) => ({
  id: nanoid(),
  name,
  email,
  role,
  token: nanoid(42),
  country,
  profile,
  ...data,
});

const anyUser = (users, role) => pick(users.filter((u) => u.role === role));

const fakeJob = ({
  OwnerId = anyUser(users, "employer")?.id,
  skills = fill(2 + random(4), randJobSkill).map((s) => ({
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
  title: randJobTitle(),
  description: randJobDescription(),
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
