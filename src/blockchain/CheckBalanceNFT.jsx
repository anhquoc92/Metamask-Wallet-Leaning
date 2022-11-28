import Web3 from "web3";
import { loadContract } from "./loadContract";
const ERC721ABI = require("../abi/erc721abi.json");

const CheckBalanceNFT = async (defaultAccount, NFT_ADDRESS) => {
  // const NFT_ADDRESS = "0x63aaB0b2E02c782F643e0215A73367d2D9f0eC94"; Ember
  // const NFT_ADDRESS = 0x2B09d47D550061f995A3b5C6F0Fd58005215D7c8"; BAPA
  //creat web3
  const { ethereum } = window;
  window.web3 = new Web3(ethereum);
  await ethereum.enable();
  window.web3 = new Web3(window.web3.currentProvider);
  const web3 = window.web3;

  const contractNftAddress = web3.utils.toChecksumAddress(NFT_ADDRESS);
  const contractNft = await loadContract(ERC721ABI, contractNftAddress);
  const balanceNft = await contractNft.methods.balanceOf(defaultAccount).call();
  console.log(balanceNft);
  return balanceNft
};

export default CheckBalanceNFT;
