import React from "react";
import { Button, Stack, Container } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyUser } from "../../features/users/action";

export default function EditVerify() {
  let { id } = useParams();
  const form = useSelector(
    (state) =>
      state.users?.find?.((f) => f.id === id) ?? {
        id,
        email: "",
      }
  );
  const dispatch = useDispatch();
  const verify = () => {
    dispatch(verifyUser({ id }));
  };

  return (
    <Container>
      <Stack gap={2}>
        <h1>Editor</h1>
        <p>{form.email}</p>
        <p>Verified: {form.verified ? "yes" : "no"}</p>
        <Button onClick={verify}>Verify</Button>
      </Stack>
    </Container>
  );
}
