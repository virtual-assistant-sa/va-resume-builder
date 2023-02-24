import React from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Paper, Container } from "@mui/material";
import { nanoid } from "nanoid";
import { useSelector } from "react-redux";
import { selectActiveUser, selectAllUsers } from "../../features/users/select";

export default function VerifyIndex() {
  const user = useSelector(selectActiveUser);
  const admin = user?.role === "super";

  const list = useSelector(selectAllUsers).filter((e) => !e.profile.verified);
  const navigate = useNavigate();

  const view = (id = nanoid()) => {
    navigate("./" + id + "/edit");
  };

  if (!admin) return;
  return (
    <Container>
      <Stack gap={2}>
        <h1>Verify</h1>
        {list.map(({ id, email }, i) => (
          <Paper key={id}>
            <Stack direction="row">
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
