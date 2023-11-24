import { useEffect, useState } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from "wagmi";
import { Button, Card } from "flowbite-react";
import Contribute from "./Contribute";
import Pool from "./Pool";
import Blotto from "./Blotto";

export default function Profile() {
  const [message, setMessage] = useState('')
  const { address, connector, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    if (error) {
      setMessage(error.message)
    }
  }, [error])

  return (
    <div className="flex flex-col justify-center items-center gap-5 w-max mx-auto max-w-lg mt-10">
      {isConnected ? (
        <Card className="w-full">
          <div>{ensName ? `${ensName} (${address})` : address}</div>
          <div>Connected to {connector?.name}</div>
          <Button onClick={disconnect}>Disconnect</Button>
        </Card>
      ) : (
        <Card className="w-full">
          {connectors.map((connector) => (
            <Button
              disabled={!connector.ready}
              key={connector.id}
              onClick={() => connect({ connector })}
            >
              {connector.name}
              {!connector.ready && " (unsupported)"}
              {isLoading &&
                connector.id === pendingConnector?.id &&
                " (connecting)"}
            </Button>
          ))}

          {error && <div>{error.message}</div>}
        </Card>
      )}
      <Card className="w-full">
        <div>
          <Blotto address={address} />
        </div>
        <div className="flex justify-center items-center gap-3">
          <Pool period={"Daily"} />
          <Pool period={"Weekly"} />
          <Pool period={"Monthly"} />
        </div>
        <div className="flex justify-center items-center gap-3">
          <Contribute period={"Daily"} isConnected={isConnected} setMessage={setMessage} />
          <Contribute period={"Weekly"} isConnected={isConnected} setMessage={setMessage} />
          <Contribute period={"Monthly"} isConnected={isConnected} setMessage={setMessage} />
        </div>
        <Card className="w-full overflow-hidden">
          {message}
        </Card>
      </Card>
    </div>
  );
}
