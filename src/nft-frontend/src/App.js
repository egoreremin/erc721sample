import React, { useState } from 'react';
import './App.css';
import DeployForm from './deployForm';
import MintForm from './MintForm';

function App() {
  return (
    <div className="App">
      <h1>NFT DApp</h1>
      <DeployForm />
      <MintForm />
    </div>
  );
}

export default App;
