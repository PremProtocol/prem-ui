import { useAsyncInitialize } from './useAsyncInitialize';
import { Address, OpenedContract, toNano } from '@ton/core';
import { AddLiquidity, PredictionMarket, RemoveLiquidity, ResolveMarket } from '../wrappers/PredictionMarket';
import { useTonConnect } from './useTonConnect';
import { useTonClient } from './useTonClient';
import { PlaceBet } from '../wrappers/UserBet';
import { useEffect, useState } from 'react';
import { PredictionMarketDetails } from '../models/predictionMarketDetails';

export function usePredictionMarketContract(marketFactoryContractAddress: string, seqno: number) {
  const MAX_RETRY_AMOUNT = import.meta.env.VITE_PREDICTION_MARKET_RETRY_COUNT
  const {client} = useTonClient()
  const {wallet, sender} = useTonConnect()
  const [predictionMarketDetails, setPredictionMarketDetails] = useState<PredictionMarketDetails>()
  const [currentAttempt, setCurrentAttempt] = useState(0);

  const predictionMarketContract = useAsyncInitialize(async () => {
    if(!client || !wallet) return;
    
    if (marketFactoryContractAddress != null || marketFactoryContractAddress != undefined) {
      const contract = await PredictionMarket.fromInit(Address.parse(marketFactoryContractAddress), BigInt(seqno)); 
      return client.open(contract) as OpenedContract<PredictionMarket>
    }

    return null;
  }, [client, wallet, marketFactoryContractAddress])

  useEffect(() => {
    async function fetchPredictionMarketDetails() {
      if (predictionMarketContract) {
        const attempts = MAX_RETRY_AMOUNT;
        for(let i = 0; i < attempts; i++) {
          try {
            const predictionMarketDetailsRes = await predictionMarketContract.getPredictionMarketDetails();
            if (predictionMarketDetailsRes.isRemoved) {
              break
            }
            const predictionMarketDetails: PredictionMarketDetails = mapPredictionMarketDetails(predictionMarketDetailsRes, predictionMarketContract.address);
            setPredictionMarketDetails(predictionMarketDetails);
            break; // If successful, break the loop
          } catch (e) {
            setCurrentAttempt(i + 1);
            if(i === attempts - 1) {
              console.log(e); // If this was the last attempt, log the error
            }
          }
        }
      }
    }
    fetchPredictionMarketDetails();
  }, [client, predictionMarketContract, MAX_RETRY_AMOUNT]);

  function mapPredictionMarketDetails(predictionMarketDetailsRes: any, childAddress: Address): PredictionMarketDetails {
    return {
      selfAddress: childAddress,
      owner: predictionMarketDetailsRes.owner,
      parent: predictionMarketDetailsRes.parent,
      seqno: predictionMarketDetailsRes.seqno,
      eventName: predictionMarketDetailsRes.eventName,
      eventDescription: predictionMarketDetailsRes.eventDescription,
      eventType: predictionMarketDetailsRes.eventType,
      endTime: predictionMarketDetailsRes.endTime,
      outcomeName1: predictionMarketDetailsRes.outcomeName1,
      outcomeName2: predictionMarketDetailsRes.outcomeName2,
      numOutcomes: predictionMarketDetailsRes.numOutcomes,
      totalOutcome1Bets: predictionMarketDetailsRes.totalOutcome1Bets,
      totalOutcome2Bets: predictionMarketDetailsRes.totalOutcome2Bets,
      totalPool: predictionMarketDetailsRes.totalPool || 0n,
      totalLiquidity: predictionMarketDetailsRes.totalLiquidity || 0n,
      reserve1: predictionMarketDetailsRes.reserve1 || 0n,
      reserve2: predictionMarketDetailsRes.reserve2 || 0n,
      outcome: predictionMarketDetailsRes.outcome,
      resolved: predictionMarketDetailsRes.resolved || false,
      protocolFees: predictionMarketDetailsRes.protocolFees || 0n,
      protocolFeePercentage: predictionMarketDetailsRes.protocolFeePercentage || 0n
    };
  }

  async function sendTransaction(message: PlaceBet | ResolveMarket | AddLiquidity | RemoveLiquidity, value: bigint) {
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
    currentAttempt: currentAttempt,
    predictionMarketDetails: predictionMarketDetails,
    placeUserBet: async (betAmount: number, outcome: number) => {
      const message: PlaceBet = {
          $$type: "PlaceBet",
          amount: BigInt(toNano(betAmount)),
          outcome: BigInt(outcome),
      }

      sendTransaction(message, toNano(betAmount) + toNano("0.02"))
    },
    addLiquidity: async (amount: number, oddsForOutcome1: number) => {
      const message: AddLiquidity = {
          $$type: "AddLiquidity",
          amount: BigInt(toNano(amount)),
          oddsForOutcome1: BigInt(oddsForOutcome1),
      }

      sendTransaction(message, toNano(amount) + toNano("0.03"))
    },
    removeLiquidity: async (amount: number) => {
      const message: RemoveLiquidity = {
          $$type: "RemoveLiquidity",
          amount: BigInt(toNano(amount)),
      }

      sendTransaction(message, toNano("0.03"))
    },
    resolveMarket: (outcome: number) => {
      const message: ResolveMarket = {
        $$type: "ResolveMarket",
        outcome: BigInt(outcome),
      }

      sendTransaction(message, toNano("0.02"))
    },
    claimFee: () => {
      predictionMarketContract?.send(sender, {
        value: toNano("0.02")
      }, "collectFees");
    },
    removeMarket: () => {
      predictionMarketContract?.send(sender, {
        value: toNano("0.01")
      }, "remove");
    }
  };
}
