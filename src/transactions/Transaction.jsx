import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { TransactionList } from "./TransactionList";
import { Modal } from "../shared/Modal";
import { useTransactionStore } from "../store/transaction";
import { TransactionCard } from "./TransactionCard";
import { transactionAPI } from "../API/transaction";
import { Loader } from "../loaders/Loader";
import { ChevronDownIcon } from "../icons/ChevronDownIcon";

export const Transaction = () => {
  const isTransacting = useTransactionStore((state) => state.isTransacting);
  const lastTransaction = useTransactionStore((state) => state.fistTransaction);

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

  const transactions = useTransactionStore(
    (state) => state.transactions?.edges
  );

  const hasTransaction = !!transactions;

  useEffect(() => {
    const updateTransactionHandler = () => {
      if (!data) return;
      updateTransactions(data);
      updateFirstTransaction(data?.edges[0]);
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
      <Modal
        openModalElement={
          <div
            className="flex items-center justify-center gap-2
            bg-gray-200 rounded-md px-4 cursor-pointer"
          >
            <div
              className="w-48 h-10 flex items-center justify-center 
               transition-all"
            >
              {isTransacting ? (
                <Loader className="text-blue-500" />
              ) : (
                <span className="text-gray-700 text-center">Transaction</span>
              )}
            </div>
            {hasTransaction && (
              <TransactionCard
                settlementDisplayAmount={
                  lastTransaction?.node?.settlementDisplayAmount
                }
                settlementAmount={lastTransaction?.node?.settlementAmount}
                createdAt={lastTransaction?.node?.createdAt}
              />
            )}
            <div>
              <ChevronDownIcon />
            </div>
          </div>
        }
        className="p-4 bg-gray-100 rounded-md"
      >
        <div className="mb-4">
          <span className="text-lg text-gray-700">Transaction History</span>
        </div>
        <div className=" w-96 h-[70vh] overflow-x-hidden">
          <TransactionList />
        </div>
      </Modal>
    </div>
  );
};
