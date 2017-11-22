export const genedu = () => {
  return JSON.stringify([
    {
      level: "bachelor",
      university: "จุฬาลงกรณ์มหาวิทยาลัย",
      faculty: "รัฐศาสตร์",
      major: ""
    }
  ]);
};
export const genteaching = () => {
  return JSON.stringify([{ subject: "สังคมศึกษา", level: "matthayomton" }]);
};
export const genplace = () => {
  return JSON.stringify(["สยาม"]);
};
export const gentime = () => {
  return JSON.stringify([
    { day: "saturday", time: "10.00-12.00" },
    { day: "sunday", time: "10.00-12.00" }
  ]);
};
