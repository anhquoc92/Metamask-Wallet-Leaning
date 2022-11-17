import React from "react";
import { useState } from "react";
import { ethers } from "ethers";
import './WalletCard.css'
import Web3 from "web3";
import getScatterContract from './blockchain/scatter'

// const networks = {
//   bsc_testnet: {
//     nativeCurrency: {
//       name: "Binance Smart Chain Testnet",
//       symbol: "tBNB",
//       decimals: 18,
//     },
//     chainId: `0x${Number(137).toString(16)}`,
//     chainName: 'BSC Testnet',
//     rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/']
//   },
//   goerli_test_network: {
//     chainName: "Ethereum Testnet Görli",
//     rpcUrls: ["https://goerli.infura.io/v3/"],
//     nativeCurrency: {
//       name: "Görli Ether",
//       symbol: "ETH",
//       decimals: 18,
//     },
//     chainId: `0x${Number(5).toString(16)}`,
//   },
// };

// const changeNetwork = async ({networkName, setErrorMessage}) => {
//   try {
//     // if (window.ethereum.networkVersion !== networks[networkName]['chainId']);
//     if (!window.ethereum) throw new Error("No crypto wallet found");
//     await window.ethereum.request({
//       method: "wallet_addEthereumChain",
//       params: [
//         {
//           ...networks[networkName]
//         }
//       ]
//     });
//   } catch (err) {
//     setErrorMessage(err.message)
//   }
// };

const WalletCard = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(0);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");
  const [web3, setWeb3] = useState();
  const [scatterContract, setScatterContract] = useState()

  const connectWalletHandler = async () => {
    // check if Metamask is installed
    if (window.ethereum && window.ethereum.isMetaMask) {
      console.log("MetaMask Here!");
      window.ethereum
        .request({ method: "eth_requestAccounts" }) //account is result
        .then((result) => {
          accountChangedHandler(result[0]);
          setConnButtonText("Wallet Connected");
          getAccountBalance(result[0]);
        }); 
      // const { ethereum } = window;
      // window.web3 = new Web3(ethereum);
      // await ethereum.request({ method: "eth_requestAccounts" });
      // window.web3 = new Web3(window.web3.currentProvider);
      // setWeb3(window.web3);
      // // get list accounts
      // const accounts = await window.web3.eth.getAccounts();
      // await checkChangedNetWork()
      // accountChangedHandler(accounts[0])
      // setConnButtonText("Switch Wallet")
      // // create local contract copy
      // const sc = getScatterContract(window.web3)
      // setScatterContract(sc)
    } else {
      // check if Metamask is not installed
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

  const checkChangedNetWork = async () => {
    const chainId = 97; //BSC Testnet
    if (window.ethereum.networkVersion !== chainId) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: window.web3.utils.toHex(chainId) }],
        });
      } catch (err) {
        console.log(err);
        if (err.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainName: "BSC Testnet",
                chainId: window.web3.utils.toHex(chainId),
                nativeCurrency: { name: "BNB", decimals: 97, symbol: "BNB" },
                rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
              },
            ],
          });
        }
      }
    }
  };

  const chainChangedHandler = () => {
    window.location.reload();
  };

  // const handleNetworkSwitch = async (networkName) => {
  //   setErrorMessage();
  //   await changeNetwork({networkName, setErrorMessage});
  //   console.log(networkName)
  //   console.log(networks[networkName]['chainId'])
  //   console.log('ZZZZZZ')
  //   console.log(window.ethereum.networkVersion)
  // }

  // coi su thay doi account
  window.ethereum.on("accountsChanged", accountChangedHandler);
  window.ethereum.on("chainChanged", chainChangedHandler);
  console.log(userBalance);
  console.log(defaultAccount);
  console.log(window.ethereum.networkVersion)

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
      {/* <div className="switchNetwork">
          <h2>{"Metamask Network"}</h2>
          <button
            onClick={() => handleNetworkSwitch("goerli_test_network")}
            className="button_switch_network"
          >
            Check Network
          </button>
          <button
            onClick={() => handleNetworkSwitch("goerli_test_network")}
            className="button_switch_network"
          >
            Switch to Goerli ETH Testnet
          </button>
          <button
            onClick={() => handleNetworkSwitch("bsc_testnet")}
            className="button_switch_network"
          >
            Switch to BSC Testnet
          </button>
        </div> */}
      <div className="multiSendDisplay">
        <h2>MultiSend: </h2>
      </div>
      {errorMessage}
    </div>
  );
};

export default WalletCard;

//tree history thumb found install brother symbol shy region satisfy length stay
