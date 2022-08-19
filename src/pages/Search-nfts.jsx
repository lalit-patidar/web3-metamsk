import React, { useEffect, useState } from 'react'
import axios from 'axios';
import NftCard from '../components/Nft-card';

function getDate(d)
{
    var day, month, year;

    let result = d.match("[0-9]{2}([\-/ \.])[0-9]{2}[\-/ \.][0-9]{4}");
    if(null != result) {
        let dateSplitted = result[0].split(result[1]);
        day = dateSplitted[0];
        month = dateSplitted[1];
        year = dateSplitted[2];
    }
    result = d.match("[0-9]{4}([\-/ \.])[0-9]{2}[\-/ \.][0-9]{2}");
    if(null != result) {
        let dateSplitted = result[0].split(result[1]);
        day = dateSplitted[2];
        month = dateSplitted[1];
        year = dateSplitted[0];
    }

    if(month>12) {
        let aux = day;
        day = month;
        month = aux;
    }

    return year+"/"+month+"/"+day;
}

export default function SearchNfts() {
    const [urlValue, setUrlValue] = useState("");
    const [nftData, setNftData] = useState([]);

    useEffect(() => {
        // fetchNfts(urlValue)
    }, [])

    const onHandleSubmit = () => {
      fetchNfts(urlValue)
    }

    const fetchNfts = async (account) => {
     if(!account) return;
      try {
          const {data} = await  axios.get(`https://api.opensea.io/api/v1/collections?asset_owner=${account}&offset=0&limit=10`, {headers: {'Content-Type': 'application/json',}});
          console.log(data);
          setNftData(data)
          console.log(new Date(data[0].created_date).toLocaleDateString(), "this is date")
      } catch (err) {
         console.log(err, "error in fetching nft");
      }
    }

    const onChangeHander = (e) => {
        let {value : url} = e.target;
        setUrlValue(url);
    }

  return (
    <div className='contanier-1.0'>
    <div className='search-box-container'>
          <h2>Type Your Account Public key to seach NFT</h2>
        <input type="text" value={urlValue} onChange={onChangeHander} placeholder='type opensea api' />
        <button onClick={onHandleSubmit}>find</button>
    </div>
    <div className='nfts-container' style={{"display": "flex", flexDirection: "row", flexWrap: "wrap", width: "80%",  margin: "50px auto"}}>
         {nftData.map((nft, index) => <NftCard key={index + " k"} image={nft.image_url} name={nft.name} date={nft.created_date} description={nft.description}/>)}
    </div>
    </div>
  )
}
