import { useAsyncInitialize } from './useAsyncInitialize';
import { Address, OpenedContract, toNano } from '@ton/core';
import { PredictionMarket, ResolveMarket } from '../wrappers/PredictionMarket';
import { useTonConnect } from './useTonConnect';
import { useTonClient } from './useTonClient';
import { PlaceBet } from '../wrappers/UserBet';
import { useEffect, useState } from 'react';
import { PredictionMarketDetails } from '../models/predictionMarketDetails';

export function usePredictionMarketContract(marketFactoryContractAddress: string, seqno: number) {
  const {client} = useTonClient()
  const {wallet, sender} = useTonConnect()
  const [predictionMarketDetails, setPredictionMarketDetails] = useState<PredictionMarketDetails>()

  const predictionMarketContract = useAsyncInitialize(async () => {
    if(!client || !wallet) return;
    
    if (marketFactoryContractAddress != null || marketFactoryContractAddress != undefined) {
      const contract = await PredictionMarket.fromInit(Address.parse(marketFactoryContractAddress), BigInt(seqno)); 
      return client.open(contract) as OpenedContract<PredictionMarket>
    }

    return null;
  }, [client, wallet, marketFactoryContractAddress])

  useEffect(() => {
    async function fetchPredictionMarketDetailsArray() {
      if (predictionMarketContract) {
        try {
          const predictionMarketDetailsRes = await predictionMarketContract.getPredictionMarketDetails();
          const predictionMarketDetails: PredictionMarketDetails = createPredictionMarketDetails(predictionMarketDetailsRes, predictionMarketContract.address);
          setPredictionMarketDetails(predictionMarketDetails);
        } catch (e) {
          console.log(e)
        }
      }
    }
    fetchPredictionMarketDetailsArray();
  }, [client, predictionMarketContract]);

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

  async function sendTransaction(message: PlaceBet | ResolveMarket, value: bigint) {
    const lastTrx = await client?.getTransactions(sender.address!, {
      limit: 1,
    });
    let lastHash: string = "";
    if (lastTrx) {
      const last = lastTrx[0];
      lastHash = last.stateUpdate.newHash.toString();
    }
  
    predictionMarketContract?.send(sender, {
      value: value
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
      } 
      iterations--;
    }
  }

  return {
    address: predictionMarketContract?.address.toString(),
    predictionMarketDetails: predictionMarketDetails,
    placeUserBet: async (betAmount: number, outcome: number) => {
      const message: PlaceBet = {
          $$type: "PlaceBet",
          outcome: BigInt(outcome),
      }

      sendTransaction(message, toNano(betAmount) + toNano("0.03"))
    },
    resolveMarket: (outcome: number) => {
      const message: ResolveMarket = {
        $$type: "ResolveMarket",
        outcome: BigInt(outcome),
    }

    sendTransaction(message, toNano("0.02"))
    }
  };
}
