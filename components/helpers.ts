export const dateToString = (props) => {
  const date = new Date(props);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  };
  const datestring = date.toLocaleDateString("en-US", options);
  return datestring;
};
