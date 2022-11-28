import Web3 from "web3";
import { loadContract } from "./loadContract";

const contractABI = [
  {
    inputs: [],
    name: "entry",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "getEntryAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const CheckAmountEntry = async (defaultAccount) => {
  //creat web3
  const { ethereum } = window;
  window.web3 = new Web3(ethereum);
  await ethereum.enable();
  window.web3 = new Web3(window.web3.currentProvider);
  const web3 = window.web3;

  const contractAddress = web3.utils.toChecksumAddress(
    "0xB72388734F00d89E14BD958Ca095Cb60cD2383aa"
  );
  const contract = await loadContract(contractABI, contractAddress);
  contract.methods
    .getEntryAmount(defaultAccount)
    .call()
    .then((result) => {
      console.log(result);
    });
    
};

export default CheckAmountEntry;
