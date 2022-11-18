import Web3 from "web3";

// const contractABI = [
//   {
//     inputs: [],
//     name: "entry",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address"
//         name: "sender",
//         type: "address",
//       },
//     ],
//     name: "getEntryAmount",
//     outputs: [
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
// ];

const loadContract = async (contractABI, contractAddress) => {
  //creat web3
  const { ethereum } = window;
  window.web3 = new Web3(ethereum);
  await ethereum.enable();
  window.web3 = new Web3(window.web3.currentProvider);
  const web3 = window.web3;
  const contract = new web3.eth.Contract(contractABI, contractAddress);

  return contract;
};

export {loadContract}
