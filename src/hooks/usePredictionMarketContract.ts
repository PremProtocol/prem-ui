import { useAsyncInitialize } from './useAsyncInitialize';
import { Address, OpenedContract, toNano } from '@ton/core';
import { PredictionMarket, ResolveMarket } from '../wrappers/PredictionMarket';
import { useTonConnect } from './useTonConnect';
import { useTonClient } from './useTonClient';
import { PlaceBet } from '../wrappers/UserBet';

export function usePredictionMarketContract(predictionMarketAddress: Address) {
  //const redisService = new RedisService(import.meta.env.VITE_REDIS_SERVICE_URL);
  //const PREDICTION_MARKET_DETAILS_CACHE_PREFIX = "PredictionMarketDetails";
  const {client} = useTonClient()
  const {wallet, sender} = useTonConnect()

  const predictionMarketContract = useAsyncInitialize(async () => {
    if(!client || !wallet) return;

    if (predictionMarketAddress != null && predictionMarketAddress != undefined) {
      const contract = PredictionMarket.fromAddress(predictionMarketAddress)
      return client.open(contract) as OpenedContract<PredictionMarket>
    }

    return null;
  }, [client, wallet, predictionMarketAddress])

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
