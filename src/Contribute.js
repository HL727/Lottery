import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { Button } from "flowbite-react";
import { settings } from "./utils";
import { parseEther } from "viem";
import { useEffect } from "react";

export default function Contribute({ period, isConnected, setMessage }) {

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: settings.lotteryAddress,
    abi: [
      {
        name: `contribute${period}`,
        type: "function",
        stateMutability: "payable",
        inputs: [],
        outputs: [],
      },
    ],
    functionName: `contribute${period}`,
    value: parseEther('0.1')
  });

  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    if (isPrepareError || isError) {
      setMessage((prepareError || error)?.message)
    }
    if (isSuccess) {
      setMessage(<div>
        Successfully contributed!
        <div>
          <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
        </div>
      </div>)
    }
  }, [isPrepareError, isError, isSuccess])

  return (
    <div>
      <Button disabled={(!write || isLoading) && isConnected} onClick={() => write()}>
        {isLoading ? "Contributing..." : `Contribute ${period}`}
      </Button>
    </div>
  );
}
