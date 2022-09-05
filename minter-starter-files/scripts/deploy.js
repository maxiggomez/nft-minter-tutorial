async function main() {
    // Grab the contract factory 
    const MaxiNFT = await ethers.getContractFactory("MaxiNFT");
 
    // Start deployment, returning a promise that resolves to a contract object
    const maxiNFT = await MaxiNFT.deploy(); // Instance of the contract 
    console.log("Contract deployed to address:", maxiNFT.address);
 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });