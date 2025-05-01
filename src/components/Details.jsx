import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const Details = ({ id, content, title }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      key={id}
      className={` text-start
        border  rounded-lg overflow-hidden"
        ${isOpen ? "border-purple-500/30" : "border-white/10"}`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex w-full items-center justify-between bg-white/5 px-4 py-3 text-left transition-colors ${
          isOpen ? "bg-purple-900/20" : "bg-white/5"
        }`}
      >
        <span
          className={`
          font-medium  transition-colors
          ${isOpen ? "text-purple-400" : "text-white"}`}
        >
          {title}
        </span>
        <FaChevronDown
          className={`h-5 w-5 text-white/70 transition-transform duration-300
            ${isOpen && "rotate-180 text-purple-400"}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4 text-gray-300">{content}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Details;
