import React from "react";
import { useEventScoreBridge } from "./useEventScoreBridge";
import { useEventGameControlsBridget } from "./useEventGameControlsBridget";

export const EventBridge = () => {
  useEventScoreBridge();
  useEventGameControlsBridget();
  return <div></div>;
};
