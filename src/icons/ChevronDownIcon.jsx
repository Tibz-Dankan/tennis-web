import React from "react";
import { twMerge } from "tailwind-merge";

export const ChevronDownIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20px"
      height="20px"
      viewBox="0 0 20 20"
      className={twMerge(`text-gray-700`, props.className)}
    >
      <path
        fill="currentColor"
        d="M15.794 7.733a.75.75 0 0 1-.026 1.06l-5.25 5.001a.75.75 0 0 1-1.035 0l-5.25-5a.75.75 0 0 1 1.034-1.087l4.734 4.509l4.733-4.51a.75.75 0 0 1 1.06.027"
      />
    </svg>
  );
};
