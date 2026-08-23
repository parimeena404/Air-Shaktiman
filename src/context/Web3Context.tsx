'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ethers, BrowserProvider } from 'ethers';

interface Web3ContextType {
  account: string | null;
  provider: BrowserProvider | null;
  isConnecting: boolean;
  hasMetaMask: boolean;
  connectWallet: () => Promise<void>;
  connectDemoWallet: () => void;
  disconnectWallet: () => void;
  error: string | null;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};

// Helper to reliably find MetaMask in various browser environments
const getEthereumProvider = () => {
  if (typeof window === 'undefined') return null;
  const anyWin = window as any;
  if (!anyWin.ethereum) return null;

  // Handle multi-wallet extensions
  if (Array.isArray(anyWin.ethereum.providers)) {
    const mm = anyWin.ethereum.providers.find((p: any) => p.isMetaMask);
    if (mm) return mm;
    return anyWin.ethereum.providers[0];
  }

  return anyWin.ethereum;
};

export const Web3Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [hasMetaMask, setHasMetaMask] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ethereum = getEthereumProvider();
    setHasMetaMask(!!ethereum);

    if (ethereum) {
      try {
        const _provider = new ethers.BrowserProvider(ethereum);
        setProvider(_provider);

        // Check if wallet is already connected without prompting popup
        ethereum
          .request({ method: 'eth_accounts' })
          .then((accounts: string[]) => {
            if (accounts && accounts.length > 0) {
              setAccount(accounts[0]);
            }
          })
          .catch((err: any) => console.warn('Web3 check accounts error:', err));
      } catch (err) {
        console.warn('Web3 init provider error:', err);
      }

      // Listen for account switching
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts && accounts.length > 0) {
          setAccount(accounts[0]);
          setError(null);
        } else {
          setAccount(null);
        }
      };

      const handleChainChanged = () => {
        try {
          const _provider = new ethers.BrowserProvider(ethereum);
          setProvider(_provider);
        } catch (e) {}
      };

      ethereum.on?.('accountsChanged', handleAccountsChanged);
      ethereum.on?.('chainChanged', handleChainChanged);

      return () => {
        ethereum.removeListener?.('accountsChanged', handleAccountsChanged);
        ethereum.removeListener?.('chainChanged', handleChainChanged);
      };
    }
  }, []);

  const connectWallet = async () => {
    setError(null);
    const ethereum = getEthereumProvider();

    if (!ethereum) {
      setError('MetaMask extension is not detected in your browser. Opening MetaMask download page...');
      if (typeof window !== 'undefined') {
        window.open('https://metamask.io/download/', '_blank');
      }
      return;
    }

    setIsConnecting(true);

    try {
      // Direct EIP-1193 eth_requestAccounts triggers the MetaMask extension popup
      const accounts: string[] = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts && accounts.length > 0) {
        setAccount(accounts[0]);
        const _provider = new ethers.BrowserProvider(ethereum);
        setProvider(_provider);
        setError(null);
      } else {
        setError('No Ethereum accounts found in MetaMask.');
      }
    } catch (err: any) {
      console.error('MetaMask connection error:', err);
      if (err.code === 4001) {
        setError('Connection request was rejected in MetaMask.');
      } else if (err.code === -32002) {
        setError('MetaMask request already pending. Please click the MetaMask extension icon in your browser toolbar.');
      } else {
        setError(err.message || 'Failed to connect MetaMask wallet.');
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const connectDemoWallet = () => {
    // Allows testing Web3 integration immediately even without MetaMask installed
    setAccount('0x71C2a84942C0731a66e22F0fb456e45600E45678');
    setError(null);
  };

  const disconnectWallet = () => {
    setAccount(null);
    setError(null);
  };

  return (
    <Web3Context.Provider
      value={{
        account,
        provider,
        isConnecting,
        hasMetaMask,
        connectWallet,
        connectDemoWallet,
        disconnectWallet,
        error,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
