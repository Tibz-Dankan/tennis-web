import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTransactionStore } from "../store/transaction";
import { transactionAPI } from "../API/transaction";
import { Transaction } from "./Transaction";

export const TransactionWrapper = () => {
  const updateTransactions = useTransactionStore(
    (state) => state.updateTransactions
  );
  const updateFirstTransaction = useTransactionStore(
    (state) => state.updateFirstTransaction
  );

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["transactions"],
    queryFn: transactionAPI.get,
  });

  useEffect(() => {
    const updateTransactionHandler = () => {
      if (!data) return;
      updateTransactions(data);
      updateFirstTransaction(data?.edges[0]);
      // updateFirstTransaction(JSON.stringify(data?.edges[0]));
    };
    updateTransactionHandler();
  }, [data]);

  if (isPending) {
    return (
      <div
        className="w-full h-10 flex items-center justify-center
         bg-gray-200 rounded-md px-4"
      >
        <span className="text-lg text-gray-700">Loading...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="w-full h-10 flex items-center justify-center
       bg-gray-200 rounded-md px-4"
      >
        <div className="text-red-500">
          <span>Error fetching Transactions</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Transaction />
    </div>
  );
};
