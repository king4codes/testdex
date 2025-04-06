// components/trending/TrendingTable/TokenRow.js
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  formatNumber,
  formatAge,
  formatPrice,
} from "../../../utils/formatters";

const TokenRow = ({ token, rank }) => {
  const getChainPath = (chainId) => {
    const chainPathMap = {
      ethereum: "0x1",
      binance: "0x38",
      bsc: "0x38", // Alternative name
      polygon: "0x89",
      solana: "solana",
      arbitrum: "0xa4b1",
      base: "0x2105",
      avalanche: "0xa86a",
      optimism: "0xa",
      linea: "0xe708",
      fantom: "0xfa",
      pulse: "0x171",
      ronin: "0x7e4",
    };

    return chainPathMap[token.chainId] || token.chainId;
  };

  const navigate = useNavigate();

  const handleTokenClick = () => {
    navigate(`/${getChainPath(token.chainId)}/${token.tokenAddress}`, {
      state: {
        tokenData: {
          address: token.tokenAddress,
          name: token.name,
          symbol: token.symbol,
          logo: token.logo,
          decimals: token.decimals,
        },
      },
    });
  };

  const getNestedValue = (obj, path, defaultValue = 0) => {
    if (!obj) return defaultValue;

    const keys = path.split(".");
    let current = obj;

    for (const key of keys) {
      if (current[key] === undefined || current[key] === null) {
        return defaultValue;
      }
      current = current[key];
    }

    return current;
  };

  return (
    <tr
      onClick={handleTokenClick}
      className="hover:bg-rs-brown transition-colors cursor-pointer"
    >
      <td className="px-4 py-3 text-center">{rank}</td>
      <td className="px-4 py-3">
        <Link
          to={`/${getChainPath(token.chainId)}/${token.tokenAddress}`}
          className="flex items-center"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="flex items-center">
            <div className="rs-inventory-slot mr-3">
              <img
                src={token.logo || "/images/tokens/default-token.svg"}
                alt={token.symbol}
                className="w-6 h-6"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjEwMCIgZmlsbD0iIzM0Mzk0NyIvPjwvc3ZnPg==";
                }}
              />
            </div>
            <div>
              <div className="font-medium text-rs-text flex items-center">
                <span>{token.symbol}</span>
                {token.lightning && (
                  <span className="ml-2 text-rs-gold text-xs">
                    ⚡{token.lightning}
                  </span>
                )}
              </div>
              <div className="text-xs text-rs-light-brown">
                {token.name}
              </div>
            </div>
          </div>
        </Link>
      </td>
      <td className="px-4 py-3 text-right font-bold text-rs-gold">
        ${formatPrice(token.usdPrice)}
      </td>
      <td className="px-4 py-3 text-right text-rs-light-brown">
        {formatAge(token.createdAt * 1000)}
      </td>
      <td className="px-4 py-3 text-right">
        {formatNumber(getNestedValue(token, "transactions.24h", 0))}
      </td>
      <td className="px-4 py-3 text-right">
        ${formatNumber(getNestedValue(token, "totalVolume.24h", 0))}
      </td>
      <td className="px-4 py-3 text-right">
        {formatNumber(
          getNestedValue(token, "buyers.24h", 0) +
            getNestedValue(token, "sellers.24h", 0)
        )}
      </td>

      <PriceChangeCell
        value={token.pricePercentChange && token.pricePercentChange["1h"] * 100}
      />
      <PriceChangeCell
        value={token.pricePercentChange && token.pricePercentChange["1h"] * 100}
      />
      <PriceChangeCell
        value={
          token.pricePercentChange && token.pricePercentChange["12h"] * 100
        }
      />
      <PriceChangeCell
        value={
          token.pricePercentChange && token.pricePercentChange["24h"] * 100
        }
      />

      <td className="px-4 py-3 text-right text-rs-text">
        ${formatNumber(token.liquidityUsd)}
      </td>
      <td className="px-4 py-3 text-right text-rs-text">
        ${formatNumber(token.marketCap)}
      </td>
    </tr>
  );
};

const PriceChangeCell = ({ value }) => (
  <td
    className={`px-4 py-3 text-right ${
      value >= 0 ? "text-green-400" : "text-red-400"
    } font-bold`}
  >
    {value ? `${value >= 0 ? "+" : ""}${(value * 100).toFixed(2)}%` : "-"}
  </td>
);

export default TokenRow;
