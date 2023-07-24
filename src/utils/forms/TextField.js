// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React from "react";
import MuiTextField from "@mui/material/TextField";
import { DebounceComponent } from "./DebounceField";

export const TextFieldB = ({ value, onChange, ...opts }) => {
  return (
    <MuiTextField
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...opts}
    />
  );
};

export function TextField(props) {
  return <DebounceComponent {...props} Component={TextFieldB} />;
}
