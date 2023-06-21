import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";

export const createProvider = (data, status) => {
  const provider = new ethers.providers.JsonRpcProvider(data.network.rpc);
  provider.chainId = data.network.chainHexId;
  provider.isMetaMask = true;
  provider.networkVersion = data.network.chain;
  provider.selectedAddress = status === "connected" ? data.publickey : "";
  provider._state = {
    accounts: status != "connected" ? [] : [data.publickey],
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
      window.ReactNativeWebView.postMessage("connectionRequest", null);
    }
  };
  provider.request = (args) => {
    if (
      args.method === "eth_requestAccounts" ||
      args.method === "requestPermissions" ||
      args.method === "wallet_requestPermissions" ||
      args.method === "eth_accounts"
    ) {
      window.ReactNativeWebView.postMessage("connectionRequest", null);
    }
  };
  return provider;
};
