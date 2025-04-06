// components/layout/LeftSidebar/ChainSelector.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChainSelector = () => {
  const [selectedChain, setSelectedChain] = useState("");
  const navigate = useNavigate();

  // Define the supported chains with their display names and IDs
  const CHAINS = [
    { id: "solana", name: "Varrock", icon: "🏰" },
    { id: "0x1", name: "Lumbridge", icon: "🌳" },
    { id: "0x38", name: "Al Kharid", icon: "🏜️" },
    { id: "0x2105", name: "Falador", icon: "⚔️" },
    { id: "0xa4b1", name: "Ardougne", icon: "🏪" },
    { id: "0x89", name: "Catherby", icon: "🎣" },
    { id: "0xa86a", name: "Seers Village", icon: "🔮" },
    { id: "0xa", name: "Draynor", icon: "🌲" },
    { id: "0xe708", name: "Edgeville", icon: "🗡️" },
    { id: "0xfa", name: "Wilderness", icon: "💀" },
    { id: "0x171", name: "Karamja", icon: "🌴" },
    { id: "0x7e4", name: "Port Sarim", icon: "⚓" },
  ];

  // Map chain IDs to URL paths
  const CHAIN_PATH_MAP = {
    solana: "solana",
    "0x1": "ethereum",
    "0x7e4": "ronin",
    "0x38": "binance",
    "0x2105": "base",
    "0xa4b1": "arbitrum",
    "0x89": "polygon",
    "0xa86a": "avalanche",
    "0xa": "optimism",
    "0xe708": "linea",
    "0xfa": "fantom",
    "0x171": "pulse",
  };

  const handleChainClick = (chainId) => {
    setSelectedChain(chainId);

    // If "All Chains" is selected, go to homepage
    if (!chainId) {
      navigate("/");
    } else {
      // Otherwise navigate to the chain-specific page
      const pathSegment = CHAIN_PATH_MAP[chainId] || chainId;
      navigate(`/${pathSegment}`);
    }
  };

  return (
    <div>
      <h3 className="rs-header text-center mb-2">
        Trading Posts
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {CHAINS.map((chain) => (
          <button
            key={chain.id}
            onClick={() => handleChainClick(chain.id)}
            className={`rs-button flex flex-col items-center p-2 text-sm ${
              selectedChain === chain.id ? "brightness-125" : ""
            }`}
          >
            <span className="text-xl mb-1">{chain.icon}</span>
            <span className="text-xs">{chain.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChainSelector;
