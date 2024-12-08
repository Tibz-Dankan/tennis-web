import React from "react";
import { useTransactionStore } from "../store/transaction";
import { TransactionCard } from "./TransactionCard";

export const TransactionList = () => {
  const transactions = useTransactionStore(
    (state) => state.transactions?.edges
  );

  return (
    <div className="w-full">
      {transactions?.map((transaction, index) => (
        <div className="w-full" key={index}>
          <TransactionCard
            settlementDisplayAmount={transaction?.node?.settlementDisplayAmount}
            settlementAmount={transaction?.node?.settlementAmount}
            createdAt={transaction?.node?.createdAt}
          />
        </div>
      ))}
    </div>
  );
};
