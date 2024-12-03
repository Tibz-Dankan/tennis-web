import React from "react";
import { useSocketEvent } from "./useSocketEvent";

export const SocketConfig = ({ socket }) => {
  useSocketEvent({ socket: socket });
  return <div></div>;
};
