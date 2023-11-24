import { WagmiConfig, createConfig, mainnet, configureChains } from 'wagmi'
import { localhost } from 'wagmi/chains';
import { publicProvider } from "wagmi/providers/public";

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

import Profile from './Profile';
import './App.css';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [localhost],
  [publicProvider()]
)
const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
})

function App() {
  return (
    <WagmiConfig config={config}>
      <Profile />
    </WagmiConfig>
  );
}

export default App;
