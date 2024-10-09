import {ethers} from 'ethers';
import * as dotenv from 'dotenv';

dotenv.config();

const contractABI = require('../hardhat/artifacts/contracts/Erc721collection.sol/Erc721collection.json').abi;
const contractBytecode = require('../hardhat/artifacts/contracts/Erc721collection.sol/Erc721collection.json').bytecode;

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? '', provider);

const createdCollections: any = []
const mintedItems: any = []
export const deployContract = async (name: any, symbol: any) => {
    try {
        const contractFactory = new ethers.ContractFactory(contractABI, contractBytecode, wallet);

        console.log('Deploying contract...');

        const contract = await contractFactory.deploy(name, symbol);

        await contract.on('CollectionCreated', (collAddress: any, name: string, symbol: number) => {
            console.log("CollectionCreated event: ", [contract.target, name, symbol])
            createdCollections.push([contract.target, name, symbol])
        })

        await contract.on('TokenMinted', (collAddress: any, to: string, tokenId: number, uri: string) => {
            console.log("TokenMinted event: ", [contract.target, to, tokenId, uri])
            mintedItems.push([contract.target.toString(), to.toString(), tokenId.toString(), uri])
        })
        console.log('Contract deployment transaction hash:', contract.deploymentTransaction()?.hash);

        const receipt = await contract.waitForDeployment();
        console.log('Contract deployed at:', contract.target);

        return {
            contractAddress: contract.target,
            txHash: contract.deploymentTransaction()?.hash,
            data: createdCollections
        };
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Contract deployment failed: ${error.message}`);
        } else {
            throw new Error('Contract deployment failed: Unknown error');
        }
    }
};

export const mintToken = async (contractAddress: any, to: any, tokenId: any, uri: any) => {
    try {
        console.log('Minting token...');

        const contractIns = new ethers.Contract(contractAddress, contractABI, wallet);
        const mintTx = await contractIns.mint(to, tokenId, uri);

        console.log('Mint transaction hash:', mintTx.hash);

        await mintTx.wait();
        console.log('Token minted successfully');
        return {
            txHash: mintTx.hash,
            data: mintedItems
        };
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Token minting failed: ${error.message}`);
        } else {
            throw new Error('Token minting failed: Unknown error');
        }
    }
};