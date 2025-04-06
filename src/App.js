import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import TrendingPage from "./pages/TrendingPage";
import TokenPage from "./pages/TokenPage";
import SearchModal from "./components/modals/SearchModal";
import PortfolioPage from "./pages/PortfolioPage";
import PumpFunPage from "./pages/PumpFunPage";
import SwapInterface from "./components/SwapInterface";
import './runescape-theme.css';

const App = () => {
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);

  return (
    <Router>
      <div className="rs-container min-h-screen">
        <MainLayout openSearchModal={() => setSearchModalOpen(true)}>
          <div className="rs-grand-exchange">
            <Routes>
              <Route path="/" element={<TrendingPage />} />
              <Route path="/:chainId" element={<TrendingPage />} />
              <Route path="/:chainId/:tokenAddress" element={<TokenPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/pumpfun" element={<PumpFunPage />} />
              <Route path="/swap" element={<SwapInterface />} />
            </Routes>
          </div>
        </MainLayout>

        <SearchModal
          isOpen={isSearchModalOpen}
          onClose={() => setSearchModalOpen(false)}
        />
      </div>
    </Router>
  );
};

export default App;
