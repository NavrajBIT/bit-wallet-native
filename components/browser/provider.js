import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";

const sendMessage = () => alert("Requested!");

export const createProvider = async (data) => {
  console.log("Creating provider with ", data.network.rpc);
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
  return provider;
};
