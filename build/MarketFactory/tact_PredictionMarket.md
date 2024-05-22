# TACT Compilation Report
Contract: PredictionMarket
BOC Size: 1662 bytes

# Types
Total Types: 16

## StateInit
TLB: `_ code:^cell data:^cell = StateInit`
Signature: `StateInit{code:^cell,data:^cell}`

## Context
TLB: `_ bounced:bool sender:address value:int257 raw:^slice = Context`
Signature: `Context{bounced:bool,sender:address,value:int257,raw:^slice}`

## SendParameters
TLB: `_ bounce:bool to:address value:int257 mode:int257 body:Maybe ^cell code:Maybe ^cell data:Maybe ^cell = SendParameters`
Signature: `SendParameters{bounce:bool,to:address,value:int257,mode:int257,body:Maybe ^cell,code:Maybe ^cell,data:Maybe ^cell}`

## Deploy
TLB: `deploy#946a98b6 queryId:uint64 = Deploy`
Signature: `Deploy{queryId:uint64}`

## DeployOk
TLB: `deploy_ok#aff90f57 queryId:uint64 = DeployOk`
Signature: `DeployOk{queryId:uint64}`

## FactoryDeploy
TLB: `factory_deploy#6d0ff13b queryId:uint64 cashback:address = FactoryDeploy`
Signature: `FactoryDeploy{queryId:uint64,cashback:address}`

## ChangeOwner
TLB: `change_owner#819dbe99 queryId:uint64 newOwner:address = ChangeOwner`
Signature: `ChangeOwner{queryId:uint64,newOwner:address}`

## ChangeOwnerOk
TLB: `change_owner_ok#327b2b4a queryId:uint64 newOwner:address = ChangeOwnerOk`
Signature: `ChangeOwnerOk{queryId:uint64,newOwner:address}`

## CreateMarketResponse
TLB: `create_market_response#f0999b85 address:address = CreateMarketResponse`
Signature: `CreateMarketResponse{address:address}`

## CreateMarket
TLB: `create_market#1407949d eventDescription:^string endTime:uint64 outcomeName1:^string outcomeName2:^string numOutcomes:uint8 = CreateMarket`
Signature: `CreateMarket{eventDescription:^string,endTime:uint64,outcomeName1:^string,outcomeName2:^string,numOutcomes:uint8}`

## PlaceBet
TLB: `place_bet#b863dd1f outcome:int8 = PlaceBet`
Signature: `PlaceBet{outcome:int8}`

## ResolveMarket
TLB: `resolve_market#46e6f3c8 outcome:int8 = ResolveMarket`
Signature: `ResolveMarket{outcome:int8}`

## ClaimWinningsInfo
TLB: `claim_winnings_info#40c64062 betAmount:uint64 userBet:address outcome:int8 = ClaimWinningsInfo`
Signature: `ClaimWinningsInfo{betAmount:uint64,userBet:address,outcome:int8}`

## PlaceBetInternal
TLB: `place_bet_internal#d0532bab outcome:int8 = PlaceBetInternal`
Signature: `PlaceBetInternal{outcome:int8}`

## UserBetInfo
TLB: `user_bet_info#f7b3403f outcome:int8 betAmount:uint64 = UserBetInfo`
Signature: `UserBetInfo{outcome:int8,betAmount:uint64}`

## ClaimWinningsInternal
TLB: `claim_winnings_internal#dc560808 resolved:bool winningOutcome:uint8 totalPool:uint64 totalOutcomeBets:uint64 = ClaimWinningsInternal`
Signature: `ClaimWinningsInternal{resolved:bool,winningOutcome:uint8,totalPool:uint64,totalOutcomeBets:uint64}`

# Get Methods
Total Get Methods: 4

## totalPool

## totalBetForOutcome
Argument: outcome

## resolvedOutcome

## isResolved

# Error Codes
2: Stack undeflow
3: Stack overflow
4: Integer overflow
5: Integer out of expected range
6: Invalid opcode
7: Type check error
8: Cell overflow
9: Cell underflow
10: Dictionary error
13: Out of gas error
32: Method ID not found
34: Action is invalid or not supported
37: Not enough TON
38: Not enough extra-currencies
128: Null reference exception
129: Invalid serialization prefix
130: Invalid incoming message
131: Constraints error
132: Access denied
133: Contract stopped
134: Invalid argument
135: Code of a contract was not found
136: Invalid address
137: Masterchain support is not enabled for this contract
9949: Only the owner can claim winnings
10454: Market should be resolved to claim winnings
11074: Outcome names must be provided
16210: Should be only 2 outcomes
17847: Event description has must be provided
20846: Market already resolved
22516: Outcome does not match the bet outcome
24032: Betting has ended
24933: Only owner can resolve market
25427: Only the market can call this function
33245: Only the market can place a bet
38283: Invalid outcome
38368: Event has not ended
39401: Only owner can claim winnings
53624: Bet already placed
55984: End time must be in the future