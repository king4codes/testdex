import React from "react";
import { useNavigate } from "react-router-dom";

const SearchResults = ({ results, onClose }) => {
  const navigate = useNavigate();

  const formatPrice = (price) => {
    if (!price) return "0 coins";

    // For very small prices (less than 0.00001)
    if (price < 0.00001) {
      return price.toFixed(10).replace(/\.?0+$/, "") + " coins";
    }

    // For small prices
    if (price < 0.01) {
      return price.toFixed(6) + " coins";
    }

    // For medium prices
    if (price < 1000) {
      return price.toFixed(4) + " coins";
    }

    // For large prices, use K/M/B notation like RuneScape
    if (price >= 1000000000) {
      return (price / 1000000000).toFixed(1) + "B coins";
    }
    if (price >= 1000000) {
      return (price / 1000000).toFixed(1) + "M coins";
    }
    if (price >= 1000) {
      return (price / 1000).toFixed(1) + "K coins";
    }
  };

  const formatPercentChange = (change) => {
    if (!change) return "N/A";
    return `${change >= 0 ? "+" : ""}${change.toFixed(1)}%`;
  };

  const getChainIcon = (chainId) => {
    const chainMap = {
      "0x1": "lumbridge",
      solana: "varrock",
      bsc: "alkharid",
      "0x38": "alkharid",
      polygon: "falador",
      "0x89": "falador",
      base: "draynor",
      "0x2105": "draynor",
      arbitrum: "ardougne",
      "0xa4b1": "ardougne",
      optimism: "seers",
      "0xa": "seers",
      linea: "edgeville",
      "0xe708": "edgeville",
      fantom: "wilderness",
      "0xfa": "wilderness",
      pulse: "karamja",
      "0x171": "karamja",
      ronin: "portsarim",
      "0x7e4": "portsarim",
    };

    const chain = chainMap[chainId] || "generic";
    return `/images/locations/${chain}.svg`;
  };

  const handleTokenClick = (token) => {
    const chainPathMap = {
      "0x1": "ethereum",
      solana: "solana",
      bsc: "bsc",
      polygon: "polygon",
      base: "base",
      arbitrum: "arbitrum",
      optimism: "optimism",
    };

    const chain = chainPathMap[token.chainId] || token.chainId;
    navigate(`/${chain}/${token.tokenAddress}`);
    onClose();
  };

  if (results.length === 0) {
    return (
      <div className="p-4">
        <div className="rs-alert rs-alert-warning text-center">
          No items found in the Grand Exchange
        </div>
      </div>
    );
  }

  return (
    <div className="rs-feed">
      {results.map((token) => (
        <div
          key={`${token.chainId}-${token.tokenAddress}`}
          className="rs-feed-item flex items-center"
          onClick={() => handleTokenClick(token)}
        >
          <div className="flex items-center flex-1">
            <div className="rs-inventory-slot mr-3">
              <img
                src={token.logo || "/images/items/default-item.png"}
                alt={token.symbol}
                className="w-8 h-8"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjEwMCIgZmlsbD0iIzM0Mzk0NyIvPjwvc3ZnPg==";
                }}
              />
            </div>
            <div>
              <div className="font-medium flex items-center">
                <span className="text-rs-text">{token.symbol}</span>
                <span className="ml-2 text-xs text-rs-light-brown">
                  {token.chainId === "solana" ? "Varrock" : "Lumbridge"}
                </span>
              </div>
              <div className="text-sm text-rs-light-brown">{token.name}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-medium text-rs-gold">{formatPrice(token.usdPrice)}</div>
            {token.usdPricePercentChange &&
              token.usdPricePercentChange.oneDay !== undefined && (
                <div
                  className={`text-sm font-bold ${
                    token.usdPricePercentChange.oneDay >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {formatPercentChange(token.usdPricePercentChange.oneDay)}
                </div>
              )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
