import Web3 from "web3";
import { loadContract } from "./loadContract";
const ERC20ABI = require("../abi/erc20abi.json");

const CheckBalanceToken = async (defaultAccount, TOKEN_ADDRESS) => {
  //creat web3
  const { ethereum } = window;
  window.web3 = new Web3(ethereum);
  await ethereum.enable();
  window.web3 = new Web3(window.web3.currentProvider);
  const web3 = window.web3;

  const contractTokenAddress = web3.utils.toChecksumAddress(TOKEN_ADDRESS);
  const contractToken = await loadContract(ERC20ABI, contractTokenAddress);
  const balanceToken = await contractToken.methods.balanceOf(defaultAccount).call();
  console.log(web3.utils.fromWei(balanceToken.toString()));
  const displayBalanceToken = web3.utils.fromWei(balanceToken).toString()
  return displayBalanceToken
};

export default CheckBalanceToken;
