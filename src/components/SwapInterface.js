import React, { useEffect } from 'react';

const SwapInterface = () => {
  useEffect(() => {
    // Load Jupiter Terminal script
    const script = document.createElement('script');
    script.src = 'https://terminal.jup.ag/main-v2.js';
    script.async = true;
    
    script.onload = () => {
      // Initialize Jupiter Terminal with our configuration
      window.Jupiter.init({
        displayMode: 'integrated',
        integratedTargetId: 'integrated-terminal',
        defaultExplorer: 'Solana Explorer',
        endpoint: 'https://solana-mainnet.rpc.extrnode.com',
        // Set platform fee to 0.5%
        platformFeeAndAccounts: {
          feeBps: 50, // 0.5%
          feeAccounts: {
            // Fee receiver address
            'B3puSCahSLE3ntRwA19en2u6engpVRbi2fcxvvWRag48': 100 // 100% of fees go to this address
          }
        },
        // Optional styling
        containerStyles: {
          width: '100%',
          height: '600px',
          borderRadius: '16px',
          border: '1px solid #2d2d2d',
        },
      });
    };

    document.body.appendChild(script);

    // Cleanup
    return () => {
      document.body.removeChild(script);
      if (window.Jupiter && window.Jupiter.terminate) {
        window.Jupiter.terminate();
      }
    };
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Swap Tokens</h2>
      <div id="integrated-terminal" className="w-full min-h-[600px]"></div>
    </div>
  );
};

export default SwapInterface; 