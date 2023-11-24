import { useContractRead } from "wagmi";
import { settings } from "./utils";
import { parseEther } from "viem";

export default function Blotto({ address }) {
  const { data: balance } = useContractRead({
    address: settings.tokenAddress,
    abi: [
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "balanceOf",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: `balanceOf`,
    args: [address],
    watch: true,
  });

  const { data: redeemableAmount } = useContractRead({
    address: settings.tokenAddress,
    abi: [
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "getRedeemableAmountOf",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: `getRedeemableAmountOf`,
    args: [address],
    watch: true,
  });

  console.log(balance)
  return (
    <div className="group">
        <p>Balance: {balance ? (Number(balance) / Number(parseEther('1'))).toString() : 0}</p>
        <p>Re-deemable Amount: {redeemableAmount ? (Number(redeemableAmount) / Number(parseEther('1'))).toString() : 0}</p>
    </div>
  )
}
