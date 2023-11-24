import { useContractRead } from "wagmi";
import { settings } from "./utils";
import { parseEther } from "viem";

export default function Pool({period}) {
  const {
    data,
  } = useContractRead({
    address: settings.lotteryAddress,
    abi: [
      {
        inputs: [],
        name: `${period.toLowerCase()}Pool`,
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
    functionName: `${period.toLowerCase()}Pool`,
    watch: true,
  });

  return (
    <div className="pool">
        <div>{period}: </div>
        <div>{data ? (Number(data) / Number(parseEther('1'))).toString() : 0}</div>
    </div>
  )
}
