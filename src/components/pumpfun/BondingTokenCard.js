import React from "react";

const BondingTokenCard = ({ token, formatPrice, formatNumber, onClick }) => {
  // Calculate progress percentage
  const progress = Math.min(
    (token.currentBonding / token.targetBonding) * 100,
    100
  );

  // Get progress color based on percentage
  const getProgressColor = (percent) => {
    if (percent >= 80) return "bg-rs-gold";
    if (percent >= 50) return "bg-rs-gold/70";
    if (percent >= 20) return "bg-rs-gold/50";
    return "bg-rs-gold/30";
  };

  return (
    <div
      className="rs-button w-full cursor-pointer"
      onClick={onClick}
    >
      <div className="p-4">
        <div className="flex items-center mb-3">
          <div className="h-12 w-12 rs-inventory-slot mr-3 flex items-center justify-center overflow-hidden">
            {token.logo ? (
              <img
                src={token.logo}
                alt={token.symbol}
                className="h-10 w-10 object-cover"
                onError={(e) => {
                  e.target.onError = null;
                  e.target.src =
                    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjEwMCIgZmlsbD0iIzJmNGEyNSIvPjwvc3ZnPg==";
                }}
              />
            ) : (
              <span className="text-rs-gold font-bold">
                {token.symbol ? token.symbol.charAt(0) : "?"}
              </span>
            )}
          </div>
          <div>
            <h3 className="font-bold text-rs-gold">{token.symbol}</h3>
            <p className="text-sm text-rs-light-brown truncate max-w-[200px]">
              {token.name}
              <span className="text-xs ml-1">by Barron</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3">
          <div>
            <p className="text-xs text-rs-light-brown">Price</p>
            <p className="font-medium text-rs-text">
              {formatPrice(token.priceUsd)}
            </p>
          </div>
          <div>
            <p className="text-xs text-rs-light-brown">Liquidity</p>
            <p className="font-medium text-rs-text">
              {formatNumber(token.liquidity)}
            </p>
          </div>
          <div>
            <p className="text-xs text-rs-light-brown">Current</p>
            <p className="font-medium text-rs-text">
              {formatNumber(token.currentBonding)}
            </p>
          </div>
          <div>
            <p className="text-xs text-rs-light-brown">Target</p>
            <p className="font-medium text-rs-text">
              {formatNumber(token.targetBonding)}
            </p>
          </div>
        </div>

        <div className="relative h-2 bg-rs-card-bg border border-rs-gold/30 rounded-full overflow-hidden mb-2">
          <div
            className={`absolute top-0 left-0 h-full ${getProgressColor(
              progress
            )} transition-all duration-500`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-xs bg-rs-gold/10 text-rs-gold py-1 px-2 rounded-full inline-block border border-rs-gold/50">
            Crafting
          </div>
          <span className="text-xs text-rs-light-brown">{progress.toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
};

export default BondingTokenCard;
