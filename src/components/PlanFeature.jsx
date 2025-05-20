import React from 'react'
import { CiCircleCheck } from "react-icons/ci";

const PlanFeature = ({available, children}) => {
  return (
    <li className="flex items-start gap-2 text-start">
      {available ? (
        <CiCircleCheck className="h-6 w-6 text-purple-500 shrink-0 mt-0.5" />
      ) : (
        <div className="h-5 w-5 border border-white/20 rounded-full shrink-0 mt-0.5" />
      )}
      <span className={available ? "text-gray-200" : "text-gray-500"}>{children}</span>
    </li>
  );
}

export default PlanFeature