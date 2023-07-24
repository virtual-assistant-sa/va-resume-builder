// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React from "react";
import { Button, Stack, Paper, Box } from "@mui/material";
import { nanoid } from "nanoid";
import { remove } from "../array";

export function ListField({
  label,
  value,
  defaultValue,
  onChange,
  onClick,
  children,
}) {
  const add = () => {
    onChange([{ ...defaultValue, id: nanoid() }, ...value]);
  };
  const del = (i) => {
    onChange(remove(value, i));
  };
  if (!value.every((v) => v.id))
    throw new Error("Invalid id" + JSON.stringify(value));

  return (
    <Stack gap={2}>
      <h3>{label}</h3>
      <Button variant="contained" onClick={add}>
        +
      </Button>
      {value.map((item, i) => (
        <Paper key={item.id}>
          <Stack direction="row">
            {del ? <Button onClick={(e) => del(item)}>X</Button> : null}
            <Box
              {...(onClick
                ? {
                    onClick: () => onClick(item),
                    style: { cursor: "pointer" },
                  }
                : {})}
              sx={{ width: 1 }}
            >
              {children({
                value: item,
                onChange: (item) =>
                  onChange(value.map((l) => (l.id === item.id ? item : l))),
              })}
            </Box>
          </Stack>
        </Paper>
      ))}
    </Stack>
  );
}
