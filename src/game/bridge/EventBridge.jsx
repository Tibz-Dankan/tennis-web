import React from "react";
import { EventScoreBridge } from "./EventScoreBridge";
import { EventGameControlsBridget } from "./EventGameControlsBridget";

export const EventBridge = () => {
  return (
    <div>
      <EventScoreBridge />
      <EventGameControlsBridget />
    </div>
  );
};
