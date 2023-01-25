export function getFilter(user) {
  return {
    super: () => true,
    employer: (j) => j.OwnerId === user?.id,
    employee: (j) => j.UserId === user?.id,
    anon: () => false,
  }[user?.role ?? "anon"];
}

export function getActions(user) {
  return {
    super: {},
    employer: {},
    employee: {},
    anon: {},
  }[user?.role ?? "anon"];
}
