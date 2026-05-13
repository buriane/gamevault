"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2 } from "lucide-react";

export default function SplashScreen() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Check if the splash screen has been shown in the current session
    const hasSeenSplash = sessionStorage.getItem("splashShown");
    
    if (hasSeenSplash) {
      const instantHide = setTimeout(() => setShowSplash(false), 0);
      return () => clearTimeout(instantHide);
    }

    const timer = setTimeout(() => {
      setShowSplash(false);
      sessionStorage.setItem("splashShown", "true");
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          id="global-splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-slate-950"
          aria-label="Loading GameVault..."
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center gap-4 sm:gap-6"
          >
            {/* Logo box with pulsing shadow */}
            <motion.div 
              animate={{ 
                boxShadow: [
                  "0px 0px 0px 0px rgba(56, 189, 248, 0)",
                  "0px 0px 30px 8px rgba(56, 189, 248, 0.4)",
                  "0px 0px 0px 0px rgba(56, 189, 248, 0)"
                ]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl bg-linear-to-br from-sky-400 to-blue-600 shadow-xl"
            >
              <Gamepad2 className="w-10 h-10 sm:w-12 sm:h-12 text-white" aria-hidden="true" />
            </motion.div>
            
            {/* Text */}
            <span className="text-3xl sm:text-4xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-sky-400 to-blue-500">
              GameVault
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
