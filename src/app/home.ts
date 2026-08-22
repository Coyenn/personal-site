export const homeIntroBefore = "I'm a ";
export const homeIntroAfter =
  "-year-old designer, engineer & game developer. My passion is to create beautiful software. I work on ERP systems that power the German housing market and develop video games played by hundreds of millions.";

export function homeIntro(age: number) {
  return `${homeIntroBefore}${age}${homeIntroAfter}`;
}
