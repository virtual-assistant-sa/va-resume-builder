import { roleNameById } from "../../features/users/constants";

export const selectUser = (id) => (state) =>
  roleNameFromRoleId(state.users.recent.find((u) => u.id === id));

export const selectActiveUser = (state) =>
  roleNameFromRoleId(state.users.active || anon);

export const selectAllUsers = (state) => {
  return state.users.recent.map(roleNameFromRoleId);
};

const anon = { id: 0, firstName: "Anon", roleId: 0 };

const roleNameFromRoleId = (user) =>
  user ? { ...user, role: roleNameById[user.roleId] } : undefined;
