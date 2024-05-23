import { useAsyncInitialize } from './useAsyncInitialize';
import { Address, OpenedContract, toNano } from '@ton/core';
import { CreateMarket, MarketFactory } from '../wrappers/MarketFactory';
import { useTonConnect } from './useTonConnect';
import { useTonClient } from './useTonClient';
import { useEffect, useState } from 'react';

const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time))

export function useMarketFactoryContract() {
  const {client} = useTonClient()
  const {wallet, sender} = useTonConnect()
  const [childAddress, setChildAddress] = useState<string | null>()

  const marketFactoryContract = useAsyncInitialize(async () => {
    if(!client || !wallet) return;

    //TODO: remove hardcoded address
    const contract = MarketFactory.fromAddress(Address.parse("EQCCb3QHBUZeysbKE0kncv_OA1UeDCjWTOzUW4omdjGApK6R"))

    return client.open(contract) as OpenedContract<MarketFactory>
  }, [client, wallet])

  useEffect(()=>{
    async function getChildAddress() {
        if(!marketFactoryContract) return 
        setChildAddress(null)
        const childAddress = (await marketFactoryContract.getChildAddress(0n));
        setChildAddress(childAddress.toString());
        await sleep(5000)
        getChildAddress()
    }
    getChildAddress()

  }, [marketFactoryContract, wallet])

  return {
    address: marketFactoryContract?.address.toString(),
    childAddress: childAddress,
    createMarket: (eventDescription: string, endTime: number, outcomeName1: string, outcomeName2: string) => {
      const message: CreateMarket = {
          $$type: "CreateMarket",
          eventDescription: eventDescription,
          endTime: BigInt(endTime),
          outcomeName1: outcomeName1,
          outcomeName2: outcomeName2,
          numOutcomes: 2n,
      }

      marketFactoryContract?.send(sender, {
          value: toNano("0.05")
      }, message)
    }
  };
}
