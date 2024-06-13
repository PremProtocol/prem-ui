import { useTonClient } from "./useTonClient"
import { useTonConnect } from "./useTonConnect"
import { useAsyncInitialize } from "./useAsyncInitialize"
import { UserBet } from "../wrappers/UserBet"
import { Address, OpenedContract, toNano } from "@ton/core"
import { useEffect, useState } from "react"
import { UserBetInfo } from "../wrappers/PredictionMarket"

export function useUserBetContract(predictionMarketContractAddress: string) {
  const {client} = useTonClient()
  const {wallet, sender} = useTonConnect()
  const [userBet, setUserBet] = useState<UserBetInfo>();
  const [isNotUserBetContract, setIsNotUserBetContract] = useState<boolean>(false);

  const userBetContract = useAsyncInitialize(async () => {
    if(!client || !wallet || !predictionMarketContractAddress) return;
    const contract = await UserBet.fromInit(Address.parse(wallet), Address.parse(predictionMarketContractAddress))
    return client.open(contract) as OpenedContract<UserBet>
  }, [client, wallet, predictionMarketContractAddress])

  useEffect(() => {
    async function fetchData() {
      try{
        const userBet = await userBetContract?.getUserBet();
        setUserBet(userBet);
      } catch (e){
        setIsNotUserBetContract(true);
      }
    }

    fetchData();
  }, [userBetContract, wallet]);

  return {
    address: userBetContract?.address.toString(),
    userBet: userBet,
    isNotUserBetContract: isNotUserBetContract,
    claimWinnings: () => {

      userBetContract?.send(sender, {
          value: toNano("0.1")
      }, "claimWinnings")
    }
  };
}
