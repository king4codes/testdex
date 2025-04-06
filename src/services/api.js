// services/api.js
const API_KEY = process.env.REACT_APP_MORALIS_API_KEY;

/**
 * Fetch trending tokens
 * @param {string} chain - Optional chain ID filter
 * @param {number} limit - Number of results to return
 * @returns {Promise} Promise resolving to trending tokens data
 */
export const getTrendingTokens = async (chain = "", limit = 100) => {
  try {
    let url;
    if (chain === "solana") {
      url = `https://solana-gateway.moralis.io/token/mainnet/trending?limit=${limit}`;
    } else {
      const chainParam = chain ? `&chain=${chain}` : "";
      url = `https://deep-index.moralis.io/api/v2.2/tokens/trending?limit=${limit}${chainParam}`;
    }
    console.log("Fetching trending tokens from:", url);

    const response = await fetch(url, {
      headers: {
        accept: "application/json",
        "X-API-Key": API_KEY,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("API Error Response:", errorData);
      throw new Error(`API error: ${response.status} - ${errorData.message || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log("API Response Data:", data);

    // Transform the data to match our expected format
    const tokens = Array.isArray(data) ? data : (data.result || []);
    return tokens.map(token => ({
      chainId: token.chainId || chain,
      tokenAddress: token.tokenAddress || token.address,
      name: token.name,
      symbol: token.symbol,
      decimals: token.decimals,
      logo: token.logo || token.thumbnail,
      usdPrice: token.usdPrice || 0,
      createdAt: token.createdAt || Math.floor(Date.now() / 1000 - 86400),
      marketCap: parseFloat(token.marketCap || 0),
      liquidityUsd: parseFloat(token.liquidityUsd || token.liquidity || 0),
      pricePercentChange: {
        "1h": (token.pricePercentChange?.["1h"] || token.price_change_24h || 0) / 100,
        "4h": (token.pricePercentChange?.["4h"] || token.price_change_24h || 0) / 100,
        "12h": (token.pricePercentChange?.["12h"] || token.price_change_24h || 0) / 100,
        "24h": (token.pricePercentChange?.["24h"] || token.price_change_24h || 0) / 100
      },
      totalVolume: {
        "1h": token.volumeUsd?.["1h"] || token.volume_24h || 0,
        "4h": token.volumeUsd?.["4h"] || token.volume_24h || 0,
        "12h": token.volumeUsd?.["12h"] || token.volume_24h || 0,
        "24h": token.volumeUsd?.["24h"] || token.volume_24h || 0
      },
      transactions: {
        "24h": token.transactions?.["24h"] || token.txns_24h || 0
      },
      buyers: {
        "24h": token.buyers?.["24h"] || token.unique_buyers_24h || 0
      },
      sellers: {
        "24h": token.sellers?.["24h"] || token.unique_sellers_24h || 0
      }
    }));
  } catch (error) {
    console.error("Error fetching trending tokens:", error);
    throw error;
  }
};

/**
 * Search for tokens
 * @param {string} query - Search query
 * @param {Array} chains - Array of chain IDs to search
 * @param {number} limit - Number of results to return
 * @returns {Promise} Promise resolving to search results
 */
export const searchTokens = async (
  query,
  chains = ["eth", "solana", "bsc", "base"],
  limit = 20
) => {
  try {
    const chainsParam = chains.join(",");
    const url = `https://deep-index.moralis.io/api/v2.2/tokens/search?query=${encodeURIComponent(
      query
    )}&chains=${chainsParam}&limit=${limit}`;

    const response = await fetch(url, {
      headers: {
        accept: "application/json",
        "X-API-Key": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.result || [];
  } catch (error) {
    console.error("Error searching tokens:", error);
    throw error;
  }
};

/**
 * Get token price
 * @param {string} chainId - Chain ID
 * @param {string} tokenAddress - Token address
 * @returns {Promise} Promise resolving to token price data
 */
export const getTokenPrice = async (chainId, tokenAddress) => {
  try {
    // Convert chainId for Moralis API format if needed
    const chain = formatChainForApi(chainId);

    const url = `https://deep-index.moralis.io/api/v2.2/tokens/${chain}/${tokenAddress}/price`;
    const response = await fetch(url, {
      headers: {
        accept: "application/json",
        "X-API-Key": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching token price:", error);
    throw error;
  }
};

/**
 * Helper to format chain ID for API
 * @param {string} chainId - Chain ID in URL format
 * @returns {string} Chain ID in API format
 */
const formatChainForApi = (chainId) => {
  // Map URL format to API format
  const chainMap = {
    ethereum: "0x1",
    eth: "0x1",
    bsc: "0x38",
    polygon: "0x89",
    arbitrum: "0xa4b1",
    optimism: "0xa",
    base: "0x2105",
    solana: "solana",
  };

  return chainMap[chainId] || chainId;
};

export const getWalletNetWorth = async (address) => {
  try {
    // Construct query parameters for all supported chains
    const chains = [
      "eth",
      "bsc",
      "polygon",
      "arbitrum",
      "avalanche",
      "optimism",
      "linea",
      "pulse",
      "ronin",
      "base",
      "fantom",
    ];
    const chainParams = chains
      .map((chain, index) => `chains[${index}]=${chain}`)
      .join("&");

    const url = `https://deep-index.moralis.io/api/v2.2/wallets/${address}/net-worth?${chainParams}&exclude_spam=true&exclude_unverified_contracts=true`;

    const response = await fetch(url, {
      headers: {
        accept: "application/json",
        "X-API-Key": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching wallet net worth:", error);
    throw error;
  }
};

export const getWalletTokens = async (address, chain) => {
  try {
    const url = `https://deep-index.moralis.io/api/v2.2/wallets/${address}/tokens?chain=${chain}`;

    const response = await fetch(url, {
      headers: {
        accept: "application/json",
        "X-API-Key": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching wallet tokens:", error);
    throw error;
  }
};
