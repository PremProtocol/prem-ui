import { useAsyncInitialize } from './useAsyncInitialize';
import { Address, OpenedContract, toNano } from '@ton/core';
import { PredictionMarket, ResolveMarket } from '../wrappers/PredictionMarket';
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
          value: toNano(betAmount) + toNano("0.03")
      }, message)
    },
    resolveMarket: (outcome: number) => {
      const message: ResolveMarket = {
        $$type: "ResolveMarket",
        outcome: BigInt(outcome),
    }

      predictionMarketContract?.send(sender, {
          value: toNano("0.03")
      }, message)
    }
  };
}
