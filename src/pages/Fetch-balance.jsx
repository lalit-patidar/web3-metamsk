import React, {useEffect, useRef, useState, useMemo} from 'react'
import { fetchWlletBalance } from '../services/web3-fetch-account';


export default function FetchBalance(props) {
  const [userAccount, setUserAccount] = useState("");
  const [balance, setBalance] = useState(0);
  const rpcNetworkAddr = useRef(null);
  const [networkID, setNetworkID] = useState(0);

    useEffect(() => {
      console.log("hello challa")
      fetchAccountsFromMetamask()
      // fetchNFTS()
    }, [userAccount, networkID])

    // const fetchNFTS = async () => {
    //   try { 
    //       const {data} = await axios.get("https://api.opensea.io/api/v1/assets?owner=0xCC1b61623E32d54237d616472e7f3a34DC252399&order_direction=desc&offset=0&limit=50");
    //       console.log("nfts daata", data)
    //   } catch (err) {
    //      console.log("error in fetching nfts...");
    //   }

    // }

    const fetchAccountsFromMetamask = async () => {
      try {
        let provider = window.ethereum;
        let selectedAccount = "";
        if(typeof provider !== "undefined") {
              rpcNetworkAddr.current = provider;
              const accounts = await provider.request({method: "eth_requestAccounts"})
              selectedAccount = accounts[0];
              setUserAccount(selectedAccount);
              console.log(`accounts is selected... promise ${accounts}`);
       
    
            // run on account change;
             window.ethereum.on("accountsChanged", (accounts) => {
               selectedAccount = accounts[0];
               setUserAccount(selectedAccount);
               console.log("selected account has been changed", selectedAccount);
            });

            window.ethereum.on("networkChanged", (changedProvider) => {
              rpcNetworkAddr.current = provider;
              setNetworkID(provider.chainId);
              console.log(changedProvider, "hhjh", provider.chainId)
            })

            const wallletBalance = await fetchWlletBalance(provider, selectedAccount);
            console.log(wallletBalance, "this function wallet bal...")
            setBalance(wallletBalance);
        } else { 
          alert("please install metamask to see wallet balance")
        }
    } catch (err) {
        console.log("err", err)
      }
    }

  return (
    <div className='wallet-balance-container' style={{width: 500, height: 400, borderRadius: 10, backgroundColor: "orange", margin: " 80px auto", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <h2>Wallet balance will shows Here from metamask wallet</h2>
        <h1>ETH : {balance}</h1>
        <p><b>Note</b> - To show wallet ballence please install metamask and then select your account</p>
    </div>
  )
}
