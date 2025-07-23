'use client';

import { useMiniappSDK } from '@/contexts/MiniappSDKContext';
import MessageDisplay from '@/components/MessageDisplay';
import Link from 'next/link';

export default function TransactionsPage() {
  const { isConnected, transactions } = useMiniappSDK();

  if (!isConnected) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full text-center mx-4">
            <div className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">🔒</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Wallet Not Connected</h2>
            <p className="text-gray-300 mb-6">
              Please connect your wallet to view transaction history.
            </p>
            <Link 
              href="/"
              className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-3 px-6 rounded-xl hover:from-yellow-300 hover:to-orange-400 transition-all duration-200"
            >
              Go Home
            </Link>
          </div>
        </div>
        <MessageDisplay />
      </>
    );
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'adopt': return '🏎️';
      case 'boost': return '⚡';
      case 'retire': return '🏁';
      case 'claim': return '💰';
      default: return '📝';
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'adopt': return 'text-green-400';
      case 'boost': return 'text-yellow-400';
      case 'retire': return 'text-red-400';
      case 'claim': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-8">
            <Link 
              href="/"
              className="inline-block mb-4 text-gray-300 hover:text-white transition-colors duration-200"
            >
              ← Back to Dashboard
            </Link>
            <h1 className="text-4xl font-bold text-white mb-2">Transaction History</h1>
            <p className="text-gray-300">Your WLD staking and earning activities</p>
          </header>

          <div className="max-w-4xl mx-auto">
            {transactions.length === 0 ? (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
                <div className="w-24 h-24 bg-gray-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-4xl">📝</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">No Transactions Yet</h2>
                <p className="text-gray-300 mb-8">
                  Start by adopting your first racer to see your transaction history here.
                </p>
                <Link 
                  href="/adopt"
                  className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-6 rounded-xl hover:from-green-400 hover:to-emerald-500 transition-all duration-200"
                >
                  Adopt First Racer
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex justify-between items-center">
                  <h2 className="text-lg font-bold text-white">Recent Transactions ({transactions.length})</h2>
                </div>

                {transactions.map((tx) => (
                  <div key={tx.id} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/15 transition-all duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl">
                          {getTransactionIcon(tx.type)}
                        </div>
                        <div>
                          <h3 className="font-bold text-white capitalize">{tx.type} Racer</h3>
                          <p className="text-sm text-gray-300">
                            {new Date(tx.timestamp).toLocaleDateString()} at {new Date(tx.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${getTransactionColor(tx.type)}`}>
                          {tx.type === 'retire' || tx.type === 'claim' ? '+' : '-'}{tx.amount} WLD
                        </p>
                        <p className="text-xs text-gray-400">
                          Status: <span className="text-green-400">Confirmed</span>
                        </p>
                      </div>
                    </div>
                    {tx.txHash && (
                      <div className="mt-4 pt-4 border-t border-white/20">
                        <p className="text-xs text-gray-400">
                          Transaction: <span className="font-mono text-gray-300">{tx.txHash.slice(0, 10)}...{tx.txHash.slice(-6)}</span>
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <MessageDisplay />
    </>
  );
}