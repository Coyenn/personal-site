"use client";

const BIRTHDAY = { year: 2004, month: 6, day: 5 };

function ageFromBirthday(
  birthday: { year: number; month: number; day: number },
  timeZone = "Europe/Berlin",
) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const year = Number(parts.find((part) => part.type === "year")?.value);
  const month = Number(parts.find((part) => part.type === "month")?.value);
  const day = Number(parts.find((part) => part.type === "day")?.value);
  const hadBirthday = month > birthday.month || (month === birthday.month && day >= birthday.day);

  return year - birthday.year - (hadBirthday ? 0 : 1);
}

export function Age() {
  return <span suppressHydrationWarning>{ageFromBirthday(BIRTHDAY)}</span>;
}
