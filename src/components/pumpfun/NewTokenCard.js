import React, { useState, useEffect } from "react";

const NewTokenCard = ({
  token,
  formatPrice,
  formatNumber,
  formatTimeAgo,
  onClick,
}) => {
  const [isVisible, setIsVisible] = useState(!token.isNew);

  // Animation for new tokens
  useEffect(() => {
    if (token.isNew) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [token.isNew]);

  return (
    <div
      className={`bg-rs-card-bg border border-rs-gold/50 rounded-lg overflow-hidden cursor-pointer transition-all duration-500 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      } hover:border-rs-gold hover:brightness-110 ${token.isNew ? "animate-pulse-gold" : ""}`}
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
            <p className="text-xs text-rs-light-brown">FDV</p>
            <p className="font-medium text-rs-text">
              {formatNumber(token.fullyDilutedValuation)}
            </p>
          </div>
          <div>
            <p className="text-xs text-rs-light-brown">Created</p>
            <p className="font-medium text-rs-text">
              {formatTimeAgo(token.createdAt)}
            </p>
          </div>
        </div>

        <div className="text-xs bg-rs-gold/10 text-rs-gold py-1 px-2 rounded-full inline-block border border-rs-gold/50">
          Fresh Stock
        </div>
      </div>
    </div>
  );
};

export default NewTokenCard;
