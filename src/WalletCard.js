import React from "react";
import { useState } from "react";
import { ethers } from "ethers";

const WalletCard = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(0);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");

  const connectWalletHandler = async () => {
    if (window.ethereum) {
      console.log('detected')
      window.ethereum
        .request({ method: "eth_requestAccounts" }) //account la result
        .then((result) => {
          accountChangedHandler(result[0]); 
          setConnButtonText("Wallet Connected");
          getAccountBalance(result[0]);
        });
      
    } else {
      setErrorMessage("Install Metamask");
    }
  };

  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    getAccountBalance(newAccount.toString());
  };

  const getAccountBalance = (address) => {
    window.ethereum
      .request({ method: "eth_getBalance", params: [address, "latest"] })
      .then((balance) => {
        setUserBalance(parseFloat(ethers.utils.formatEther(balance)));
      });
  };

  const chainChangedHandler = () => {
    window.location.reload();
  };

  const checkNetwork = async () => {
    const chainId = 97; //BSC Test Chain
    if (window.ethereum.networkVersion !== chainId) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainID: window.ethereum.toHex(chainId) }],
        });
      } catch (err) {
        console.log(err);
        // This error code indicates that the chain has not been added to MetaMask
        if (err.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainName: "BSC Testnet",
                chainId: window.ethereum.toHex(chainId),
                nativeCurrency: { name: "BNB", decimals: 97, symbol: "BNB" },
                rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
              },
            ],
          });
        }
      }
    }
  };

  // coi su thay doi account
  window.ethereum.on("accountsChanged", accountChangedHandler);
  window.ethereum.on("chainChanged", chainChangedHandler);
  console.log(userBalance);
  console.log(defaultAccount);

  return (
    <div className="walletCard">
      <h2>{"Connection to Metamask"}</h2>
      <button id="connect_wallet" onClick={connectWalletHandler}>
        {connButtonText}
      </button>
      <div className="accountDisplay">
        <h3>Wallet Address: {defaultAccount}</h3>
      </div>
      <div className="balanceDisplay">
        <h3>Balance: {userBalance.toFixed(4)} ETH </h3>
      </div>
      <div className="multiSendDisplay">
        <h3>MultiSend: </h3>
      </div>
      {errorMessage}
    </div>
  );
};

export default WalletCard;

//tree history thumb found install brother symbol shy region satisfy length stay
