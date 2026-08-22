import { ageFromBirthday } from "@/lib/age";

export function Age() {
  return <span>{ageFromBirthday()}</span>;
}
