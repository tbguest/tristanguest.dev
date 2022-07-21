export const dateToString = (dstring: Date) => {
  const date = new Date(dstring);
  const datestring = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
  return datestring;
};
