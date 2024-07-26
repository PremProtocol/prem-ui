import { useAsyncInitialize } from './useAsyncInitialize';
import { Address, OpenedContract, toNano } from '@ton/core';
import { CreateMarket, MarketFactory } from '../wrappers/MarketFactory';
import { useTonConnect } from './useTonConnect';
import { useTonClient } from './useTonClient';
import { useEffect, useState } from 'react';

export function useMarketFactoryContract() {
  const {client} = useTonClient()
  const {sender} = useTonConnect()
  const [predictionMarketCount, setPredictionMarketCount] = useState<number>()

  const marketFactoryContract = useAsyncInitialize(async () => {
    if(!client) return;

    const contract = MarketFactory.fromAddress(Address.parse(import.meta.env.VITE_TESTNET_MARKET_FACTORY_CONTRACT))
    return client.open(contract) as OpenedContract<MarketFactory>
  }, [client])

  useEffect(()=>{
    async function getPredictionMarketCount() {
        if(!marketFactoryContract) return 
        let predictionMarketCount = undefined;
        
        if(predictionMarketCount === undefined || predictionMarketCount === null) {
          predictionMarketCount = await marketFactoryContract.getPredictionMarketCount();
        }
        
        setPredictionMarketCount(Number(predictionMarketCount));
    }
    getPredictionMarketCount()
  }, [marketFactoryContract])

  return {
    address: marketFactoryContract?.address.toString(),
    predictionMarketCount: predictionMarketCount,
    createMarket: async (eventName: string, eventDescription: string, eventType: string, endTime: number, outcomeName1: string, outcomeName2: string) => {
      if(!marketFactoryContract) return;
      const message: CreateMarket = {
          $$type: "CreateMarket",
          eventName: eventName,
          eventDescription: eventDescription,
          eventType: eventType,
          endTime: BigInt(endTime),
          outcomeName1: outcomeName1,
          outcomeName2: outcomeName2,
      }
      
      const lastTrx = await client?.getTransactions(sender.address!, {
        limit: 1,
      });
      let lastHash: string = "";
      if (lastTrx) {
        const last = lastTrx[0];
        lastHash = last.stateUpdate.newHash.toString();
      }
      
      marketFactoryContract?.send(sender, {
          value: toNano("0.06")
      }, message);

      let txHash = lastHash;
      let iterations = 60;
      while (txHash == lastHash || iterations === 0) {
        await new Promise((r) => setTimeout(r, 5000)); // some delay between API calls
        const tx = await client?.getTransactions(sender.address!, {
          limit: 1,
        });
        if (tx) txHash = tx[0].stateUpdate.newHash.toString();

        if (txHash != lastHash) {
          //Push notification about transaction success
          console.log('Transaction succeeded:');
          setPredictionMarketCount(predictionMarketCount! + 1);
        } 
        iterations--;
      }
    },
    getChildAddress: async (childSeqno: string) => {
      const childAddress = await marketFactoryContract?.getChildAddress(BigInt(childSeqno));
      return childAddress?.toString();
    }
  };
}
