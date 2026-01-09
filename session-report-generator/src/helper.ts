import type { GenerateReportType } from "./TypesAndEnums";

export function getCurrentDate() {
  const currDate = new Date();
  const currDString = String(currDate.getDate()).padStart(2, "0");
  const currMString = String(currDate.getMonth() + 1).padStart(2, "0");
  const currYString = String(currDate.getFullYear()).padStart(2, "0");
  return `${currYString}-${currMString}-${currDString}`;
}

export function getFormattedDate(date: string) {
  const currDate = new Date(date);
  const currDString = String(currDate.getDate()).padStart(2, "0");
  const currMString = String(currDate.getMonth() + 1).padStart(2, "0");
  const currYString = String(currDate.getFullYear()).padStart(2, "0");
  return `${currDString}-${currMString}-${currYString}`;
}

export function getReport(data: GenerateReportType) {
  let attendaceArr: string[] = [];
  let presentListString = "";
  if (data.presentList.length > 0) {
    presentListString = "✅ Present\n" + data.presentList.join("\n");
  }
  let absentListString = "";
  if (data.absentList.length > 0) {
    absentListString = "❌ Absent\n" + data.absentList.join("\n");
  }
  let reviewListString = "";
  if (data.reviewList.length > 0) {
    reviewListString = "📝 Review\n" + data.reviewList.join("\n");
  }
  let leaveListString = "";
  if (data.leaveList.length > 0) {
    leaveListString = "🛑 Leave\n" + data.leaveList.join("\n");
  }
  let noSessionListString = "";
  if (data.noSessionList.length > 0) {
    noSessionListString = "🚫 No Session\n" + data.noSessionList.join("\n");
  }
  attendaceArr.push(
    presentListString,
    absentListString,
    reviewListString,
    leaveListString,
    noSessionListString
  );
  attendaceArr = attendaceArr.filter((item) => item !== "");
  const attendanceString = attendaceArr.join("\n");

  return `SESSION REPORT 🌟

👨🏻‍💻 Batch: ${data.batch}
📅 Date: ${getFormattedDate(data.date)}
🕒 Time: ${data.time}
⏹ Venue: ${data.venue}
👩‍🏫 Trainer: ${data.trainer}
👥 Coordinator: ${data.coordinator}

📘 Communication Session Report

${data.content}

${attendanceString}

📝 Report by: ${data.coordinator}`;
}
