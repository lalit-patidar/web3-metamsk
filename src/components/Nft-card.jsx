import React from 'react'

export default function NftCard({image, name, description, date}) {
  return (
    <div className='card-container' style={{width: 300, borderRadius: 10, display: 'flex', flexDirection: 'column', backgroundColor: "#1aa1a5", marginLeft: 20, marginTop: 20}}>
        <img src={image} alt="Not Available" style={{width: "100%", height: "50%", borderRadius: 10, marginBottom: 10}}/>
        <div className='card-details'>
          <h3>Name : {name}</h3>
          <p style={{overflow: "hidden !important", maxWidth: "100%", textOverflow: "ellipsis", whiteSpace: "nowrap", padding: 10}}>description: {description}</p>
          <p>Date of creation: {new Date(date).toLocaleDateString()}</p>
        </div>
    </div>
  )
}
