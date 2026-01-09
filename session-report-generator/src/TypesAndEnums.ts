export enum Attendance {
  ABSENT = "absent",
  PRESENT = "present",
  REVIEW = "review",
  LEAVE = "leave",
  NO_SESSION = "no-session",
}

export enum Venue {
  COMM2B = "2B Communication room",
  COMM1B = "1B Communication room",
  COMM3B = "3B Communication room",
  CORR1 = "1st Floor Corridor",
  CORR2 = "2nd Floor Corridor",
  CORR3 = "3rd Floor Corridor",
  BASE = "Basement",
  PARKING = "Parking",
  CABIN1B = "1B",
  CABIN2A = "2A",
  CABIN2B = "2B",
  CABIN3A = "3A",
  CABIN3B = "3B",
  CABIN4A = "4A",
  CABIN5A = "5A",
}

export enum Trainer {
  AKHIL = "Akhil Jose Palatty",
  ALEENA = "Aleena ma'am",
  MITRA = "Mitra ma'am",
}

export interface Member {
  name: string;
  attendance: Attendance;
}

export interface GenerateReportType {
  batch: string;
  date: string;
  time: string;
  venue: Venue;
  trainer: string;
  coordinator: string;
  content: string;
  presentList: string[];
  absentList: string[];
  reviewList: string[];
  leaveList: string[];
  noSessionList: string[];
}
