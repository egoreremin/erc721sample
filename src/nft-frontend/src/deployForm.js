import React, { useState } from 'react';

function DeployForm() {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [deployResponse, setDeployResponse] = useState(null);

  const handleDeploy = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3000/deploy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, symbol }),
    });

    const data = await response.json();
    setDeployResponse(data);
  };

  return (
    <div>
      <h2>Deploy NFT Collection</h2>
      <form onSubmit={handleDeploy}>
        <input
          type="text"
          placeholder="Contract Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Contract Symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
        <button type="submit">Deploy</button>
      </form>
      {deployResponse && (
        <div>
          <p>{deployResponse.message}</p>
          <p>Contract Address: {deployResponse.contractAddress}</p>
          <p>Data: {deployResponse.data}</p>
        </div>
      )}
    </div>
  );
}

export default DeployForm;
