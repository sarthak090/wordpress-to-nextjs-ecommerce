var mS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

export const getFullDate = (d) => {
  let date = new Date(d);
  return `${date.getDate()} ${mS[date.getMonth()]} ${date.getFullYear()}`;
};
