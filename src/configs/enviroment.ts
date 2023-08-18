const ENV = import.meta.env;
const parseEnv = Object.entries(ENV).reduce((acc, [key, value]) => {
  if (value === 'true') {
    acc[key] = true;
    return acc;
  }
  if (value === 'false') {
    acc[key] = false;
    return acc;
  }
  if (typeof value === 'string') {
    acc[key] = value;
    return acc;
  }
  return acc;
}, {} as ImportMetaEnv);

// env name variable
export const { a } = parseEnv
