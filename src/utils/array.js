// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

export const replace = (list, test, item) => {
  const i = list.findIndex(test(item));
  if (i < 0) return [...list, item];
  return list.map((old, j) => (j === i ? item : old));
};

export const remove = (a, i, n = 1) => {
  a.splice(i, n);
  return [...a];
};

export const random = (max) => (Math.random() * max) | 0;
export const pick = (a) => a[random(a.length)];
export const fill = (n, f) => [...new Array(n)].map((v, i) => f(i));
