export const hasSkill = (user) => (skill) =>
  user.profile.skills?.some?.((ss) => ss.text === skill.text);
