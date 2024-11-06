import { Block, DateSpan } from "../../model/model.interface";

export const fetchEthRewards = async (dates: DateSpan): Promise<Block[]> => {
  const url = process.env.REACT_APP_API_BASE_URL;
  const apiKey = process.env.REACT_APP_API_KEY;
  const { since, till } = dates;

  if (!url || !apiKey) throw new Error("Missing API configuration");

  const query = `
    query ($network: EthereumNetwork, $since: ISO8601DateTime, $till: ISO8601DateTime) {  
      ethereum(network: $network) {
        blocks(date: {since: $since, till: $till}) {
          reward: reward(in:USD)
          date {
            date
          }
        }
      }
    }`;

  const variables = {
    network: "ethereum",
    since,
    till,
    dateFormat: "%Y-%m-%d",
  };

  const headers = new Headers({
    "Content-Type": "application/json",
    "X-API-KEY": apiKey,
  });

  const body = JSON.stringify({ query, variables });

  try {
    const res = await fetch(url, { method: "POST", headers, body });
    if (!res.ok) {
      throw new Error(`Error fetching data: ${res.statusText}`);
    }

    const data = await res.json();
    if (!data?.data?.ethereum?.blocks) {
      throw new Error("Unexpected data structure");
    }
    return data.data.ethereum.blocks as Block[];
  } catch (error) {
    console.error("Error fetching blocks:", error);
    throw new Error("Failed to fetch blocks data");
  }
};
