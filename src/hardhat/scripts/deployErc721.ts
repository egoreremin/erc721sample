import { ethers } from "hardhat";
import verify from "./verifyErc721";
async function main() {
  // Get the contract factory for the Erc721collection contract
  const Erc721collection = await ethers.getContractFactory("Erc721collection");

  const name = "MyNFTCollection";  // Replace with your collection name
  const symbol = "MNFT";           // Replace with your collection symbol

  // Deploy the contract
  const erc721 = await Erc721collection.deploy(name, symbol);

  // Wait for the contract to be deployed
  await erc721.waitForDeployment();

  console.log("Erc721collection deployed to:", await erc721.getAddress());

  await verify(await erc721.getAddress(), [name, symbol]);

}

// Error handling for async/await
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });