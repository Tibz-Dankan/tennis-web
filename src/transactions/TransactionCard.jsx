import React from "react";
import { FlashIcon } from "../icons/FlashIcon";
import { TransactionCreatedAt } from "./TransactionCreatedAt";

export const TransactionCard = (props) => {
  return (
    <div
      className="w-full flex items-center justify-between
       border-b-[1px] border-gray-300 bg-gray-200 gap-8
       text-sm px-4 py-2"
    >
      <div className="flex items-center justify-center gap-4">
        <div>
          <FlashIcon className="text-orange-500 w-5 h-5" />
        </div>
        <div
          className="text-gray-800 flex flex-col gap-0 
          justify-center items-start"
        >
          <span>From mmaken</span>
          <TransactionCreatedAt createdAt={props.createdAt} />
        </div>
      </div>
      <div
        className="text-green-500 flex flex-col gap-0 
          justify-center items-start"
      >
        <span>${props.settlementDisplayAmount}</span>
        <span>{props.settlementAmount} SAT</span>
      </div>
    </div>
  );
};
