import express, { Request, Response } from 'express';
const cors = require('cors');
import * as dotenv from 'dotenv';
import {deployContract, mintToken} from "./apiUtils";
dotenv.config();

const app = express();

app.use(cors())
app.use(express.json());


app.post('/deploy', async (req: Request, res: Response) => {

    const  {name, symbol} = req.body
    console.log(`Value: ${name} , ${symbol}`)

    try {
        const result = await deployContract(name, symbol);
        res.status(200).json({
            message: 'Contract deployed successfully',
            contractAddress: result.contractAddress,
            transactionHash: result.txHash,
            data: JSON.stringify(result.data)
        });
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Contract deployment failed: ${error.message}`);
        } else {
            throw new Error('Contract deployment failed: Unknown error');
        }
    }
});

app.post("/mint", async (req: Request, res: Response) => {
    console.log(`req: ${req.body}`)

    const { contractAddress, to, tokenId, uri } = req.body;

    try {
        const result = await mintToken(contractAddress, to,  tokenId, uri);
        res.status(200).json({
            message: 'token minted',
            transactionHash: result.txHash,
            data: JSON.stringify(result.data)
        });
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Minting failed: ${error.message}`);
        } else {
            throw new Error('Minting failed: Unknown error');
        }
    }
})

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
