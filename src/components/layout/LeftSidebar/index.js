import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchButton from "./SearchButton";
import NavigationMenu from "./NavigationMenu";
import ChainSelector from "./ChainSelector";

const LeftSidebar = ({ openSearchModal }) => {
  const navigate = useNavigate();

  const handleChainSelect = (chainId) => {
    navigate(`/${chainId}`);
  };

  return (
    <div className="h-screen sticky top-0 overflow-y-auto">
      <div className="p-4">
        <Link to="/" className="block">
          <div className="rs-header mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-rs-text text-xl font-bold">
                <span className="text-2xl">🗡️</span>
              </span>
              <span className="font-bold text-lg">Grand Exchange</span>
            </div>
            <span className="text-xs text-rs-text block mt-1">
              by Barron
            </span>
          </div>
        </Link>
        <div className="rs-container mb-4">
          <SearchButton openSearchModal={openSearchModal} />
        </div>
        <div className="rs-container mb-4">
          <NavigationMenu />
        </div>
        <div className="rs-container">
          <ChainSelector />
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
