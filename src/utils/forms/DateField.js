// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TextField } from "@mui/material";
import { DebounceComponent } from "./DebounceField";

export function DateFieldB({ value = "", onChange, ...opts }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        renderInput={(props) => <TextField {...props} />}
        value={new Date(value)}
        onChange={(v) => {
          onChange(v.getTime());
        }}
        {...opts}
      />
    </LocalizationProvider>
  );
}

export function DateField(props) {
  return <DebounceComponent {...props} Component={DateFieldB} />;
}
