// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { useEffect, useMemo, useState } from "react";
import { debounce } from "throttle-debounce";

export const DebounceField = ({
  value,
  onChange,
  timeout = 1000,
  children,
}) => {
  const [v, setv] = useState(value);
  const onChangeD = useMemo(() => debounce(timeout, onChange), [timeout]);
  useEffect(() => {
    onChangeD(v);
  }, [v]);
  return children({ value: v, onChange: (v) => setv(v) });
};

export const DebounceComponent = ({
  value,
  onChange,
  timeout = 1000,
  Component,
  ...opts
}) => {
  const [v, setv] = useState(value);
  const onChangeD = useMemo(() => debounce(timeout, onChange), [timeout]);
  useEffect(() => {
    onChangeD(v);
  }, [v]);
  return <Component {...{ value: v, onChange: (v) => setv(v), ...opts }} />;
};
