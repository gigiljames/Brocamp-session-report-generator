import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Trainer, Venue, type Attendance, type Member } from "../TypesAndEnums";
import { getCurrentDate } from "../helper";

interface ReportStore {
  batch: string;
  setBatch: (value: string) => void;

  date: string;
  setDate: (value: string) => void;

  time: string;
  setTime: (value: string) => void;

  venue: Venue;
  setVenue: (value: Venue) => void;

  trainer: Trainer;
  setTrainer: (value: Trainer) => void;

  coordinator: string;
  setCoordinator: (value: string) => void;

  content: string;
  setContent: (value: string) => void;

  memberList: Member[];
  addToMemberList: (value: Member) => void;
  removeFromMemberList: (index: number) => void;
  markAttendance: (index: number, value: Attendance) => void;
}

export const useReportStore = create<ReportStore>()(
  persist(
    (set) => ({
      batch: "",
      setBatch: (value) => set({ batch: value }),

      date: getCurrentDate(),
      setDate: (value) => set({ date: value }),

      time: "",
      setTime: (value) => set({ time: value }),

      venue: Venue.COMM2B,
      setVenue: (value) => set({ venue: value }),

      trainer: Trainer.AKHIL,
      setTrainer: (value) => set({ trainer: value }),

      coordinator: "",
      setCoordinator: (value) => set({ coordinator: value }),

      content: "",
      setContent: (value) => set({ content: value }),

      memberList: [],

      addToMemberList: (value) =>
        set((state) => ({
          memberList: [...state.memberList, value],
        })),

      removeFromMemberList: (index) =>
        set((state) => ({
          memberList: state.memberList.filter((_, i) => i !== index),
        })),
      markAttendance: (index, value) =>
        set((state) => ({
          memberList: state.memberList.map((member, i) =>
            i === index ? { ...member, attendance: value } : member
          ),
        })),
    }),
    {
      name: "report-store",
    }
  )
);
