// CHANGE CONTRACT ADDRESS
const NFT_ADDRESS = '0x8a90cab2b38dba80c64b7734e58ee1db38b8992e';

const fs = require('fs');
const {ethers} = require('ethers');

const ETH_MAINNET = "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
// const AVAX_MAINNET = "https://api.avax.network/ext/bc/C/rpc";
// const MATIC_MAINNET = "https://polygon-rpc.com";
// const BSC_MAINNET = "https://bsc-dataseed.binance.org/";
// const FTM_MAINNET = "https://rpc.ftm.tools";

const ABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MAX_SUPPLY",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
];
const provider = new ethers.providers.JsonRpcProvider(ETH_MAINNET);
const nftContract = new ethers.Contract(NFT_ADDRESS, ABI, provider);

async function getAddresses() {
  const max = await nftContract.MAX_SUPPLY();
  let count = 0;
  const allAddresses = [];
  while(count < Number(max)) {
    const address = await nftContract.ownerOf(count);
    allAddresses.push(address);
    console.log(count, address);
    count++;
  }
  return [...new Set(allAddresses)];
}

function saveJSON(path, json) {
  fs.writeFileSync(path, JSON.stringify(json, null, 4));
}

getAddresses()
.then((data)=>{
  fs.writeFileSync('./addresses.json', JSON.stringify(data, null, 4));
})
