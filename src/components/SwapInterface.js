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
        // RuneScape-themed styling
        containerStyles: {
          width: '100%',
          height: '600px',
          borderRadius: '8px',
          border: '2px solid #f0b440',
          backgroundColor: '#3d3329',
          color: '#ff981f',
          fontFamily: 'RuneScape UF, Arial, sans-serif',
        },
        formStyles: {
          backgroundColor: '#594d44',
          border: '2px solid #2e2724',
          borderRadius: '4px',
          padding: '16px',
        },
        buttonStyles: {
          backgroundColor: '#f0b440',
          color: '#2e2724',
          border: '2px solid #2e2724',
          borderRadius: '4px',
          fontWeight: 'bold',
          textShadow: '1px 1px 1px rgba(0,0,0,0.5)',
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
    <div className="rs-card max-w-2xl mx-auto p-4">
      <div className="rs-card-header">
        <h2 className="text-2xl">Grand Exchange Trading Post</h2>
        <p className="text-rs-light-brown text-sm mt-1">Exchange your items with other merchants</p>
      </div>
      <div id="integrated-terminal" className="w-full min-h-[600px] mt-4"></div>
    </div>
  );
};

export default SwapInterface; 