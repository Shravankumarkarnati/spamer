const mapper = {
  years: 365,
  months: 30,
  weeks: 7,
  days: 1
};

export const getDays = (
  text: "years" | "months" | "weeks" | "days" | null,
  number: number
) => {
  if (text === null) return 0;
  return number * mapper[text];
};
