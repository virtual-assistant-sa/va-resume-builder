import React from "react";
import { Button, Stack, Paper, Container } from "@mui/material";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { delUser } from "../../features/users/action";
import { selectActiveUser, selectAllUsers } from "../../features/users/select";

export default function Employees() {
  const user = useSelector(selectActiveUser);
  const admin = user?.role === "super";

  const list = useSelector(selectAllUsers).filter((u) => u.role === "employer");
  const dispatch = useDispatch();

  const remove = (id) => {
    dispatch(delUser(id));
  };
  const view = (id = nanoid()) => {};

  if (!admin) return;
  return (
    <Container>
      <Stack gap={2}>
        <h1>Employers</h1>
        {list.map(({ id, email }, i) => (
          <Paper key={id}>
            <Stack direction="row">
              {admin ? <Button onClick={(e) => remove(id)}>X</Button> : null}
              <Container onClick={() => view(id)} style={{ cursor: "pointer" }}>
                <pre>{email}</pre>
              </Container>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Container>
  );
}
