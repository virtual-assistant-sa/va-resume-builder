import React, { useEffect } from "react";
import { Stack, Container } from "@mui/material";
import useText from "../../utils/hooks/useText";
import { setUser } from "../../features/users/action";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveUser, selectAllUsers } from "../../features/users/select";

export default function ProfileEdit() {
  const user = useSelector(selectActiveUser);
  const id = user?.id;

  const users = useSelector(selectAllUsers);
  const form = users.find?.((f) => f.id === id) ?? {
    id,
    email: "",
    firstName: "",
    country: "",
  };
  const [email, Email] = useText(form.email, { placeholder: "Email" });
  const [firstName, Name] = useText(form.firstName, { placeholder: "Name" });
  const [country, Country] = useText(form.country, { placeholder: "Country" });

  const dispatch = useDispatch();
  useEffect(() => {
    if (form && id) dispatch(setUser({ ...form, email, firstName, country }));
  }, [email, firstName, country, dispatch]);

  if (!user) return;
  return (
    <Container>
      <Stack gap={2}>
        <h1>Profile</h1>
        {Email}
        {Name}
        {Country}
      </Stack>
    </Container>
  );
}
