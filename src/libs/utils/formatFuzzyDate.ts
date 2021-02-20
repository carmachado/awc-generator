import { FuzzyDate } from "../anime/animeTypes";

export function getDigits(value: number, digits: number): string {
  const repeat = digits - value.toString().length;
  let result = "";
  for (let i = 0; i < repeat; i += 1) {
    result += "0";
  }
  return result + value.toString();
}

export default function formatFuzzyDate(date: FuzzyDate): string {
  if (!date || !date.year) return "YYYY-MM-DD";

  const { year, month, day } = date;

  return `${year}-${getDigits(month, 2)}-${getDigits(day, 2)}`;
}
