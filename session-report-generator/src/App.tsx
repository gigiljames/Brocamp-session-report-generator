import { useState } from "react";
import SessionInfo from "./SessionInfo";
import AttendanceComponent from "./AttendanceComponent";
import ReportComponent from "./ReportComponent";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

function App() {
  const [sessionComponent, setSessionComponent] = useState<
    "info" | "attendance"
  >("info");

  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            background: "#334155",
            color: "#fff",
          },
        }}
      />
      <div className="flex justify-center items-center min-h-screen w-full bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30 p-4 md:p-0">
        <div className="w-full max-w-[1200px] min-h-[500px] flex flex-col lg:flex-row bg-slate-900/50 rounded-2xl p-4 md:p-6 gap-6 shadow-2xl border border-slate-800/50 backdrop-blur-sm lg:h-[90vh] overflow-y-auto lg:overflow-hidden">
          {/* Left Panel: Inputs & Attendance */}
          <div className="w-full lg:w-[55%] flex flex-col gap-6 h-full">
            {/* Tab Switcher */}
            <div className="flex p-1 bg-slate-800/80 rounded-lg shrink-0">
              <button
                onClick={() => setSessionComponent("info")}
                className={`relative flex-1 py-2 rounded-md text-sm font-medium transition-colors z-10 ${
                  sessionComponent === "info"
                    ? "text-white"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {sessionComponent === "info" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-cyan-600 rounded-md shadow-lg shadow-cyan-900/20"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">Session Info</span>
              </button>
              <button
                onClick={() => setSessionComponent("attendance")}
                className={`relative flex-1 py-2 rounded-md text-sm font-medium transition-colors z-10 ${
                  sessionComponent === "attendance"
                    ? "text-white"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {sessionComponent === "attendance" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-cyan-600 rounded-md shadow-lg shadow-cyan-900/20"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">Attendance</span>
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar relative min-h-[300px]">
              <motion.div
                key={sessionComponent}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                {sessionComponent === "info" ? (
                  <SessionInfo />
                ) : (
                  <AttendanceComponent />
                )}
              </motion.div>
            </div>
          </div>

          {/* Right Panel: Report */}
          <div className="w-full lg:w-[45%] bg-slate-800/50 rounded-xl border border-slate-700/50 p-4 shadow-inner flex flex-col h-[500px] lg:h-auto">
            <ReportComponent />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
