// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import * as React from "react";

import { useLocation } from "react-router-dom";
import { ResponsiveAppBar } from "./ResponsiveAppBar";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";

export default function Nav({ pages, extras }) {
  const navigate = useNavigate();
  const location = useLocation();

  const setLink = (link) => {
    navigate(link);
  };
  const setKey = (key) => {
    setLink(getLink(key));
  };

  const all = { ...pages, ...extras };

  const getKey = (link) => Object.entries(all).find((v) => link === v[1])?.[0];
  const getLink = (key) => all[key];

  const link = location.pathname;
  const key = getKey(link);

  return (
    <Stack>
      <ResponsiveAppBar
        {...{
          page: [key, setKey],
          extra: [key, setKey],
          pages: Object.keys(pages),
          extras: Object.keys(extras),
        }}
      />
    </Stack>
  );
}
