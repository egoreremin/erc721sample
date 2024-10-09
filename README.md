This is a sample erc721 creation app.

To run demo:

    1. Set .env params in global scope - "RPC_URL", "PRIVATE_KEY", "ETHERSCAN_API_KEY"
        RPC_URL - url to sepolia test-network node;
        PRIVATE_KEY - wallet private key;
    2. Compile contract - from hardhat root-lib - npx hardhat compile
    3. Run express server - from root - npm run start:server
    4. Run FE server - from nft-frontend root - npm start
