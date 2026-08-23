'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ethers, BrowserProvider } from 'ethers';

interface Web3ContextType {
  account: string | null;
  provider: BrowserProvider | null;
  isConnecting: boolean;
  connectWallet: () => Promise<void>;
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

export const Web3Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if wallet was previously connected
    const checkConnection = async () => {
      if (typeof window !== 'undefined' && (window as any).ethereum) {
        try {
          const _provider = new ethers.BrowserProvider((window as any).ethereum);
          setProvider(_provider);
          
          const accounts = await _provider.listAccounts();
          if (accounts.length > 0) {
            setAccount(accounts[0].address);
          }
        } catch (err) {
          console.error("Failed to check Web3 connection", err);
        }
      }
    };
    checkConnection();

    // Listen for account changes
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      (window as any).ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setAccount(null);
        }
      });
    }
  }, []);

  const connectWallet = async () => {
    if (typeof window === 'undefined' || !(window as any).ethereum) {
      setError('MetaMask is not installed. Please install it to use Web3 features.');
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      const _provider = new ethers.BrowserProvider((window as any).ethereum);
      setProvider(_provider);
      
      const accounts = await _provider.send('eth_requestAccounts', []);
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to connect wallet');
      console.error(err);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    // Note: True disconnection has to happen from MetaMask UI, we just clear local state
  };

  return (
    <Web3Context.Provider
      value={{
        account,
        provider,
        isConnecting,
        connectWallet,
        disconnectWallet,
        error
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
