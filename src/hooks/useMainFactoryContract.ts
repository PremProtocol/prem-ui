import { useAsyncInitialize } from './useAsyncInitialize';
import { Address, OpenedContract, toNano } from '@ton/core';
import { CreateMarket, MarketFactory } from '../wrappers/MarketFactory';
import { useTonConnect } from './useTonConnect';
import { useTonClient } from './useTonClient';


export function useCounterContract() {
  const {client} = useTonClient()
  const {wallet, sender} = useTonConnect()
  //const [balance, setBalance] = useState<string | null>()

  const marketFactoryContract = useAsyncInitialize(async () => {
    if(!client || !wallet) return;

    //TODO: remove hardcoded address
    const contract = MarketFactory.fromAddress(Address.parse("EQA7tmETnai0kxuXf2POMneCVJMX_DhOVr0-YiM9pilV-hFi"))

    return client.open(contract) as OpenedContract<MarketFactory>
  }, [client, wallet])

  return {
    address: marketFactoryContract?.address.toString(),
    createMarket: () => {
      const message: CreateMarket = {
          $$type: "CreateMarket",
          eventDescription: "New event",
          endTime: BigInt(Date.now() - 60),
          outcomeName1: "outcomeName1",
          outcomeName2: "outcomeName2",
          numOutcomes: 0n,
      }

      marketFactoryContract?.send(sender, {
          value: toNano("0.05")
      }, message)
  }
  };
}
