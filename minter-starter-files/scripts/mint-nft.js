require('dotenv').config();
const ethers = require('ethers');

// Get Alchemy API Key
const API_KEY = "vugAcreb0GmpzVtlAXJgjRGw4JxaycEZ";//process.env.API_KEY;

// Define an Alchemy Provider
const provider = new ethers.providers.AlchemyProvider('goerli', API_KEY)

//const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
const contract = require("../artifacts/contracts/MaxiNFT.sol/MaxiNFT.json");

// Create a signer
const privateKey = "34d92c0085aa72f9e55c7f2827bab0ea3a184910dc59803970653ba3000901d8"//process.env.PRIVATE_KEY
const signer = new ethers.Wallet(privateKey, provider)

// Get contract ABI and address
const abi = contract.abi
const contractAddress = '0x4120CA8831865332c4987187B94bf638f3ead755'//'0x4120CA8831865332c4987187B94bf638f3ead755'

// Create a contract instance
const myNftContract = new ethers.Contract(contractAddress, abi, signer)

// Get the NFT Metadata IPFS URL
const tokenUri = "https://gateway.pinata.cloud/ipfs/QmPgb6hLKrdqebdmVZETg3Mjp2GgvURcgT1EzVZthYnKyP"

// Call mintNFT function
const mintNFT = async () => {
    let nftTxn = await myNftContract.mintNFT(signer.address, tokenUri)
    await nftTxn.wait()
    console.log(`NFT Minted! Check it out at: https://goerli.etherscan.io/tx/${nftTxn.hash}`)
}

mintNFT()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });