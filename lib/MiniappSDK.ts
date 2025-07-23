import { 
  MiniappSDK, 
  TransactionRequest, 
  WalletDisconnectedError, 
  TransactionFailedError,
  InsufficientFundsError 
} from '@/types/miniapp-sdk';

class MockMiniappSDK implements MiniappSDK {
  private walletAddress: string | null = null;
  private mockBalance = 1000; // Mock WLD balance

  async connectWallet(): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate user accepting/rejecting wallet connection
        const random = Math.random();
        if (random > 0.1) { // 90% success rate
          this.walletAddress = `0x${Math.random().toString(16).substr(2, 40)}`;
          resolve(this.walletAddress);
        } else if (random > 0.05) {
          reject(new Error('User rejected wallet connection'));
        } else {
          reject(new Error('Wallet extension not found - please install a Web3 wallet'));
        }
      }, 1500); // Simulate network delay
    });
  }

  async disconnectWallet(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.walletAddress = null;
        resolve();
      }, 500);
    });
  }

  async sendTransaction(tx: TransactionRequest): Promise<string> {
    if (!this.walletAddress) {
      throw new WalletDisconnectedError();
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Parse transaction value
        const value = tx.value ? parseFloat(tx.value) : 0;
        
        // Check balance
        if (value > this.mockBalance) {
          reject(new InsufficientFundsError());
          return;
        }

        // Simulate transaction success/failure
        if (Math.random() > 0.05) { // 95% success rate
          // Deduct from mock balance
          this.mockBalance -= value;
          
          // Generate mock transaction hash
          const txHash = `0x${Math.random().toString(16).substr(2, 64)}`;
          resolve(txHash);
        } else {
          // Simulate different types of failures
          const random = Math.random();
          if (random < 0.3) {
            reject(new TransactionFailedError('Network congestion - please try again'));
          } else if (random < 0.6) {
            reject(new TransactionFailedError('Gas price too low - transaction timeout'));
          } else {
            reject(new TransactionFailedError('Transaction reverted - contract error'));
          }
        }
      }, 2000); // Simulate blockchain confirmation time
    });
  }

  getWalletAddress(): string | null {
    return this.walletAddress;
  }

  isConnected(): boolean {
    return this.walletAddress !== null;
  }

  // Mock helper methods
  getMockBalance(): number {
    return this.mockBalance;
  }

  addMockBalance(amount: number): void {
    this.mockBalance += amount;
  }
}

// Singleton instance
export const miniappSDK = new MockMiniappSDK();
export default miniappSDK;