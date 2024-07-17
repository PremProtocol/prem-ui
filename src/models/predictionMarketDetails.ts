import { Address } from "@ton/core";

export type PredictionMarketDetails = {
  selfAddress: Address;
  owner: Address;
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
  outcome: bigint;
  resolved: boolean;
};

export class PredictionMarketDetailsClonable {
  selfAddress: string;
  owner: string;
  eventDescription: string;
  eventType: string;
  endTime: number;
  outcomeName1: string;
  outcomeName2: string;
  numOutcomes: number;
  totalOutcome1Bets: number;
  totalOutcome2Bets: number;
  totalPool: number;
  outcome: number;
  resolved: boolean;

  constructor(details: PredictionMarketDetails) {
    this.selfAddress = details.selfAddress.toString();
    this.owner = details.owner.toString();
    this.eventDescription = details.eventDescription;
    this.eventType = details.eventType;
    this.endTime = Number(details.endTime);
    this.outcomeName1 = details.outcomeName1;
    this.outcomeName2 = details.outcomeName2;
    this.numOutcomes = Number(details.numOutcomes);
    this.totalOutcome1Bets =  Number(details.totalOutcome1Bets)
    this.totalOutcome2Bets =  Number(details.totalOutcome2Bets)
    this.totalPool = Number(details.totalPool);
    this.outcome = Number(details.outcome);
    this.resolved = details.resolved;
  }
}