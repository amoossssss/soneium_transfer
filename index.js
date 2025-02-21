import dotenv from "dotenv";
import { ethers } from "ethers";

dotenv.config();

const provider = new ethers.JsonRpcProvider("https://rpc.soneium.org/");
const wallet = new ethers.Wallet(process.env.WALLET_1_KEY, provider);

const transfer = async () => {
  const tx = await wallet.sendTransaction({
    to: process.env.WALLET_2_ADDRESS,
    value: ethers.parseUnits(process.env.ETH_AMOUNT_SEND, "ether"),
  });
  await tx.wait();
};

const main = async () => {
  for (let index = 0; index < Number(process.env.ROUND_COUNT); index += 1) {
    await transfer();
    console.log(`Round ${index + 1} complete.`);
  }
};

main()
  .then(() => {
    console.log("All Done!");
  })
  .catch((error) => {
    console.error("Error:", error);
  });
