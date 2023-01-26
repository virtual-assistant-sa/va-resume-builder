import React, { useEffect } from "react";
import { Stack, Container } from "@mui/material";
import useText from "../../utils/hooks/useText";
import { setUser } from "../../features/users/action";
import { useDispatch, useSelector } from "react-redux";

export default function ProfileEdit() {
  const user = useSelector((state) => state.login.user);
  const id = user?.id;

  const users = useSelector((state) => state.users);
  const form = users.find?.((f) => f.id === id) ?? {
    id,
    email: "",
    name: "",
    country: "",
  };
  const [email, Email] = useText(form.email, { placeholder: "Email" });
  const [name, Name] = useText(form.name, { placeholder: "Name" });
  const [country, Country] = useText(form.country, { placeholder: "Country" });

  const dispatch = useDispatch();
  useEffect(() => {
    if (form && id) dispatch(setUser({ ...form, email, name, country }));
  }, [email, name, country, dispatch]);

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
