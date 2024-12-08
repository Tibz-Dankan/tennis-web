import { serverURL } from "../constants";

class TransactionAPI {
  get = async () => {
    const query = `
    query transactionsForAccount($first: Int) {
      me {
        id
        defaultAccount {
          transactions(first: $first) {
            pageInfo {
              endCursor
              hasNextPage
            }
            edges {
              cursor
              node {
                direction
                settlementCurrency
                settlementAmount
                settlementDisplayAmount
                status
                createdAt
              }
            }
          }
        }
      }
    }
  `;

    const variables = {
      first: 15,
    };
    const response = await fetch(`${serverURL}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.log("error: ", error);
      throw new Error("Error fetching transactions");
    }
    const data = await response.json();
    const transactions = data.data.me.defaultAccount.transactions;

    return transactions;
  };
}

export const transactionAPI = new TransactionAPI();
