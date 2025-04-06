// components/portfolio/WalletManager.js
import React, { useState } from "react";

const WalletManager = ({
  wallets,
  selectedWallet,
  onAddWallet,
  onRemoveWallet,
  onSelectWallet,
}) => {
  const [newWalletName, setNewWalletName] = useState("");
  const [newWalletAddress, setNewWalletAddress] = useState("");
  const [error, setError] = useState("");

  const handleAddWallet = () => {
    setError("");

    // Validate inputs
    if (!newWalletName.trim()) {
      setError("Please enter a wallet name");
      return;
    }

    if (!newWalletAddress.trim()) {
      setError("Please enter a wallet address");
      return;
    }

    // Basic EVM address validation
    if (!/^0x[a-fA-F0-9]{40}$/.test(newWalletAddress)) {
      setError("Please enter a valid EVM wallet address");
      return;
    }

    const newWallet = {
      name: newWalletName.trim(),
      address: newWalletAddress.trim(),
      addedAt: new Date().toISOString(),
    };

    const success = onAddWallet(newWallet);

    if (success) {
      // Clear form fields
      setNewWalletName("");
      setNewWalletAddress("");
    } else {
      setError("Wallet already exists");
    }
  };

  return (
    <div className="rs-card">
      <div className="rs-card-header border-b-2 border-rs-gold">
        <h2 className="text-xl font-semibold text-rs-text flex items-center">
          <span className="mr-2">🎒</span> Your Inventory
          <span className="text-xs text-rs-light-brown ml-2">by Barron</span>
        </h2>
      </div>

      {/* Wallet list */}
      <div className="p-4">
        {wallets.length === 0 ? (
          <div className="text-rs-light-brown text-center py-4">
            No adventurers registered
          </div>
        ) : (
          <div className="space-y-2">
            {wallets.map((wallet) => (
              <div
                key={wallet.address}
                className={`rs-button flex items-center justify-between p-3 cursor-pointer ${
                  selectedWallet && selectedWallet.address === wallet.address
                    ? "brightness-110"
                    : ""
                }`}
                onClick={() => onSelectWallet(wallet)}
              >
                <div className="flex-1">
                  <div className="font-medium text-rs-text">{wallet.name}</div>
                  <div className="text-xs text-rs-light-brown truncate">
                    {wallet.address}
                  </div>
                </div>
                <button
                  className="text-rs-light-brown hover:text-red-400 p-1 rounded"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveWallet(wallet.address);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add new wallet form */}
      <div className="p-4 border-t border-rs-border">
        <h3 className="text-rs-text font-medium mb-2">Register New Adventurer</h3>

        {error && <div className="rs-alert rs-alert-error mb-2">{error}</div>}

        <div className="mb-3">
          <label className="block text-xs text-rs-light-brown mb-1">
            Adventurer Name
          </label>
          <input
            type="text"
            value={newWalletName}
            onChange={(e) => setNewWalletName(e.target.value)}
            placeholder="Main Account"
            className="rs-input w-full"
          />
        </div>

        <div className="mb-3">
          <label className="block text-xs text-rs-light-brown mb-1">
            Adventurer Address
          </label>
          <input
            type="text"
            value={newWalletAddress}
            onChange={(e) => setNewWalletAddress(e.target.value)}
            placeholder="0x..."
            className="rs-input w-full"
          />
        </div>

        <button
          onClick={handleAddWallet}
          className="rs-button w-full py-2"
        >
          Register Adventurer
        </button>
      </div>
    </div>
  );
};

export default WalletManager;
