"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import TextFooter from "@/components/TextFooter";
import PhotoPairGame from "../components/PhotoPairGame";
import ValentinesProposal from "@/components/ValentinesProposal";

const ANIM_DURATION = 2;
const SKIP_PASSWORD = "iloveyou";

export default function Home() {
  const [showValentinesProposal, setShowValentinesProposal] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState("");

  const handleShowProposal = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setShowValentinesProposal(true);
    }, ANIM_DURATION * 1000);
  };

  const handlePasswordSubmit = () => {
    if (password.toLowerCase() === SKIP_PASSWORD) {
      handleShowProposal();
      setShowPasswordInput(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black relative px-10">
      {!showValentinesProposal ? (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isTransitioning ? 0 : 1 }}
          transition={{ duration: ANIM_DURATION }}
        >
          <PhotoPairGame handleShowProposal={handleShowProposal} />
          <TextFooter />

          {/* Skip Password Button */}
          <button
            onClick={() => setShowPasswordInput(!showPasswordInput)}
            className="absolute top-4 right-4 text-white text-xs opacity-20 hover:opacity-50"
          >
            🔑
          </button>

          {/* Password Input */}
          {showPasswordInput && (
            <div className="absolute top-12 right-4 flex gap-2">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handlePasswordSubmit()}
                placeholder="Password"
                className="px-2 py-1 text-sm rounded bg-gray-800 text-white border border-gray-600 w-24"
              />
              <button
                onClick={handlePasswordSubmit}
                className="px-2 py-1 text-sm bg-pink-500 text-white rounded hover:bg-pink-600"
              >
                Skip
              </button>
            </div>
          )}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: ANIM_DURATION }}
        >
          <ValentinesProposal />
        </motion.div>
      )}
    </div>
  );
}
