import { faker } from "@faker-js/faker";

const intro =
  "I am a highly organized and detail-oriented individual with experience in providing online assistance to individuals and organizations. I am well-versed in various tasks such as scheduling appointments, managing emails, conducting research, and providing customer support. My strong communication skills and ability to understand client's needs have allowed me to excel in my previous roles as an online assistant. I am a quick learner, adaptable, and able to work well under pressure. I am comfortable with modern technologies and softwares that are commonly used for virtual assistance.";

export default function generateEmployerProfile() {
  return {
    company: faker.company.name(),
    intro,
  };
}
