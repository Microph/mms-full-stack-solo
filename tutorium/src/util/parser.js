export const parseLevel = level => {
  switch (level) {
    case "pratom":
      return "ประถมศึกษา";
    case "matthayomton":
      return "มัธยมศึกษาตอนต้น";
    case "matthayomplai":
      return "มัธยมศึกษาตอนปลาย";
    case "bachelor":
      return "ปริญญาตรี";
    case "master":
      return "ปริญญาโท";
    case "doctor":
      return "ปริญญาเอก";
    case "ประถมศึกษา":
      return "pratom";
    case "มัธยมศึกษาตอนต้น":
      return "มmatthayomton";
    case "มัธยมศึกษาตอนปลาย":
      return "matthayomplai";
    case "ปริญญาตรี":
      return "bachelor";
    case "ปริญญาโท":
      return "master";
    case "ปริญญาเอก":
      return "doctor";
    default:
      return level;
  }
};

export const parseGender = gender => {
  switch (gender) {
    case "male":
      return "ชาย";
    case "female":
      return "หญิง";
    case "others":
      return "อื่น ๆ";
    case "ชาย":
      return "male";
    case "หญิง":
      return "female";
    case "อื่น ๆ":
      return "others";
    default:
      return gender;
  }
};

export const parseSubject = subject => {
  switch (subject) {
    case "math":
      return "คณิตศาสตร์";
    case "science":
      return "วิทยาศาสตร์";
    case "physics":
      return "ฟิสิิกส์";
    case "chemistry":
      return "เคมี";
    case "biology":
      return "ชีววิทยา";
    case "thai":
      return "ภาษาไทย";
    case "english":
      return "ภาษาอังกฤษ";
    case "social studies":
      return "สังคมศึกษา";
    default:
      return subject;
  }
};
