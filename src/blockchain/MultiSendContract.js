import Web3 from "web3";
import { loadContract } from "./loadContract";

const contractABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "recipients",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
      {
        internalType: "bool",
        name: "revertOnfail",
        type: "bool",
      },
    ],
    name: "scatterEthers",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "token",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "recipients",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
      {
        internalType: "bool",
        name: "revertOnfail",
        type: "bool",
      },
    ],
    name: "scatterTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "TransferFailed",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const MultiSendContract = async (defaultAccount) => {
  //creat web3
  const { ethereum } = window;
  window.web3 = new Web3(ethereum);
  await ethereum.enable();
  window.web3 = new Web3(window.web3.currentProvider);
  const web3 = window.web3;

  const contractAddress = web3.utils.toChecksumAddress(
    "0x76a9f9661C810dBc22Fbf370bC06404AcBbA3554"
  );

  const receiverWallets = [];
  const amountSend = [];

  const addressReceiverData = document.getElementById("amount").value;
  const totalWallet = addressReceiverData.split(";").length;
  const eachReceiveWallets = addressReceiverData.split(";");

  let totalValueSend = 0;

  for (let i = 0; i < totalWallet; i++) {
    const eachReceiverWallet = eachReceiveWallets[i].split("=")[0];
    receiverWallets.push(eachReceiverWallet);
    const eachSendWallet = eachReceiveWallets[i].split("=")[1];
    amountSend.push(eachSendWallet);
    totalValueSend += parseFloat(eachSendWallet);

  }

  console.log(totalWallet);
  console.log(totalValueSend);

  const contract = await loadContract(contractABI, contractAddress);
  contract.methods.scatterEthers(receiverWallets, amountSend.map(item=>web3.utils.toWei(item.toString(), 'ether')), true).send({
    from: defaultAccount,
    gas: 1000000,
    value: web3.utils.fromWei(totalValueSend.toString()),
  });

  

};

export default MultiSendContract;
