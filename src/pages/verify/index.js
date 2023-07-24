import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Stack, Paper, Container } from "@mui/material";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { delUser } from "../../features/users/action";
import { UserCard } from "../employees/UserCard";

export default function Employees() {
  const user = useSelector((state) => state.login.user);
  const admin = user?.role === "super";

  const list = useSelector((state) => state.users).filter(
    (e) => !e.profile.verified
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const remove = (id) => {
    dispatch(delUser(id));
  };
  const view = (id = nanoid()) => {
    navigate("./" + id + "/edit");
  };

  if (!admin) return;
  return (
    <Container>
      <Stack gap={2}>
        <h1>Verify</h1>
        {list.map((user, i) => (
          <UserCard key={user.id} {...{ user, remove, view, admin }} />
        ))}
        <Button variant="contained" onClick={() => view()}>
          +
        </Button>
      </Stack>
    </Container>
  );
}
