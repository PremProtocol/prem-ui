import { useAsyncInitialize } from './useAsyncInitialize';
import { Address, Dictionary, OpenedContract, toNano } from '@ton/core';
import { CreateMarket, MarketFactory } from '../wrappers/MarketFactory';
import { useTonConnect } from './useTonConnect';
import { useTonClient } from './useTonClient';
import { useEffect, useState } from 'react';
import { PredictionMarket } from '../wrappers/PredictionMarket';

export type PredictionMarketDetails = {
  selfAddress: Address;
  owner: Address;
  eventDescription: string;
  endTime: bigint;
  outcomeName1: string;
  outcomeName2: string;
  numOutcomes: bigint;
  totalOutcomeBets: Dictionary<any, any>;
  totalPool: bigint;
  outcome: bigint;
  resolved: boolean;
};

export function useMarketFactoryContract() {
  const {client} = useTonClient()
  const {wallet, sender} = useTonConnect()
  const [predictionMarketCount, setPredictionMarketCount] = useState<number>()
  const [predictionMarketDetailsArray, setPredictionMarketDetailsArray] = useState<PredictionMarketDetails[]>()

  const marketFactoryContract = useAsyncInitialize(async () => {
    if(!client || !wallet) return;

    //TODO: remove hardcoded address
    const contract = MarketFactory.fromAddress(Address.parse("EQBxPAlndQoeDKOe6BFODVAF8rirvqsP8-U4-iD3KAMtrfyj"))

    return client.open(contract) as OpenedContract<MarketFactory>
  }, [client, wallet])

  useEffect(()=>{
    async function getPredictionMarketCount() {
        if(!marketFactoryContract) return 
        const predictionMarketCount = await marketFactoryContract.getPredictionMarketCount();
        setPredictionMarketCount(Number(predictionMarketCount));
    }
    getPredictionMarketCount()
  }, [marketFactoryContract])

  useEffect(() => {
    async function fetchData() {
      if (marketFactoryContract) {
        const tempArray = [];
        if(predictionMarketCount == undefined) return;
        for (let i = 0; i < predictionMarketCount; i++) {
          try {
            const childAddress = await marketFactoryContract?.getChildAddress(BigInt(i));
            const childContract = PredictionMarket.fromAddress(childAddress)
            const openedChildContract = client?.open(childContract) as OpenedContract<PredictionMarket>
            const predictionMarketDetailsRes = await openedChildContract.getPredictionMarketDetails();
            const predictionMarketDetails: PredictionMarketDetails = {
              selfAddress: childAddress,
              owner: predictionMarketDetailsRes.owner,
              eventDescription: predictionMarketDetailsRes.eventDescription,
              endTime: predictionMarketDetailsRes.endTime,
              outcomeName1: predictionMarketDetailsRes.outcomeName1,
              outcomeName2: predictionMarketDetailsRes.outcomeName2,
              numOutcomes: predictionMarketDetailsRes.numOutcomes,
              totalOutcomeBets: predictionMarketDetailsRes.totalOutcomeBets,
              totalPool: predictionMarketDetailsRes.totalPool,
              outcome: predictionMarketDetailsRes.outcome,
              resolved: predictionMarketDetailsRes.resolved,
            };
            tempArray.push(predictionMarketDetails);
          } catch (e) {
            console.log(e)
          }
        }
        console.log("temp " + tempArray)
        setPredictionMarketDetailsArray(tempArray)
      }
    }
    fetchData();
  }, [client, marketFactoryContract, predictionMarketCount]);


  return {
    address: marketFactoryContract?.address.toString(),
    predictionMarketCount: predictionMarketCount,
    predictionMarketDetailsArray: predictionMarketDetailsArray,
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
          value: toNano("0.06")
      }, message)
    },
    getChildAddress: async (childSeqno: string) => {
      const childAddress = await marketFactoryContract?.getChildAddress(BigInt(childSeqno));
      return childAddress?.toString();
    },
    addNewPredictionMarket: () => {
      setPredictionMarketCount(predictionMarketCount! + 1)
    }
  };
}
