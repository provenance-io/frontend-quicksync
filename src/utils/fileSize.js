export const fileSize = (size) => {
  const i = Math.floor(Math.log(size) / Math.log(1024));
  const num = (size / 1024 ** i).toFixed(0);
  const name = ['B', 'kB', 'MB', 'G', 'T'][i];

  return `${num}${name}`;
};
