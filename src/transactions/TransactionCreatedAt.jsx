import React, { useEffect, useState } from "react";
import { elapsedTime } from "../utils/elapsedTime";

export const TransactionCreatedAt = ({ createdAt }) => {
  const [elapseTime, setElapseTime] = useState(
    elapsedTime(parseInt(createdAt))
  );

  const updateElapsedTime = (createdAt) => {
    if (!createdAt) return;
    setElapseTime(() => elapsedTime(parseInt(createdAt)));
  };

  // update createdAt value at the
  // start of every minute and after
  // every 30 seconds
  useEffect(() => {
    // Run when ever createdAt changes
    updateElapsedTime(createdAt);
    const now = new Date();
    const delayToNextMinute =
      (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    // Run at the start of every minute
    const initialTimeoutId = setTimeout(() => {
      updateElapsedTime(createdAt);
      // Run after every 30 seconds
      const intervalId = setInterval(() => {
        updateElapsedTime(createdAt);
      }, 30000);

      return () => clearInterval(intervalId);
    }, delayToNextMinute);

    return () => clearTimeout(initialTimeoutId);
  }, [createdAt, elapseTime, setElapseTime]);

  return (
    <div>
      <span>{elapseTime}</span>
    </div>
  );
};
