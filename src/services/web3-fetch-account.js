import Web3 from "web3";

export const fetchWlletBalance = async (provider, account) => {
   console.log("provide........ %%%", provider, "this is account", account);
   if(!provider || !account) return;
  try {
    let ethBalance = 0;
    const web3 = new Web3(provider);
    const bal = await web3.eth.getBalance(account);
    ethBalance = web3.utils.fromWei(bal, "ether");
    return ethBalance;
  } catch (err) {
    console.log(err, "err from web3");
    throw new Error("faild to fetch balance");
  }
};
