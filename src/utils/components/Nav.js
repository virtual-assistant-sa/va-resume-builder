// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import * as React from "react";

import { useLocation } from "react-router-dom";
import { ResponsiveAppBar } from "./ResponsiveAppBar";
import { useNavigate } from "react-router-dom";

export default function Nav({ pages, extras }) {
  const navigate = useNavigate();
  const setLink = (link) => {
    navigate(link);
  };
  const setKey = (key) => {
    setLink(getLink(key));
  };

  const all = { ...pages, ...extras };

  const getKey = (link) => Object.entries(all).find((v) => link === v[1])?.[0];
  const getLink = (key) => all[key];

  const link = "/" + useLocation().pathname.split("/")?.[1];
  const key = getKey(link);

  return (
    <ResponsiveAppBar
      {...{
        page: [key, setKey],
        extra: [key, setKey],
        pages: Object.keys(pages),
        extras: Object.keys(extras),
      }}
    />
  );
}
