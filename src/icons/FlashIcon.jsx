import React from "react";
import { twMerge } from "tailwind-merge";

export const FlashIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      //   width="512"
      //   height="512"
      viewBox="0 0 512 512"
      className={twMerge(`w-4 h-4`, props.className)}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        d="M315.27 33L96 304h128l-31.51 173.23a2.36 2.36 0 0 0 2.33 2.77h0a2.36 2.36 0 0 0 1.89-.95L416 208H288l31.66-173.25a2.45 2.45 0 0 0-2.44-2.75h0a2.42 2.42 0 0 0-1.95 1"
      />
    </svg>
  );
};
