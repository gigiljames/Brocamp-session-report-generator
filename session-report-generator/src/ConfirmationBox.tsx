import {
  confirmable,
  createConfirmation,
  type ConfirmDialogProps,
} from "react-confirm";

import { AnimatePresence, motion } from "framer-motion";

const MyDialog = ({
  show,
  proceed,
  message,
}: ConfirmDialogProps<{ message: string }, boolean>) => {
  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-sm bg-slate-900 rounded-xl border border-slate-800 shadow-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-slate-200 mb-2">
              Confirm Action
            </h3>
            <p className="text-slate-400 mb-6 leading-relaxed">{message}</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => proceed(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => proceed(true)}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-900/20 transition-all"
              >
                Confirm
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export const confirm = createConfirmation(confirmable(MyDialog));
