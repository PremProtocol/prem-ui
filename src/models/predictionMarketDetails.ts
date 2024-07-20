import { Address } from "@ton/core";

export type PredictionMarketDetails = {
  selfAddress: Address;
  owner: Address;
  parent: Address;
  seqno: bigint;
  eventName: string;
  eventDescription: string;
  eventType: string;
  endTime: bigint;
  outcomeName1: string;
  outcomeName2: string;
  numOutcomes: bigint;
  totalOutcome1Bets: bigint;
  totalOutcome2Bets: bigint;
  totalPool: bigint;
  totalLiquidity: bigint,
  reserve1: bigint,
  reserve2: bigint,
  outcome: bigint;
  resolved: boolean;
  protocolFees: bigint;
};

export class PredictionMarketDetailsClonable {
  selfAddress: string;
  owner: string;
  parent: string;
  seqno: number;
  eventDescription: string;
  eventType: string;
  endTime: number;
  outcomeName1: string;
  outcomeName2: string;
  numOutcomes: number;
  totalOutcome1Bets: number;
  totalOutcome2Bets: number;
  totalPool: number;
  totalLiquidity: number;
  reserve1: number;
  reserve2: number;
  outcome: number;
  resolved: boolean;
  protocolFees: number;

  constructor(details: PredictionMarketDetails) {
    this.selfAddress = details.selfAddress.toString();
    this.owner = details.owner.toString();
    this.parent = details.parent.toString();
    this.seqno = Number(details.seqno);
    this.eventDescription = details.eventDescription;
    this.eventType = details.eventType;
    this.endTime = Number(details.endTime);
    this.outcomeName1 = details.outcomeName1;
    this.outcomeName2 = details.outcomeName2;
    this.numOutcomes = Number(details.numOutcomes);
    this.totalOutcome1Bets =  Number(details.totalOutcome1Bets)
    this.totalOutcome2Bets =  Number(details.totalOutcome2Bets)
    this.totalPool = Number(details.totalPool);
    this.totalLiquidity = Number(details.totalLiquidity);
    this.reserve1 = Number(details.reserve1);
    this.reserve2 = Number(details.reserve2);
    this.outcome = Number(details.outcome);
    this.resolved = details.resolved;
    this.protocolFees = Number(details.protocolFees);
  }
}