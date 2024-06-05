import { Address, Dictionary } from "@ton/core";

export type PredictionMarketDetails = {
  selfAddress: Address;
  owner: Address;
  eventDescription: string;
  eventType: string;
  endTime: bigint;
  outcomeName1: string;
  outcomeName2: string;
  numOutcomes: bigint;
  totalOutcomeBets: Dictionary<number, bigint>;
  totalPool: bigint;
  outcome: bigint;
  resolved: boolean;
};