import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { WagmiProvider } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CHAIN_ID, CHAIN_NAME, RPC_URL } from '@/lib/constants';

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = '67fc3d6d79a1c2cae31905973096afec';

// 2. Create wagmiConfig
const metadata = {
  name: 'Solidity Learner',
  description: 'Interactive Solidity learning platform',
  url: 'http://localhost:5173',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

// 3. Configure Sepolia chain
const sepoliaChain = {
  ...sepolia,
  id: CHAIN_ID,
  name: CHAIN_NAME,
  rpcUrls: {
    default: { http: [RPC_URL] },
  },
} as const;

const chains = [sepoliaChain];

// 4. Create wagmi config
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  enableEIP6963: true,
  enableInjected: true,
  enableCoinbase: true,
  enableEmail: false,
  enableWalletConnect: true,
  enableEthereum: true,
  enableSmartAccounts: false,
  ssr: true,
});

// 5. Create a Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
});

// 6. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: false,
  enableOnramp: false,
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': '#3b82f6',
    '--w3m-border-radius-master': '8px',
  },
  featuredWalletIds: [
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96', // Metamask
    '4622a2b2d6af1c9844944291e9e735a6b9c0bc87f7b9c5edcc1c5381563323e5', // Coinbase
  ],
});

// 7. Create provider component
export function Web3ModalProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default Web3ModalProvider;
