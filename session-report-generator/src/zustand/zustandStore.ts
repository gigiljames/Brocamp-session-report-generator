import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Attendance, Member } from "../TypesAndEnums";
import { getCurrentDate } from "../helper";

interface ReportStore {
  batch: string;
  setBatch: (value: string) => void;

  date: string;
  setDate: (value: string) => void;

  time: string;
  setTime: (value: string) => void;

  venue: string;
  setVenue: (value: string) => void;

  trainer: string;
  setTrainer: (value: string) => void;

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

      venue: "",
      setVenue: (value) => set({ venue: value }),

      trainer: "",
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
