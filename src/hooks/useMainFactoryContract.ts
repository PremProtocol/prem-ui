import { useAsyncInitialize } from './useAsyncInitialize';
import { Address, OpenedContract, toNano } from '@ton/core';
import { CreateMarket, MarketFactory } from '../wrappers/MarketFactory';
import { useTonConnect } from './useTonConnect';
import { useTonClient } from './useTonClient';
import { useEffect, useState } from 'react';

//const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time))

export function useMarketFactoryContract() {
  const {client} = useTonClient()
  const {wallet, sender} = useTonConnect()
  const [predictionMarketCount, setPredictionMarketCount] = useState<number>()

  const marketFactoryContract = useAsyncInitialize(async () => {
    if(!client || !wallet) return;

    //TODO: remove hardcoded address
    const contract = MarketFactory.fromAddress(Address.parse("EQCkO6wRpB5o7MgLFRmSkzhlHk8DukjCXzDf48kj7lWCt8KB"))

    return client.open(contract) as OpenedContract<MarketFactory>
  }, [client, wallet])

  useEffect(()=>{
    async function getAllPredictionMarkets() {
        if(!marketFactoryContract) return 
        setPredictionMarketCount(0)
        const predictionMarketCount = await marketFactoryContract.getPredictionMarketCount();
        setPredictionMarketCount(Number(predictionMarketCount));
    }
    getAllPredictionMarkets()
  }, [marketFactoryContract, wallet])

  return {
    address: marketFactoryContract?.address.toString(),
    predictionMarketCount: predictionMarketCount,
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
    },
    getChildAddress: async (childSeqno: string) => {
      const childAddress = await marketFactoryContract?.getChildAddress(BigInt(childSeqno));
      return childAddress?.toString();
    }
  };
}
