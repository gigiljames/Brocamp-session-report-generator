import { useState } from "react";
import { useReportStore } from "./zustand/zustandStore";
import { motion } from "framer-motion";
import { Trainer, Venue } from "./TypesAndEnums";

function SessionInfo() {
  const batch = useReportStore((state) => state.batch);
  const setBatch = useReportStore((state) => state.setBatch);
  const date = useReportStore((state) => state.date);
  const setDate = useReportStore((state) => state.setDate);
  const setTime = useReportStore((state) => state.setTime);
  const venue = useReportStore((state) => state.venue);
  const setVenue = useReportStore((state) => state.setVenue);
  const trainer = useReportStore((state) => state.trainer);
  const setTrainer = useReportStore((state) => state.setTrainer);
  const coordinator = useReportStore((state) => state.coordinator);
  const setCoordinator = useReportStore((state) => state.setCoordinator);
  const content = useReportStore((state) => state.content);
  const setContent = useReportStore((state) => state.setContent);
  const memberList = useReportStore((state) => state.memberList);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  function to12HourFormat(time24: string) {
    if (!time24) return "";
    const [hourStr, minuteStr] = time24.split(":");
    const hour = Number(hourStr);
    const minute = Number(minuteStr);
    const period = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}${period}`;
  }

  const inputClasses =
    "w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all placeholder:text-slate-500";
  const labelClasses = "block text-sm font-medium text-slate-400 mb-1.5 ml-1";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-5 p-1"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="col-span-1">
          <label className={labelClasses}>Batch</label>
          <select
            name="batch"
            className={inputClasses}
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
          >
            <option value="">Select batch</option>
            <option value="BCE210">BCE210</option>
          </select>
        </div>
        <div className="col-span-1">
          <label className={labelClasses}>Date</label>
          <input
            type="date"
            className={`${inputClasses} [color-scheme:dark]`}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={labelClasses}>Start Time</label>
          <input
            step={1800}
            type="time"
            className={`${inputClasses} [color-scheme:dark]`}
            value={startTime}
            onChange={(e) => {
              setStartTime(e.target.value);
              if (endTime) {
                setTime(
                  `${to12HourFormat(e.target.value)} - ${to12HourFormat(
                    endTime
                  )}`
                );
              }
            }}
          />
        </div>
        <div>
          <label className={labelClasses}>End Time</label>
          <input
            type="time"
            className={`${inputClasses} [color-scheme:dark]`}
            value={endTime}
            onChange={(e) => {
              setEndTime(e.target.value);
              if (startTime) {
                setTime(
                  `${to12HourFormat(startTime)} - ${to12HourFormat(
                    e.target.value
                  )}`
                );
              }
            }}
          />
        </div>
      </div>

      <div>
        <label className={labelClasses}>Venue</label>
        <select
          className={inputClasses}
          onChange={(e) => setVenue(e.target.value as Venue)}
          value={venue}
        >
          <option value="">Select venue</option>
          {Object.values(Venue).map((venue) => (
            <option key={venue} value={venue}>
              {venue}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={labelClasses}>Trainer</label>
          <select
            className={inputClasses}
            value={trainer}
            onChange={(e) => setTrainer(e.target.value as Trainer)}
          >
            <option value="">Select Trainer</option>
            {Object.values(Trainer).map((trainer) => (
              <option key={trainer} value={trainer}>
                {trainer}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClasses}>Coordinator</label>
          <select
            className={inputClasses}
            value={coordinator}
            onChange={(e) => setCoordinator(e.target.value)}
          >
            <option value="">Select coordinator</option>
            {memberList.map((member) => (
              <option key={member.name} value={member.name}>
                {member.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClasses}>Content</label>
        <textarea
          className={`${inputClasses} min-h-[120px] resize-none`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter session content..."
        ></textarea>
      </div>
    </motion.div>
  );
}

export default SessionInfo;
