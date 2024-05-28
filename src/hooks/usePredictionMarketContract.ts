import { useAsyncInitialize } from './useAsyncInitialize';
import { Address, OpenedContract, toNano } from '@ton/core';
import { PredictionMarket } from '../wrappers/PredictionMarket';
import { useTonConnect } from './useTonConnect';
import { useTonClient } from './useTonClient';
import { PlaceBet } from '../wrappers/UserBet';

export function usePredictionMarketContract(predictionMarketAddress: Address) {
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

  return {
    address: predictionMarketContract?.address.toString(),
    placeUserBet: (betAmount: number, outcome: number) => {
      const message: PlaceBet = {
          $$type: "PlaceBet",
          outcome: BigInt(outcome),
      }

      predictionMarketContract?.send(sender, {
          value: toNano(betAmount)
      }, message)
    },
    getPredictionMarket: async () => {
      const getPredictionMarketDetails = await predictionMarketContract?.getPredictionMarketDetails();
      return getPredictionMarketDetails;
    }
  };
}
