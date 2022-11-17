const scatterAbi = [
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

const getScatterContract = (web3) => {
  return new web3.eth.Contract(
    scatterAbi,
    process.env.REACT_APP_SCATTER_CONTRACT_ADDRESS
  );
};

export default getScatterContract;
