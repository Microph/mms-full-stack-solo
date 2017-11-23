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

export const parseDay = day => {
  switch (day) {
    case "sunday":
      return "วันอาทิตย์";
    case "monday":
      return "วันจันทร์";
    case "tuesday":
      return "วันอังคาร";
    case "wednesday":
      return "วันพุธ";
    case "thursday":
      return "วันพฤหัสบดี";
    case "friday":
      return "วันศุกร์";
    case "saturday":
      return "วันเสาร์";
    case "วันอาทิตย์":
      return "sunday";
    case "วันจันทร์":
      return "monday";
    case "วันอังคาร":
      return "tuesday";
    case "วันพุธ":
      return "wednesday";
    case "วันพฤหัสบดี":
      return "thursday";
    case "วันศุกร์":
      return "friday";
    case "วันเสาร์":
      return "saturday";
    default:
      return day;
  }
};

export const parseSubject = subject => {
  switch (subject) {
    case "คณิตศาสตร์":
      return "math";
    case "วิทยาศาสตร์":
      return "science";
    case "ฟิสิกส์":
      return "physics";
    case "เคมี":
      return "chemistry";
    case "ชีววิทยา":
      return "biology";
    case "ภาษาไทย":
      return "thai";
    case "ภาษาอังกฤษ":
      return "english";
    case "สังคมศึกษา":
      return "socialstudies";
    case "math":
      return "คณิตศาสตร์";
    case "science":
      return "วิทยาศาสตร์";
    case "physics":
      return "ฟิสิกส์";
    case "chemistry":
      return "เคมี";
    case "biology":
      return "ชีววิทยา";
    case "thai":
      return "ภาษาไทย";
    case "english":
      return "ภาษาอังกฤษ";
    case "socialstudies":
      return "สังคมศึกษา";
    default:
      return subject;
  }
};
