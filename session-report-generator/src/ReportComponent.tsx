import { useState } from "react";
import { Attendance, type GenerateReportType } from "./TypesAndEnums";
import { useReportStore } from "./zustand/zustandStore";
import { getReport } from "./helper";
import { MdContentCopy } from "react-icons/md";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

function ReportComponent() {
  const batch = useReportStore((state) => state.batch);
  const date = useReportStore((state) => state.date);
  const time = useReportStore((state) => state.time);
  const venue = useReportStore((state) => state.venue);
  const trainer = useReportStore((state) => state.trainer);
  const coordinator = useReportStore((state) => state.coordinator);
  const content = useReportStore((state) => state.content);
  const memberList = useReportStore((state) => state.memberList);
  const [report, setReport] = useState("");

  function handleGenerate() {
    const presentList = memberList
      .filter((member) => member.attendance === Attendance.PRESENT)
      .map((member) => member.name)
      .sort();
    const absentList = memberList
      .filter((member) => member.attendance === Attendance.ABSENT)
      .map((member) => member.name)
      .sort();
    const leaveList = memberList
      .filter((member) => member.attendance === Attendance.LEAVE)
      .map((member) => member.name)
      .sort();
    const reviewList = memberList
      .filter((member) => member.attendance === Attendance.REVIEW)
      .map((member) => member.name)
      .sort();
    const noSessionList = memberList
      .filter((member) => member.attendance === Attendance.NO_SESSION)
      .map((member) => member.name)
      .sort();
    const data: GenerateReportType = {
      batch,
      date,
      time,
      venue,
      trainer,
      coordinator,
      content,
      presentList,
      absentList,
      leaveList,
      reviewList,
      noSessionList,
    };
    setReport(getReport(data));
    toast.success("Report Generated!");
  }
  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-slate-200">Session Report</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleGenerate()}
          className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-cyan-900/20"
        >
          Generate Report
        </motion.button>
      </div>

      <div className="flex-1 relative bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow-inner group">
        <AnimatePresence>
          {report ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full w-full"
            >
              <textarea
                className="w-full h-full p-4 bg-transparent text-slate-300 font-mono text-sm leading-relaxed resize-none focus:outline-none custom-scrollbar"
                value={report}
                onChange={(e) => setReport(e.target.value)}
                spellCheck={false}
              ></textarea>
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1 }}
                onClick={() => {
                  navigator.clipboard.writeText(report);
                  toast.success("Copied to clipboard");
                }}
                className="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-cyan-600 text-slate-400 hover:text-white rounded-lg transition-all shadow-lg border border-slate-700"
                title="Copy to Clipboard"
              >
                <MdContentCopy size={18} />
              </motion.button>
            </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-600 gap-2">
              <span className="text-4xl">📝</span>
              <p>Click generate to create report</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ReportComponent;
