import { useAsyncInitialize } from './useAsyncInitialize';
import { Address, OpenedContract, toNano } from '@ton/core';
import { PredictionMarket } from '../wrappers/PredictionMarket';
import { useTonConnect } from './useTonConnect';
import { useTonClient } from './useTonClient';
import { PlaceBet } from '../wrappers/UserBet';

//const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time))

export function usePredictionMarketContract(predictionMarketAddress: string) {
  const {client} = useTonClient()
  const {wallet, sender} = useTonConnect()

  const predictionMarketContract = useAsyncInitialize(async () => {
    if(!client || !wallet) return;

    if (predictionMarketAddress != null && predictionMarketAddress !== "") {
      console.log(predictionMarketAddress);
      const contract = PredictionMarket.fromAddress(Address.parse(predictionMarketAddress))
      return client.open(contract) as OpenedContract<PredictionMarket>
    }

    return null;
  }, [client, wallet, predictionMarketAddress])

  return {
    address: predictionMarketContract?.address.toString(),
    placeUserBet: (betAmount: string, outcome: number) => {
      const message: PlaceBet = {
          $$type: "PlaceBet",
          outcome: BigInt(outcome),
      }

      predictionMarketContract?.send(sender, {
          value: toNano(betAmount)
      }, message)
    },
    getPredictionMarket: async () => {
      console.log(predictionMarketContract);
      const getPredictionMarketDetails = await predictionMarketContract?.getPredictionMarketDetails();
      return getPredictionMarketDetails;
    }
  };
}
