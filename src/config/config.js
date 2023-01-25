const { REACT_APP_HOST } = process.env;

export const production = {
  host: REACT_APP_HOST,
};

export const development = production;

export const test = production;
