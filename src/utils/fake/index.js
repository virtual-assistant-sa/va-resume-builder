import { faker } from "@faker-js/faker";
import { nanoid } from "nanoid";
import { randJobSkill, randJobTitle, randJobDescription } from "./job";
import { pick, random, fill } from "../array";
import generateEmployerProfile from "./employer";
import generateEmployeeProfile from "./employee";
import { roleIdByName } from "../../features/users/constants";

const generateProfile = {
  super: () => ({}),
  employer: generateEmployerProfile,
  employee: generateEmployeeProfile,
};

const fakeUser = ({
  firstName = faker.name.firstName(),
  email = faker.internet.email(firstName),
  role = "employee",
  country = faker.address.country(),
  profile = generateProfile[role](firstName),
  ...data
} = {}) => ({
  id: nanoid(),
  firstName,
  email,
  roleId: roleIdByName[role],
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
  ...fill(1, () => fakeUser({ roleId: 3, verified: true })),
  ...fill(2, () => fakeUser({ roleId: 2, verified: true })),
  ...fill(3, () => fakeUser({ roleId: 1 })),
];

const jobs = fill(50, () => fakeJob({}));

const state = {
  users: {
    recent: users,
  },
  jobs,
};
export default state;
