import { getHttpEndpoint } from "@orbs-network/ton-access";
import { CHAIN } from "@tonconnect/ui-react";
import { TonClient } from "@ton/ton";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonConnect } from "./useTonConnect";

export function useTonClient() {
    let {network} = useTonConnect()

    return {
        client: useAsyncInitialize(async ()=>{
            if(!network) {
                network = CHAIN.TESTNET;
            }

            return new TonClient({
                endpoint: await getHttpEndpoint({
                    network: network === CHAIN.MAINNET ? "mainnet" : "testnet"
                })
            })
        }, [network])
    }
}