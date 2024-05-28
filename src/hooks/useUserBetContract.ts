import { useTonClient } from "./useTonClient"
import { useTonConnect } from "./useTonConnect"
import { useAsyncInitialize } from "./useAsyncInitialize"
import { UserBet } from "../wrappers/UserBet"
import { Address, OpenedContract } from "@ton/core"

export function useUserBetContract(predictionMarketContractAddress: Address) {
  const {client} = useTonClient()
  const {wallet} = useTonConnect()
  
  const userBetContract = useAsyncInitialize(async () => {
    if(!client || !wallet) return;
    console.log(wallet, predictionMarketContractAddress)
    const contract = await UserBet.fromInit(Address.parse(wallet), predictionMarketContractAddress)
    return client.open(contract) as OpenedContract<UserBet>
  }, [client, wallet])

  return {
    address: userBetContract?.address.toString(),
  };
}
