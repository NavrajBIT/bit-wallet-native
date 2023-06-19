import { ethers } from "https://cdn-cors.ethers.io/lib/ethers-5.5.4.esm.min.js";

const sendMessage = () => alert("Requested!");

export const createProvider = async (data) => {
  const provider = new ethers.providers.JsonRpcProvider(data.network.rpc);
  provider.chainId = data.network.chainHexId;
  provider.isMetaMask = true;
  provider.networkVersion = data.network.chain;
  provider.selectedAddress = data.publickey;
  provider._state = {
    accounts: data.publickey === "" ? [] : [data.publickey],
    initialized: true,
    isConnected: true,
    isPermanentlyDisconnected: false,
    isUnlocked: true,
  };
  provider.send = (args, kwargs) => {
    if (
      args.method === "eth_requestAccounts" ||
      args.method === "requestPermissions" ||
      args.method === "wallet_requestPermissions" ||
      args.method === "eth_accounts"
    ) {
      console.log("Connection requested...");
      sendMessage("connectionRequest", null);
      return connectionRequest;
    }
  };
  provider.request = (args) => {
    if (
      args.method === "eth_requestAccounts" ||
      args.method === "requestPermissions" ||
      args.method === "wallet_requestPermissions" ||
      args.method === "eth_accounts"
    ) {
      sendMessage("connectionRequest", null);
      return connectionRequest;
    }
  };
  window.ethereum = provider;
};
