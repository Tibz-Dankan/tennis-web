import React from "react";
import { twMerge } from "tailwind-merge";

export const CloseIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20px"
      height="20px"
      viewBox="0 0 24 24"
      className={twMerge(`text-text-clr`, props.className)}
    >
      <path
        fill="currentColor"
        d="m12 10.587l4.95-4.95l1.414 1.414l-4.95 4.95l4.95 4.95l-1.415 1.414l-4.95-4.95l-4.949 4.95l-1.414-1.415l4.95-4.95l-4.95-4.95L7.05 5.638z"
      />
    </svg>
  );
};