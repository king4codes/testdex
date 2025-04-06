// components/layout/TopBar/index.js
import React from "react";
import { useNavigate } from "react-router-dom";
import FilterTools from "./FilterTools";

const TopBar = ({
  chainId,
  isFiltered,
  openFiltersModal,
  sortBy,
  onSortChange,
}) => {
  const navigate = useNavigate();

  // Network buttons with RuneScape-themed locations
  const networks = [
    { id: "", name: "All Realms", icon: "🌍" },
    { id: "solana", name: "Lumbridge", icon: "🏰" },
    { id: "ethereum", name: "Varrock", icon: "🏛️" },
    { id: "base", name: "Falador", icon: "⚔️" },
    { id: "bsc", name: "Al Kharid", icon: "🏜️" },
    { id: "ronin", name: "Draynor", icon: "🌳" },
  ];

  // Page navigation buttons with RuneScape theme
  const pages = [
    { id: "portfolio", name: "Bank", icon: "💰" },
    { id: "pumpfun", name: "Grand Exchange", icon: "🏪" },
  ];

  return (
    <div className="bg-rs-card-bg border-b border-rs-gold/50 p-4 sticky top-0 z-10">
      <div className="flex items-center justify-between flex-wrap gap-3">
        {/* Network buttons */}
        <div className="flex items-center flex-wrap gap-2">
          <div className="flex space-x-2">
            {networks.map((network) => (
              <button
                key={network.id}
                className={`flex items-center px-3 py-2 rounded text-sm ${
                  (network.id === "" && chainId === undefined) ||
                  chainId === network.id
                    ? "bg-rs-gold/20 border border-rs-gold text-rs-gold"
                    : "bg-rs-card-bg border border-rs-gold/50 text-rs-text hover:border-rs-gold hover:text-rs-gold"
                }`}
                onClick={() => navigate(`/${network.id}`)}
              >
                <span className="mr-1">{network.icon}</span>
                {network.name}
              </button>
            ))}
          </div>
        </div>

        {/* Page navigation buttons - centered */}
        <div className="flex items-center justify-center">
          <div className="flex space-x-2">
            {pages.map((page) => (
              <button
                key={page.id}
                className="flex items-center bg-rs-card-bg border border-rs-gold/50 text-rs-text hover:border-rs-gold hover:text-rs-gold rounded px-3 py-2 text-sm"
                onClick={() => navigate(`/${page.id}`)}
              >
                <span className="mr-1">{page.icon}</span>
                {page.name}
              </button>
            ))}
          </div>
        </div>

        {/* Sorting and filtering tools */}
        <div className="flex items-center">
          <FilterTools
            isFiltered={isFiltered}
            openFiltersModal={openFiltersModal}
            sortBy={sortBy}
            onSortChange={onSortChange}
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
