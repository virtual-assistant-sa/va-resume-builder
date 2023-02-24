// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React from "react";
import { Button, Stack, Paper, Box } from "@mui/material";
import { prependItem, removeItem, upsertItem } from "../array";

export function ListField({
  label,
  value,
  defaultValue,
  onChange,
  onClick = null,
  children,
}) {
  const update = (item) => {
    onChange(upsertItem(value)(item));
  };
  const add = () => {
    const newValue =
      typeof defaultValue === "function" ? defaultValue() : defaultValue;
    onChange(prependItem(value)(newValue));
  };
  const del = (item) => {
    onChange(removeItem(value)(item));
  };

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
                onChange: update,
              })}
            </Box>
          </Stack>
        </Paper>
      ))}
    </Stack>
  );
}
