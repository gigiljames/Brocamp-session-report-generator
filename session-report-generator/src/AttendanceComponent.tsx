import { useState } from "react";
import { Attendance, type Member } from "./TypesAndEnums";
import { useReportStore } from "./zustand/zustandStore";
import { IoMdAdd } from "react-icons/io";
import { IoTrashOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { confirm } from "./ConfirmationBox";
import toast from "react-hot-toast";

function AttendanceComponent() {
  const [name, setName] = useState("");
  const addMember = useReportStore((state) => state.addToMemberList);
  const removeMember = useReportStore((state) => state.removeFromMemberList);
  const markAttendance = useReportStore((state) => state.markAttendance);
  const members = useReportStore((state) => state.memberList);

  function handleAddMember() {
    if (!name.trim()) return;
    const newMember: Member = {
      name,
      attendance: Attendance.PRESENT,
    };
    addMember(newMember);
    toast.success("Member added successfully!");
    setName("");
  }

  async function handleRemoveMember(index: number) {
    const result = await confirm({
      message: "Are you sure you want to remove this member?",
    });
    if (result) {
      removeMember(index);
      toast.success("Member removed successfully!");
    }
  }

  const inputClasses =
    "w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all placeholder:text-slate-500";
  const buttonClasses =
    "flex items-center justify-center bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg px-4 py-2.5 transition-colors font-medium";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-6"
    >
      <div className="flex gap-3 items-end bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
        <div className="flex-1">
          <label className="block text-sm font-medium text-slate-400 mb-1.5 ml-1">
            Add Member
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddMember()}
              className={inputClasses}
              placeholder="Enter member name..."
            />
            <button
              onClick={handleAddMember}
              className={buttonClasses}
              title="Add Member"
            >
              <IoMdAdd size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-700/50 border-b border-slate-700 text-slate-300">
              <th className="p-4 font-semibold text-sm">S.No</th>
              <th className="p-4 font-semibold text-sm">Name</th>
              <th className="p-4 font-semibold text-sm">Attendance</th>
              <th className="p-4 font-semibold text-sm text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="popLayout">
              {members.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-slate-500">
                    No members added yet.
                  </td>
                </tr>
              )}
              {members.length > 0 &&
                members
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((member, index) => (
                    <motion.tr
                      key={`${member.name}-${index}`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors group"
                    >
                      <td className="p-4 font-medium text-slate-200">
                        {index + 1}
                      </td>
                      <td className="p-4 font-medium text-slate-200">
                        {member.name}
                      </td>
                      <td className="p-4">
                        <select
                          className="bg-slate-900 border border-slate-700 text-slate-300 text-sm rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                          onChange={(e) =>
                            markAttendance(index, e.target.value as Attendance)
                          }
                          value={member.attendance}
                        >
                          {Object.values(Attendance).map((val) => (
                            <option key={val} value={val}>
                              {val}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleRemoveMember(index)}
                          className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-all"
                          title="Remove Member"
                        >
                          <IoTrashOutline size={20} />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export default AttendanceComponent;
