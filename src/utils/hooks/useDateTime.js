// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React, { useEffect, useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TextField } from "@mui/material";
import { format, parse } from "date-fns";

const referenceDate = new Date(1970, 0, 1, 0, 0, 0);

export function useDate(init = "", opts = {}) {
  const dateFormat = "dd/MM/yyyy";

  const [v, setv] = useState(init);
  useEffect(() => {
    setv(init);
  }, [init]);
  const C = (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        renderInput={(props) => <TextField {...props} />}
        value={new Date(v) ?? parse(v, dateFormat, referenceDate)}
        onChange={(v) => {
          setv(v.getTime() ?? format(v, dateFormat));
        }}
        {...opts}
      />
    </LocalizationProvider>
  );
  return [v, C];
}

export function useDateTime(init = "", opts = {}) {
  const dateFormat = "dd/MM/yyyy HH:mm";

  const [v, setv] = useState(init);
  useEffect(() => {
    setv(init);
  }, [init]);
  const C = (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        value={parse(v, dateFormat, referenceDate)}
        onChange={(v) => {
          setv(format(v, dateFormat));
        }}
        {...opts}
      />
    </LocalizationProvider>
  );
  return [v, C];
}
