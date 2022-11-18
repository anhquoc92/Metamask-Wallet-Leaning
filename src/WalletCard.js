import React from "react";
import { useState } from "react";
import { ethers } from "ethers";
import "./WalletCard.css";
import entryContract from "./blockchain/checkEntry";
import checkAmountEntry from "./blockchain/checkAmountEntry";
import multiSendContract from "./blockchain/multiSend";

const WalletCard = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(0);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");

  const [walletBegin, setWalletBegin] = useState('__')
  const [amountBegin, setAmountBegin] = useState('__')

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

  const chainChangedHandler = () => {
    window.location.reload();
  };

  const onclickCheckEntry = async () => {
    entryContract(defaultAccount);
  };

  const onclickCheckAmountEntry = async () => {
    checkAmountEntry(defaultAccount);
  };

  const onclickMultiSend = async () => {
    multiSendContract(defaultAccount);
  };

  const checkData = () => {
    const addressReceiverData = document.getElementById("amount").value;
    const totalWallet = addressReceiverData.split(";").length;
    const eachReceiveWallets = addressReceiverData.split(";");
  
    let totalValueSend = 0;
  
    for (let i = 0; i < totalWallet; i++) {
      const eachSendWallet = eachReceiveWallets[i].split("=")[1];
      totalValueSend += parseFloat(eachSendWallet);
    }
    setWalletBegin(totalWallet);
    setAmountBegin(totalValueSend.toFixed(4));
  }


  // coi su thay doi account
  window.ethereum.on("accountsChanged", accountChangedHandler);
  window.ethereum.on("chainChanged", chainChangedHandler);

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
      <div className="check_entry">
        <h2>{"Check"}</h2>
        <button onClick={onclickCheckEntry} className="button_check_entry">
          Check Entry
        </button>
        <button
          onClick={onclickCheckAmountEntry}
          className="button_check_entry"
        >
          Check Amount Entry
        </button>
      </div>
      <div className="multiSendDisplay">
        <h2>{"Multi-Sender"}</h2>
        <div className="list_of_address">
          <h3>Data: {"{receiverAddress1}={value1};{receiverAddress2}={value2}"}</h3>
          <textarea
            id="amount"
            className="form-control"
            type="text"
            placeholder="0x172Ab3749c535023d53912bE8B70beD85e5332df=0.15;0xdc323DA8f2A4CD5754216eD05AFe695cfdB61d8f=0.19"
            rows="10"
            cols="100"
          ></textarea>
          <br />
        </div>
        <div className="layout_total_send">
          <div className="result_check_data">
            <span>AmountWallet: {walletBegin}</span>
            <span>AmountToken: {amountBegin}</span>
          </div>
          <button className="check_total_send" onClick={checkData}>CheckData</button>
        </div>

        <div className="button_action">
          <button onClick={onclickMultiSend}>Send Token</button>
        </div>
      </div>
      {errorMessage}
    </div>
  );
};

export default WalletCard;

//tree history thumb found install brother symbol shy region satisfy length stay
