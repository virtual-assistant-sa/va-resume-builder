import React, { useEffect, useState } from "react";
import { Button, Stack, Paper, Container } from "@mui/material";
import { nanoid } from "nanoid";
import useText from "../../utils/useText";
import { setUser } from "../../features/users/action";
import { useDispatch, useSelector } from "react-redux";
import { remove } from "../../utils/array";

export default function ProfileEdit() {
  const user = useSelector((state) => state.login.user);
  const id = user?.id;
  const hasSkills = user?.role === "employee";

  const users = useSelector((state) => state.users);
  const form = users.find?.((f) => f.id === id) ?? {
    id,
    skills: [],
    email: "",
    name: "",
    country: "",
  };
  const [email, Email] = useText(form.email, { placeholder: "Email" });
  const [name, Name] = useText(form.name, { placeholder: "Name" });
  const [country, Country] = useText(form.country, { placeholder: "Country" });
  const [skills, setSkills] = useState(form.skills);

  const add = () => {
    setSkills([...skills, { id: nanoid(), text: "" }]);
  };
  const del = (i) => {
    setSkills((skills) => remove(skills, i));
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (form && id)
      dispatch(setUser({ ...form, email, name, country, skills }));
  }, [email, name, country, skills, dispatch]);

  if (!user) return;
  return (
    <Container>
      <Stack gap={2}>
        <h1>Profile</h1>
        {Email}
        {Name}
        {Country}
        {hasSkills ? (
          <>
            <h3>Skills</h3>
            <Button variant="contained" onClick={add}>
              +
            </Button>
            {skills.map(({ id, text }, i) => (
              <Paper key={id}>
                <Stack direction="row" gap={2}>
                  <Button onClick={() => del(i)}>X</Button>
                  <Question
                    q={[
                      { text },
                      ({ text }) =>
                        setSkills((skills) =>
                          skills.map((item) =>
                            item.id === id ? { id, text } : item
                          )
                        ),
                    ]}
                  />
                </Stack>
              </Paper>
            ))}
          </>
        ) : null}
      </Stack>
    </Container>
  );
}

const useMultilineText = (val, opts) =>
  useText(val, { fullWidth: true, multiline: true, rows: 2, ...opts });

const Question = ({ q: [val, set] }) => {
  const [text, Text] = useMultilineText(val.text, {
    placeholder: "Qualification",
  });

  useEffect(() => {
    set({ id: val.id, text });
  }, [text, set]);

  return <>{Text}</>;
};
