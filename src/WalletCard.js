import React from "react";
import { useState } from "react";
import { ethers } from "ethers";
import "./WalletCard.css";
import EntryContract from "./blockchain/CheckEntry";
import CheckAmountEntry from "./blockchain/CheckAmountEntry";
import MultiSendContract from "./blockchain/MultiSendContract";
import CheckBalanceNFT721 from "./blockchain/CheckBalanceNFT721.jsx";
import CheckBalanceToken from "./blockchain/CheckBalanceToken.jsx";
import token_list from "./currency/token_list";
import { Select, Button, Input, InputNumber } from "antd";
import CheckBalanceNFT1155 from "./blockchain/CheckBalanceNFT1155";

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
  const [addressTokenChange, setAddressTokenChange] = useState(
    token_list[chainList[0]][0].address
  );

  const [abiNftChange, setAbiNftChange] = useState("ERC721");
  const { Option } = Select;
  const onErcChanged = (value) => {
    console.log(value);
    setAbiNftChange(value);
    console.log(value);
  };

  const onChainChanged = (value) => {
    setChainChange(token_list[value]);
    setTokenChange(token_list[value][0].symbol);
  };
  const onTokenChange = (value, id) => {
    setTokenChange(value);
    console.log(value);
    setAddressTokenChange(id.id.address);
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

  const onclickCheckBalanceNFT_2 = async () => {
    const NFT_ADDRESS = document.getElementById("input_contract_nft").value;
    if (abiNftChange === "ERC721") {
      setNftOwn(await CheckBalanceNFT721(defaultAccount, NFT_ADDRESS));
    }
    if (abiNftChange === "ERC1155") {
      const token_ID = document.getElementById("input_token_id").value;
      const defaultAccount_2 = "0x2bbebe4f993672e86bde7254dd42654546453f79";

      setNftOwn(
        await CheckBalanceNFT1155(defaultAccount_2, NFT_ADDRESS, token_ID)
      );
    }
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
        <br />
        <div className="check_balance_nft">
          <Input.Group compact>
            <Select
              onChange={onErcChanged}
              style={{ width: 120 }}
              defaultValue="ERC721"
            >
              <Option value="ERC721">ERC721</Option>
              <Option value="ERC1155">ERC1155</Option>
            </Select>
            <Input
              style={{ width: 320 }}
              placeholder="Input Contract Collection"
              id="input_contract_nft"
            />
            <InputNumber placeholder="Token_ID" id="input_token_id" />
          </Input.Group>
          <Button onClick={onclickCheckBalanceNFT_2}>Check Balance NFT</Button>
          <span>: {nftOwn} NFT</span>
        </div>
        <br />
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
