export const BIRTHDAY = { year: 2004, month: 6, day: 5 } as const;
export const AGE_TIME_ZONE = "Europe/Berlin";

export function ageFromBirthday(
  birthday: { year: number; month: number; day: number } = BIRTHDAY,
  timeZone = AGE_TIME_ZONE,
  now = new Date(),
) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const year = Number(parts.find((part) => part.type === "year")?.value);
  const month = Number(parts.find((part) => part.type === "month")?.value);
  const day = Number(parts.find((part) => part.type === "day")?.value);
  const hadBirthday = month > birthday.month || (month === birthday.month && day >= birthday.day);

  return year - birthday.year - (hadBirthday ? 0 : 1);
}
