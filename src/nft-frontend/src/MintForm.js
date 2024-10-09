import React, { useState } from 'react';

function MintForm() {
  const [contractAddress, setContractAddress] = useState('');
  const [to, setTo] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [uri, setUri] = useState('');
  const [mintResponse, setMintResponse] = useState(null);

  const handleMint = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3000/mint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({contractAddress, to, tokenId: Number(tokenId), uri }),
    });

    const data = await response.json();
    setMintResponse(data);
  };

  return (
    <div>
      <h2>Mint NFT</h2>
      <form onSubmit={handleMint}>
        <input
          type="text"
          placeholder="Target collection"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
        />

        <input
          type="text"
          placeholder="Recipient Address"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Token ID"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Token URI"
          value={uri}
          onChange={(e) => setUri(e.target.value)}
        />
        <button type="submit">Mint</button>
      </form>
      {mintResponse && (
        <div>
          <p>{mintResponse.message}</p>
          <p>Transaction Hash: {mintResponse.transactionHash}</p>
          <p>Data: {mintResponse.data}</p>
        </div>
      )}
    </div>
  );
}

export default MintForm;
