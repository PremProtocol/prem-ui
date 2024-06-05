import { useAsyncInitialize } from './useAsyncInitialize';
import { Address, OpenedContract, toNano } from '@ton/core';
import { CreateMarket, MarketFactory } from '../wrappers/MarketFactory';
import { useTonConnect } from './useTonConnect';
import { useTonClient } from './useTonClient';
import { useEffect, useState } from 'react';
import { PredictionMarket } from '../wrappers/PredictionMarket';
import RedisService from '../services/RedisService';
import { PredictionMarketDetails } from '../models/predictionMarketDetails';

const redisService = new RedisService(import.meta.env.VITE_REDIS_SERVICE_URL);

export function useMarketFactoryContract() {
  const PREDICTION_MARKET_DETAILS_CACHE_PREFIX = "PredictionMarketDetailsArray";
  const PREDICTION_MARKET_COUNT_CACHE_PREFIX = "PredictionMarketCount";
  const {client} = useTonClient()
  const {sender, wallet} = useTonConnect()
  const [predictionMarketCount, setPredictionMarketCount] = useState<number>()
  const [predictionMarketDetailsArray, setPredictionMarketDetailsArray] = useState<PredictionMarketDetails[]>()

  const marketFactoryContract = useAsyncInitialize(async () => {
    if(!client) return;

    const contract = MarketFactory.fromAddress(Address.parse(import.meta.env.VITE_TESTNET_MARKET_FACTORY_CONTRACT))
    return client.open(contract) as OpenedContract<MarketFactory>
  }, [client])

  useEffect(()=>{
    async function getPredictionMarketCount() {
        if(!marketFactoryContract) return 
        let predictionMarketCount = undefined;
        try {
          predictionMarketCount = await redisService.get(PREDICTION_MARKET_COUNT_CACHE_PREFIX);
        } catch (error) {
          console.error('Error getting object from Redis:', error);
        }
        if(predictionMarketCount === undefined) {
          predictionMarketCount = await marketFactoryContract.getPredictionMarketCount();
          predictionMarketCount = await redisService.set(PREDICTION_MARKET_COUNT_CACHE_PREFIX, predictionMarketCount);
        }
        
        setPredictionMarketCount(Number(predictionMarketCount));
    }
    getPredictionMarketCount()
  }, [marketFactoryContract])

  useEffect(() => {
    async function fetchPredictionMarketDetailsArray() {
      if (marketFactoryContract) {
        const tempArray = [];
        if(predictionMarketCount == undefined) return;
        for (let i = 0; i < predictionMarketCount; i++) {
          try {
            try {
              const cachedPredictionMarketDetails = await redisService.getObject(PREDICTION_MARKET_DETAILS_CACHE_PREFIX + i);
              const childAddress = await marketFactoryContract?.getChildAddress(BigInt(i));
              cachedPredictionMarketDetails.selfAddress = childAddress;
              tempArray.push(cachedPredictionMarketDetails);
              continue;
            } catch (error) {
              console.error('Error getting object from Redis:', error);
            }
            
            const childAddress = await marketFactoryContract?.getChildAddress(BigInt(i));
            const childContract = PredictionMarket.fromAddress(childAddress)
            const openedChildContract = client?.open(childContract) as OpenedContract<PredictionMarket>
            const predictionMarketDetailsRes = await openedChildContract.getPredictionMarketDetails();
            const predictionMarketDetails: PredictionMarketDetails = createPredictionMarketDetails(predictionMarketDetailsRes, childAddress);
            console.log(predictionMarketDetails.selfAddress);
            await redisService.setObject(PREDICTION_MARKET_DETAILS_CACHE_PREFIX + i, predictionMarketDetails);
            tempArray.push(predictionMarketDetails);
          } catch (e) {
            console.log(e)
          }
        }
        setPredictionMarketDetailsArray(tempArray)
      }
    }
    fetchPredictionMarketDetailsArray();
  }, [client, marketFactoryContract, predictionMarketCount]);

  function createPredictionMarketDetails(predictionMarketDetailsRes: any, childAddress: Address): PredictionMarketDetails {
    return {
      selfAddress: childAddress,
      owner: predictionMarketDetailsRes.owner,
      eventDescription: predictionMarketDetailsRes.eventDescription,
      eventType: predictionMarketDetailsRes.eventType,
      endTime: predictionMarketDetailsRes.endTime,
      outcomeName1: predictionMarketDetailsRes.outcomeName1,
      outcomeName2: predictionMarketDetailsRes.outcomeName2,
      numOutcomes: predictionMarketDetailsRes.numOutcomes,
      totalOutcomeBets: predictionMarketDetailsRes.totalOutcomeBets || {},
      totalPool: predictionMarketDetailsRes.totalPool || 0n,
      outcome: predictionMarketDetailsRes.outcome || -1n,
      resolved: predictionMarketDetailsRes.resolved || false,
    };
  }

  return {
    address: marketFactoryContract?.address.toString(),
    predictionMarketCount: predictionMarketCount,
    predictionMarketDetailsArray: predictionMarketDetailsArray,
    createMarket: async (eventDescription: string, eventType: string, endTime: number, outcomeName1: string, outcomeName2: string) => {
      if(!wallet || !marketFactoryContract) return;
      console.log(eventType);
      const message: CreateMarket = {
          $$type: "CreateMarket",
          eventDescription: eventDescription,
          eventType: eventType,
          endTime: BigInt(endTime),
          outcomeName1: outcomeName1,
          outcomeName2: outcomeName2,
          numOutcomes: 2n,
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
          await redisService.set(PREDICTION_MARKET_COUNT_CACHE_PREFIX, predictionMarketCount!);
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
