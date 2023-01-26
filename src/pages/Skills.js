import React, { useEffect } from "react";
import { Button, Stack, Paper, Typography } from "@mui/material";
import { nanoid } from "nanoid";
import { remove } from "../utils/array";
import { useMultilineText } from "../utils/hooks/useText";

export function Skills({ skills }) {
  return (
    <>
      <h3>Skills</h3>
      <Stack gap={2}>
        {skills.map(({ id, text }, i) => (
          <Typography key={id}>{text}</Typography>
        ))}
      </Stack>
    </>
  );
}

export function EditSkills({ skills: [skills, setSkills] }) {
  const add = () => {
    setSkills([...skills, { id: nanoid(), text: "" }]);
  };
  const del = (i) => {
    setSkills((skills) => remove(skills, i));
  };
  return (
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
                    skills.map((item) => (item.id === id ? { id, text } : item))
                  ),
              ]}
            />
          </Stack>
        </Paper>
      ))}
    </>
  );
}

const Question = ({ q: [val, set] }) => {
  const [text, Text] = useMultilineText(val.text, {
    placeholder: "Qualification",
  });

  useEffect(() => {
    set({ id: val.id, text });
  }, [text]);

  return <>{Text}</>;
};
