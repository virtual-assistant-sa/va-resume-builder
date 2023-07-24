export const hasSkill = (user) => (skill) =>
  user.profile.skills?.some?.((ss) => ss.text === skill.text);

export const matchingSkills = (a, b) => a.filter((aa) => b.includes(aa));
