import React, { useEffect, useState } from "react";
import { elapsedTime } from "../utils/elapsedTime";

export const TransactionCreatedAt = ({ createdAt }) => {
  const [elapseTime, setElapseTime] = useState(
    elapsedTime(parseInt(createdAt))
  );

  const updateElapsedTime = () => {
    if (!createdAt) return;
    setElapseTime(() => elapsedTime(parseInt(createdAt)));
  };

  // update createdAt value at the
  // start of every minute and after
  // every 30 seconds
  useEffect(() => {
    const now = new Date();
    const delayToNextMinute =
      (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    const initialTimeoutId = setTimeout(() => {
      updateElapsedTime();
      const intervalId = setInterval(updateElapsedTime, 30000);

      return () => clearInterval(intervalId);
    }, delayToNextMinute);

    return () => clearTimeout(initialTimeoutId);
  }, [elapseTime, setElapseTime]);

  return (
    <div>
      <span>{elapseTime}</span>
    </div>
  );
};
