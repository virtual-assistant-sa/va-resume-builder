// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { useState, useEffect } from "react";

export const useStateMemo = (init) => {
  const [val, set] = useState(init);
  useEffect(() => {
    set(init);
  }, [init]);
  return [val, set];
};
