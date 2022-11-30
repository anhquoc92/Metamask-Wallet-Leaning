import React from "react";
import { useState } from "react";
import { ethers } from "ethers";
import "./WalletCard.css";
import EntryContract from "./blockchain/CheckEntry";
import CheckAmountEntry from "./blockchain/CheckAmountEntry";
import MultiSendContract from "./blockchain/MultiSendContract";
import CheckBalanceNFT from "./blockchain/CheckBalanceNFT.jsx";
import CheckBalanceToken from "./blockchain/CheckBalanceToken.jsx";
import token_list from "./currency/token_list";
import { Select, Button } from "antd";

const chainList = ["BNBSmartChain", "Ethereum"];

const WalletCard = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(0);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");

  const [walletBegin, setWalletBegin] = useState("__");
  const [amountBegin, setAmountBegin] = useState("__");
  const [nftOwn, setNftOwn] = useState("__");
  const [tokenOwn, setTokenOwn] = useState("__");

  const [chainChange, setChainChange] = useState(token_list[chainList[0]]);
  const [tokenChange, setTokenChange] = useState(
    token_list[chainList[0]][0].symbol
  );
  const [addressTokenChange, setAddressTokenChange] = useState(token_list[chainList[0]][0].address);
  const onChainChanged = (value) => {
    setChainChange(token_list[value]);
    setTokenChange(token_list[value][0].symbol);
  };
  const onTokenChange = (value, id) => {
    setTokenChange(value);
    setAddressTokenChange(id.id.address)
  };

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
    EntryContract(defaultAccount);
  };

  const onclickCheckAmountEntry = async () => {
    CheckAmountEntry(defaultAccount);
  };

  const onclickMultiSend = async () => {
    MultiSendContract(defaultAccount);
  };

  const onclickCheckBalanceToken = async () => {
    const TOKEN_ADDRESS = addressTokenChange;
    setTokenOwn(await CheckBalanceToken(defaultAccount, TOKEN_ADDRESS));
  };

  const onclickCheckBalanceNFT = async () => {
    const NFT_ADDRESS = document.getElementById("nft_address").value;
    console.log(NFT_ADDRESS);
    setNftOwn(await CheckBalanceNFT(defaultAccount, NFT_ADDRESS));
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
  };

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
        <div>
          <Select
            defaultValue={chainList[0]}
            onChange={onChainChanged}
            style={{
              width: 150,
            }}
            options={chainList.map((chains) => ({
              label: chains,
              value: chains,
            }))}
          />
          <Select
            value={tokenChange}
            onChange={onTokenChange}
            style={{
              width: 120,
            }}
            options={chainChange.map((token_detail) => ({
              label: token_detail.symbol,
              value: token_detail.symbol,
              id: token_detail,
            }))}
          />
          <Button onClick={onclickCheckBalanceToken}>
            Check Balance Token
          </Button>
          <span>
            {" "}
            : {tokenOwn} {tokenChange}
          </span>
        </div>
        {/* <div className="check_balance_token">
          <span>Choose Token: </span>
          <select onChange={(e) => setSelectToken(TokenList[e.target.value])}>
            {TokenList.map((token, index) => (
              <option value={index} key={token.address}>
                {token.name}
              </option>
            ))}
          </select>
          <button
            className="button_check_entry"
            onClick={onclickCheckBalanceToken}
          >
            Check Balance Token
          </button>
          <span>
            {" "}
            : {tokenOwn} {selectToken.symbol}
          </span>
        </div> */}
        <div className="check_balance_nft">
          <span>Contract Collection: </span>
          <input type="text" id="nft_address" />
          <select name="chooseTokenNft" id="token_nft">
            <option value="aaaaa">ERC721</option>
            <option value="bbbbb">ERC1155</option>
          </select>
          <button
            onClick={onclickCheckBalanceNFT}
            className="button_check_entry"
          >
            Check Balance NFT
          </button>
          <span> : {nftOwn} NFTs</span>
        </div>
      </div>
      <div className="multiSendDisplay">
        <h2>{"Multi-Sender"}</h2>
        <div className="list_of_address">
          <h3>
            Data: {"{receiverAddress1}={value1};{receiverAddress2}={value2}"}
          </h3>
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
          <button className="check_total_send" onClick={checkData}>
            CheckData
          </button>
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
