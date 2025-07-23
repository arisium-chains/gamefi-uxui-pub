export interface TransactionRequest {
  to: string;
  data: string;
  value?: string;
}

export interface MiniappSDK {
  connectWallet(): Promise<string>;
  disconnectWallet(): Promise<void>;
  sendTransaction(tx: TransactionRequest): Promise<string>;
  getWalletAddress(): string | null;
  isConnected(): boolean;
}

export class MiniappSDKError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'MiniappSDKError';
  }
}

export class WalletDisconnectedError extends MiniappSDKError {
  constructor() {
    super('Wallet is not connected', 'WALLET_DISCONNECTED');
  }
}

export class TransactionFailedError extends MiniappSDKError {
  constructor(message: string) {
    super(`Transaction failed: ${message}`, 'TRANSACTION_FAILED');
  }
}

export class InsufficientFundsError extends MiniappSDKError {
  constructor() {
    super('Insufficient funds for transaction', 'INSUFFICIENT_FUNDS');
  }
}