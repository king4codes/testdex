import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import NewTokenCard from "../components/pumpfun/NewTokenCard";
import BondingTokenCard from "../components/pumpfun/BondingTokenCard";
import GraduatedTokenCard from "../components/pumpfun/GraduatedTokenCard";

const API_KEY = process.env.REACT_APP_MORALIS_API_KEY;

const PumpFunPage = () => {
  const navigate = useNavigate();
  const [newTokens, setNewTokens] = useState([]);
  const [bondingTokens, setBondingTokens] = useState([]);
  const [graduatedTokens, setGraduatedTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTokensIds, setNewTokensIds] = useState(new Set());
  const pollingInterval = useRef(null);

  // Load tokens on initial render
  useEffect(() => {
    fetchAllTokens();

    // Set up polling to check for new tokens every 30 seconds
    pollingInterval.current = setInterval(fetchAllTokens, 30000);

    return () => {
      if (pollingInterval.current) {
        clearInterval(pollingInterval.current);
      }
    };
  }, []);

  const fetchAllTokens = async () => {
    setLoading(true);
    try {
      console.log("Starting to fetch all tokens...");
      await Promise.all([
        fetchNewTokens(),
        fetchBondingTokens(),
        fetchGraduatedTokens(),
      ]);
    } catch (err) {
      console.error("Error fetching pump.fun tokens:", err);
      setError(`Failed to load pump.fun tokens: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchNewTokens = async () => {
    try {
      console.log("Fetching new tokens...");
      if (!API_KEY) {
        throw new Error("API key is not configured");
      }

      const url = "https://solana-gateway.moralis.io/token/mainnet/exchange/pumpfun/new?limit=100";
      console.log("Calling API:", url);
      const response = await fetch(url, {
        headers: {
          accept: "application/json",
          "X-API-Key": API_KEY,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);
        throw new Error(`API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("New tokens data:", data);

      const incomingTokens = data.result || [];
      const previousTokenIds = new Set(newTokensIds);

      setNewTokensIds(
        new Set([
          ...previousTokenIds,
          ...incomingTokens.map((token) => token.tokenAddress),
        ])
      );

      const brandNewTokens = incomingTokens.filter(
        (token) => !previousTokenIds.has(token.tokenAddress)
      );

      const tokensWithFlag = incomingTokens.map((token) => ({
        ...token,
        isNew: brandNewTokens.some(
          (newToken) => newToken.tokenAddress === token.tokenAddress
        ),
      }));

      setNewTokens(tokensWithFlag);
    } catch (err) {
      console.error("Error fetching new tokens:", err);
      throw err;
    }
  };

  const fetchBondingTokens = async () => {
    try {
      console.log("Fetching bonding tokens...");
      if (!API_KEY) {
        throw new Error("API key is not configured");
      }

      const url = "https://solana-gateway.moralis.io/token/mainnet/exchange/pumpfun/bonding?limit=100";
      console.log("Calling API:", url);
      const response = await fetch(url, {
        headers: {
          accept: "application/json",
          "X-API-Key": API_KEY,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);
        throw new Error(`API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("Bonding tokens data:", data);
      setBondingTokens(data.result || []);
    } catch (err) {
      console.error("Error fetching bonding tokens:", err);
      throw err;
    }
  };

  const fetchGraduatedTokens = async () => {
    try {
      console.log("Fetching graduated tokens...");
      if (!API_KEY) {
        throw new Error("API key is not configured");
      }

      const url = "https://solana-gateway.moralis.io/token/mainnet/exchange/pumpfun/graduated?limit=100";
      console.log("Calling API:", url);
      const response = await fetch(url, {
        headers: {
          accept: "application/json",
          "X-API-Key": API_KEY,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);
        throw new Error(`API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("Graduated tokens data:", data);
      setGraduatedTokens(data.result || []);
    } catch (err) {
      console.error("Error fetching graduated tokens:", err);
      throw err;
    }
  };

  const handleTokenClick = (token) => {
    navigate(`/solana/${token.tokenAddress}`);
  };

  // Format price with appropriate decimals
  const formatPrice = (price) => {
    if (!price) return "$0";

    const numPrice = parseFloat(price);

    if (numPrice < 0.000001) {
      return "$" + numPrice.toExponential(4);
    } else if (numPrice < 0.001) {
      return "$" + numPrice.toFixed(8);
    } else if (numPrice < 1) {
      return "$" + numPrice.toFixed(6);
    } else {
      return "$" + numPrice.toFixed(4);
    }
  };

  // Format liquidity and market cap
  const formatNumber = (num) => {
    if (!num) return "$0";

    const numValue = parseFloat(num);

    if (numValue >= 1000000) {
      return `$${(numValue / 1000000).toFixed(2)}M`;
    } else if (numValue >= 1000) {
      return `$${(numValue / 1000).toFixed(2)}K`;
    } else {
      return `$${numValue.toFixed(2)}`;
    }
  };

  // Format date to relative time
  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) {
      return `${seconds}s ago`;
    } else if (seconds < 3600) {
      return `${Math.floor(seconds / 60)}m ago`;
    } else if (seconds < 86400) {
      return `${Math.floor(seconds / 3600)}h ago`;
    } else {
      return `${Math.floor(seconds / 86400)}d ago`;
    }
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      {loading &&
      newTokens.length === 0 &&
      bondingTokens.length === 0 &&
      graduatedTokens.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-dex-blue"></div>
          <span className="text-dex-text-primary ml-3">Loading tokens...</span>
        </div>
      ) : error ? (
        <div className="text-dex-red text-sm p-4 rounded">
          {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* New Tokens Column */}
          <div>
            <div className="bg-dex-bg-secondary rounded-lg p-4 mb-4">
              <h2 className="text-xl font-semibold text-rs-text flex items-center">
                <span className="mr-2">🏺</span> Fresh Stock
                <span className="text-xs text-rs-light-brown ml-2">by Barron</span>
              </h2>
            </div>

            <div className="space-y-4">
              {newTokens.length === 0 ? (
                <div className="text-center py-10 text-dex-text-secondary">
                  No new tokens found
                </div>
              ) : (
                newTokens.map((token) => (
                  <NewTokenCard
                    key={token.tokenAddress}
                    token={token}
                    formatPrice={formatPrice}
                    formatNumber={formatNumber}
                    formatTimeAgo={formatTimeAgo}
                    onClick={() => handleTokenClick(token)}
                  />
                ))
              )}
            </div>
          </div>

          {/* Bonding Tokens Column */}
          <div>
            <div className="bg-dex-bg-secondary rounded-lg p-4 mb-4">
              <h2 className="text-xl font-semibold text-rs-text flex items-center">
                <span className="mr-2">⚒️</span> Crafting Items
                <span className="text-xs text-rs-light-brown ml-2">by Barron</span>
              </h2>
            </div>

            <div className="space-y-4">
              {bondingTokens.length === 0 ? (
                <div className="text-center py-10 text-dex-text-secondary">
                  No bonding tokens found
                </div>
              ) : (
                bondingTokens.map((token) => (
                  <BondingTokenCard
                    key={token.tokenAddress}
                    token={token}
                    formatPrice={formatPrice}
                    formatNumber={formatNumber}
                    onClick={() => handleTokenClick(token)}
                  />
                ))
              )}
            </div>
          </div>

          {/* Graduated Tokens Column */}
          <div>
            <div className="bg-dex-bg-secondary rounded-lg p-4 mb-4">
              <h2 className="text-xl font-semibold text-rs-text flex items-center">
                <span className="mr-2">🏆</span> Legendary Items
                <span className="text-xs text-rs-light-brown ml-2">by Barron</span>
              </h2>
            </div>

            <div className="space-y-4">
              {graduatedTokens.length === 0 ? (
                <div className="text-center py-10 text-dex-text-secondary">
                  No graduated tokens found
                </div>
              ) : (
                graduatedTokens.map((token) => (
                  <GraduatedTokenCard
                    key={token.tokenAddress}
                    token={token}
                    formatPrice={formatPrice}
                    formatNumber={formatNumber}
                    formatTimeAgo={formatTimeAgo}
                    onClick={() => handleTokenClick(token)}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PumpFunPage;
