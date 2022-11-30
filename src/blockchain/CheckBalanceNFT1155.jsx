import Web3 from "web3";
import { loadContract } from "./loadContract";
import ERC1155ABI from "../abi/erc1155abi.json";

const CheckBalanceNFT1155 = async (defaultAccount_2,NFT_ADDRESS,token_ID) => {
  // const NFT_ADDRESS = "0x5c891d76584b46bC7F1E700169a76569Bb77d2Db";
  // const defaultAccount = "0x2bbebe4f993672e86bde7254dd42654546453f79";
  // const token_ID = "5";

  //creat web3
  const { ethereum } = window;
  window.web3 = new Web3(ethereum);
  await ethereum.enable();
  window.web3 = new Web3(window.web3.currentProvider);
  const web3 = window.web3;

  const contractNftAddress = web3.utils.toChecksumAddress(NFT_ADDRESS);
  const contractNft = await loadContract(ERC1155ABI, contractNftAddress);
  const balanceNft = await contractNft.methods
    .balanceOf(defaultAccount_2, token_ID)
    .call();
  console.log(balanceNft);
  return balanceNft;
};

export default CheckBalanceNFT1155;
