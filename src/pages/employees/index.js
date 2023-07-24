import React from "react";
import { Stack, Container } from "@mui/material";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { delUser } from "../../features/users/action";
import { hasSkill } from "../jobs/hasSkill";
import { UserCard } from "./UserCard";

export default function Employees() {
  const user = useSelector((state) => state.login.user);
  const viewable = ["super", "employer"].includes(user?.role);
  const admin = user?.role === "super";

  const list = useSelector((state) => state.users).filter(
    (u) => u.role === "employee"
  );

  const dispatch = useDispatch();

  const remove = (id) => {
    dispatch(delUser(id));
  };
  const view = (id = nanoid()) => {};

  if (!viewable) return;
  return (
    <Container>
      <Stack gap={2}>
        <h1>Employees</h1>
        {list.map((user, i) => (
          <UserCard key={user.id} {...{ user, remove, view, admin }} />
        ))}
      </Stack>
    </Container>
  );
}
