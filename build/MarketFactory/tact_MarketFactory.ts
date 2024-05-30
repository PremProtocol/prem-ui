import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type CreateMarketResponse = {
    $$type: 'CreateMarketResponse';
    address: Address;
}

export function storeCreateMarketResponse(src: CreateMarketResponse) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4036598661, 32);
        b_0.storeAddress(src.address);
    };
}

export function loadCreateMarketResponse(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4036598661) { throw Error('Invalid prefix'); }
    let _address = sc_0.loadAddress();
    return { $$type: 'CreateMarketResponse' as const, address: _address };
}

function loadTupleCreateMarketResponse(source: TupleReader) {
    let _address = source.readAddress();
    return { $$type: 'CreateMarketResponse' as const, address: _address };
}

function storeTupleCreateMarketResponse(source: CreateMarketResponse) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.address);
    return builder.build();
}

function dictValueParserCreateMarketResponse(): DictionaryValue<CreateMarketResponse> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCreateMarketResponse(src)).endCell());
        },
        parse: (src) => {
            return loadCreateMarketResponse(src.loadRef().beginParse());
        }
    }
}

export type CreateMarket = {
    $$type: 'CreateMarket';
    eventDescription: string;
    endTime: bigint;
    outcomeName1: string;
    outcomeName2: string;
    numOutcomes: bigint;
}

export function storeCreateMarket(src: CreateMarket) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(336041117, 32);
        b_0.storeStringRefTail(src.eventDescription);
        b_0.storeUint(src.endTime, 64);
        b_0.storeStringRefTail(src.outcomeName1);
        b_0.storeStringRefTail(src.outcomeName2);
        b_0.storeUint(src.numOutcomes, 8);
    };
}

export function loadCreateMarket(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 336041117) { throw Error('Invalid prefix'); }
    let _eventDescription = sc_0.loadStringRefTail();
    let _endTime = sc_0.loadUintBig(64);
    let _outcomeName1 = sc_0.loadStringRefTail();
    let _outcomeName2 = sc_0.loadStringRefTail();
    let _numOutcomes = sc_0.loadUintBig(8);
    return { $$type: 'CreateMarket' as const, eventDescription: _eventDescription, endTime: _endTime, outcomeName1: _outcomeName1, outcomeName2: _outcomeName2, numOutcomes: _numOutcomes };
}

function loadTupleCreateMarket(source: TupleReader) {
    let _eventDescription = source.readString();
    let _endTime = source.readBigNumber();
    let _outcomeName1 = source.readString();
    let _outcomeName2 = source.readString();
    let _numOutcomes = source.readBigNumber();
    return { $$type: 'CreateMarket' as const, eventDescription: _eventDescription, endTime: _endTime, outcomeName1: _outcomeName1, outcomeName2: _outcomeName2, numOutcomes: _numOutcomes };
}

function storeTupleCreateMarket(source: CreateMarket) {
    let builder = new TupleBuilder();
    builder.writeString(source.eventDescription);
    builder.writeNumber(source.endTime);
    builder.writeString(source.outcomeName1);
    builder.writeString(source.outcomeName2);
    builder.writeNumber(source.numOutcomes);
    return builder.build();
}

function dictValueParserCreateMarket(): DictionaryValue<CreateMarket> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCreateMarket(src)).endCell());
        },
        parse: (src) => {
            return loadCreateMarket(src.loadRef().beginParse());
        }
    }
}

export type MarketInitialize = {
    $$type: 'MarketInitialize';
    owner: Address;
    eventDescription: string;
    endTime: bigint;
    outcomeName1: string;
    outcomeName2: string;
    numOutcomes: bigint;
}

export function storeMarketInitialize(src: MarketInitialize) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2376986870, 32);
        b_0.storeAddress(src.owner);
        b_0.storeStringRefTail(src.eventDescription);
        b_0.storeUint(src.endTime, 64);
        b_0.storeStringRefTail(src.outcomeName1);
        b_0.storeStringRefTail(src.outcomeName2);
        b_0.storeUint(src.numOutcomes, 8);
    };
}

export function loadMarketInitialize(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2376986870) { throw Error('Invalid prefix'); }
    let _owner = sc_0.loadAddress();
    let _eventDescription = sc_0.loadStringRefTail();
    let _endTime = sc_0.loadUintBig(64);
    let _outcomeName1 = sc_0.loadStringRefTail();
    let _outcomeName2 = sc_0.loadStringRefTail();
    let _numOutcomes = sc_0.loadUintBig(8);
    return { $$type: 'MarketInitialize' as const, owner: _owner, eventDescription: _eventDescription, endTime: _endTime, outcomeName1: _outcomeName1, outcomeName2: _outcomeName2, numOutcomes: _numOutcomes };
}

function loadTupleMarketInitialize(source: TupleReader) {
    let _owner = source.readAddress();
    let _eventDescription = source.readString();
    let _endTime = source.readBigNumber();
    let _outcomeName1 = source.readString();
    let _outcomeName2 = source.readString();
    let _numOutcomes = source.readBigNumber();
    return { $$type: 'MarketInitialize' as const, owner: _owner, eventDescription: _eventDescription, endTime: _endTime, outcomeName1: _outcomeName1, outcomeName2: _outcomeName2, numOutcomes: _numOutcomes };
}

function storeTupleMarketInitialize(source: MarketInitialize) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeString(source.eventDescription);
    builder.writeNumber(source.endTime);
    builder.writeString(source.outcomeName1);
    builder.writeString(source.outcomeName2);
    builder.writeNumber(source.numOutcomes);
    return builder.build();
}

function dictValueParserMarketInitialize(): DictionaryValue<MarketInitialize> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeMarketInitialize(src)).endCell());
        },
        parse: (src) => {
            return loadMarketInitialize(src.loadRef().beginParse());
        }
    }
}

export type PlaceBet = {
    $$type: 'PlaceBet';
    outcome: bigint;
}

export function storePlaceBet(src: PlaceBet) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3093552415, 32);
        b_0.storeInt(src.outcome, 8);
    };
}

export function loadPlaceBet(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3093552415) { throw Error('Invalid prefix'); }
    let _outcome = sc_0.loadIntBig(8);
    return { $$type: 'PlaceBet' as const, outcome: _outcome };
}

function loadTuplePlaceBet(source: TupleReader) {
    let _outcome = source.readBigNumber();
    return { $$type: 'PlaceBet' as const, outcome: _outcome };
}

function storeTuplePlaceBet(source: PlaceBet) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.outcome);
    return builder.build();
}

function dictValueParserPlaceBet(): DictionaryValue<PlaceBet> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storePlaceBet(src)).endCell());
        },
        parse: (src) => {
            return loadPlaceBet(src.loadRef().beginParse());
        }
    }
}

export type ResolveMarket = {
    $$type: 'ResolveMarket';
    outcome: bigint;
}

export function storeResolveMarket(src: ResolveMarket) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1189540808, 32);
        b_0.storeInt(src.outcome, 8);
    };
}

export function loadResolveMarket(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1189540808) { throw Error('Invalid prefix'); }
    let _outcome = sc_0.loadIntBig(8);
    return { $$type: 'ResolveMarket' as const, outcome: _outcome };
}

function loadTupleResolveMarket(source: TupleReader) {
    let _outcome = source.readBigNumber();
    return { $$type: 'ResolveMarket' as const, outcome: _outcome };
}

function storeTupleResolveMarket(source: ResolveMarket) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.outcome);
    return builder.build();
}

function dictValueParserResolveMarket(): DictionaryValue<ResolveMarket> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeResolveMarket(src)).endCell());
        },
        parse: (src) => {
            return loadResolveMarket(src.loadRef().beginParse());
        }
    }
}

export type ClaimWinningsInfo = {
    $$type: 'ClaimWinningsInfo';
    betAmount: bigint;
    userBet: Address;
    outcome: bigint;
}

export function storeClaimWinningsInfo(src: ClaimWinningsInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1086734434, 32);
        b_0.storeUint(src.betAmount, 64);
        b_0.storeAddress(src.userBet);
        b_0.storeInt(src.outcome, 8);
    };
}

export function loadClaimWinningsInfo(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1086734434) { throw Error('Invalid prefix'); }
    let _betAmount = sc_0.loadUintBig(64);
    let _userBet = sc_0.loadAddress();
    let _outcome = sc_0.loadIntBig(8);
    return { $$type: 'ClaimWinningsInfo' as const, betAmount: _betAmount, userBet: _userBet, outcome: _outcome };
}

function loadTupleClaimWinningsInfo(source: TupleReader) {
    let _betAmount = source.readBigNumber();
    let _userBet = source.readAddress();
    let _outcome = source.readBigNumber();
    return { $$type: 'ClaimWinningsInfo' as const, betAmount: _betAmount, userBet: _userBet, outcome: _outcome };
}

function storeTupleClaimWinningsInfo(source: ClaimWinningsInfo) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.betAmount);
    builder.writeAddress(source.userBet);
    builder.writeNumber(source.outcome);
    return builder.build();
}

function dictValueParserClaimWinningsInfo(): DictionaryValue<ClaimWinningsInfo> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeClaimWinningsInfo(src)).endCell());
        },
        parse: (src) => {
            return loadClaimWinningsInfo(src.loadRef().beginParse());
        }
    }
}

export type PredictionMarketDetails = {
    $$type: 'PredictionMarketDetails';
    owner: Address;
    eventDescription: string;
    endTime: bigint;
    outcomeName1: string;
    outcomeName2: string;
    numOutcomes: bigint;
    totalOutcomeBets: Dictionary<number, bigint>;
    totalPool: bigint;
    outcome: bigint;
    resolved: boolean;
}

export function storePredictionMarketDetails(src: PredictionMarketDetails) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2182018728, 32);
        b_0.storeAddress(src.owner);
        b_0.storeStringRefTail(src.eventDescription);
        b_0.storeUint(src.endTime, 64);
        b_0.storeStringRefTail(src.outcomeName1);
        b_0.storeStringRefTail(src.outcomeName2);
        b_0.storeUint(src.numOutcomes, 8);
        let b_1 = new Builder();
        b_1.storeDict(src.totalOutcomeBets, Dictionary.Keys.Uint(8), Dictionary.Values.BigUint(64));
        b_1.storeUint(src.totalPool, 64);
        b_1.storeInt(src.outcome, 8);
        b_1.storeBit(src.resolved);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPredictionMarketDetails(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2182018728) { throw Error('Invalid prefix'); }
    let _owner = sc_0.loadAddress();
    let _eventDescription = sc_0.loadStringRefTail();
    let _endTime = sc_0.loadUintBig(64);
    let _outcomeName1 = sc_0.loadStringRefTail();
    let _outcomeName2 = sc_0.loadStringRefTail();
    let _numOutcomes = sc_0.loadUintBig(8);
    let sc_1 = sc_0.loadRef().beginParse();
    let _totalOutcomeBets = Dictionary.load(Dictionary.Keys.Uint(8), Dictionary.Values.BigUint(64), sc_1);
    let _totalPool = sc_1.loadUintBig(64);
    let _outcome = sc_1.loadIntBig(8);
    let _resolved = sc_1.loadBit();
    return { $$type: 'PredictionMarketDetails' as const, owner: _owner, eventDescription: _eventDescription, endTime: _endTime, outcomeName1: _outcomeName1, outcomeName2: _outcomeName2, numOutcomes: _numOutcomes, totalOutcomeBets: _totalOutcomeBets, totalPool: _totalPool, outcome: _outcome, resolved: _resolved };
}

function loadTuplePredictionMarketDetails(source: TupleReader) {
    let _owner = source.readAddress();
    let _eventDescription = source.readString();
    let _endTime = source.readBigNumber();
    let _outcomeName1 = source.readString();
    let _outcomeName2 = source.readString();
    let _numOutcomes = source.readBigNumber();
    let _totalOutcomeBets = Dictionary.loadDirect(Dictionary.Keys.Uint(8), Dictionary.Values.BigUint(64), source.readCellOpt());
    let _totalPool = source.readBigNumber();
    let _outcome = source.readBigNumber();
    let _resolved = source.readBoolean();
    return { $$type: 'PredictionMarketDetails' as const, owner: _owner, eventDescription: _eventDescription, endTime: _endTime, outcomeName1: _outcomeName1, outcomeName2: _outcomeName2, numOutcomes: _numOutcomes, totalOutcomeBets: _totalOutcomeBets, totalPool: _totalPool, outcome: _outcome, resolved: _resolved };
}

function storeTuplePredictionMarketDetails(source: PredictionMarketDetails) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeString(source.eventDescription);
    builder.writeNumber(source.endTime);
    builder.writeString(source.outcomeName1);
    builder.writeString(source.outcomeName2);
    builder.writeNumber(source.numOutcomes);
    builder.writeCell(source.totalOutcomeBets.size > 0 ? beginCell().storeDictDirect(source.totalOutcomeBets, Dictionary.Keys.Uint(8), Dictionary.Values.BigUint(64)).endCell() : null);
    builder.writeNumber(source.totalPool);
    builder.writeNumber(source.outcome);
    builder.writeBoolean(source.resolved);
    return builder.build();
}

function dictValueParserPredictionMarketDetails(): DictionaryValue<PredictionMarketDetails> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storePredictionMarketDetails(src)).endCell());
        },
        parse: (src) => {
            return loadPredictionMarketDetails(src.loadRef().beginParse());
        }
    }
}

export type PlaceBetInternal = {
    $$type: 'PlaceBetInternal';
    outcome: bigint;
    betAmount: bigint;
}

export function storePlaceBetInternal(src: PlaceBetInternal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4125778717, 32);
        b_0.storeInt(src.outcome, 8);
        b_0.storeUint(src.betAmount, 64);
    };
}

export function loadPlaceBetInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4125778717) { throw Error('Invalid prefix'); }
    let _outcome = sc_0.loadIntBig(8);
    let _betAmount = sc_0.loadUintBig(64);
    return { $$type: 'PlaceBetInternal' as const, outcome: _outcome, betAmount: _betAmount };
}

function loadTuplePlaceBetInternal(source: TupleReader) {
    let _outcome = source.readBigNumber();
    let _betAmount = source.readBigNumber();
    return { $$type: 'PlaceBetInternal' as const, outcome: _outcome, betAmount: _betAmount };
}

function storeTuplePlaceBetInternal(source: PlaceBetInternal) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.outcome);
    builder.writeNumber(source.betAmount);
    return builder.build();
}

function dictValueParserPlaceBetInternal(): DictionaryValue<PlaceBetInternal> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storePlaceBetInternal(src)).endCell());
        },
        parse: (src) => {
            return loadPlaceBetInternal(src.loadRef().beginParse());
        }
    }
}

export type UserBetInfo = {
    $$type: 'UserBetInfo';
    outcome: bigint;
    betAmount: bigint;
}

export function storeUserBetInfo(src: UserBetInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4155719743, 32);
        b_0.storeInt(src.outcome, 8);
        b_0.storeUint(src.betAmount, 64);
    };
}

export function loadUserBetInfo(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4155719743) { throw Error('Invalid prefix'); }
    let _outcome = sc_0.loadIntBig(8);
    let _betAmount = sc_0.loadUintBig(64);
    return { $$type: 'UserBetInfo' as const, outcome: _outcome, betAmount: _betAmount };
}

function loadTupleUserBetInfo(source: TupleReader) {
    let _outcome = source.readBigNumber();
    let _betAmount = source.readBigNumber();
    return { $$type: 'UserBetInfo' as const, outcome: _outcome, betAmount: _betAmount };
}

function storeTupleUserBetInfo(source: UserBetInfo) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.outcome);
    builder.writeNumber(source.betAmount);
    return builder.build();
}

function dictValueParserUserBetInfo(): DictionaryValue<UserBetInfo> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUserBetInfo(src)).endCell());
        },
        parse: (src) => {
            return loadUserBetInfo(src.loadRef().beginParse());
        }
    }
}

export type ClaimWinningsInternal = {
    $$type: 'ClaimWinningsInternal';
    resolved: boolean;
    winningOutcome: bigint;
    totalPool: bigint;
    totalOutcomeBets: bigint;
}

export function storeClaimWinningsInternal(src: ClaimWinningsInternal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3696625672, 32);
        b_0.storeBit(src.resolved);
        b_0.storeUint(src.winningOutcome, 8);
        b_0.storeUint(src.totalPool, 64);
        b_0.storeUint(src.totalOutcomeBets, 64);
    };
}

export function loadClaimWinningsInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3696625672) { throw Error('Invalid prefix'); }
    let _resolved = sc_0.loadBit();
    let _winningOutcome = sc_0.loadUintBig(8);
    let _totalPool = sc_0.loadUintBig(64);
    let _totalOutcomeBets = sc_0.loadUintBig(64);
    return { $$type: 'ClaimWinningsInternal' as const, resolved: _resolved, winningOutcome: _winningOutcome, totalPool: _totalPool, totalOutcomeBets: _totalOutcomeBets };
}

function loadTupleClaimWinningsInternal(source: TupleReader) {
    let _resolved = source.readBoolean();
    let _winningOutcome = source.readBigNumber();
    let _totalPool = source.readBigNumber();
    let _totalOutcomeBets = source.readBigNumber();
    return { $$type: 'ClaimWinningsInternal' as const, resolved: _resolved, winningOutcome: _winningOutcome, totalPool: _totalPool, totalOutcomeBets: _totalOutcomeBets };
}

function storeTupleClaimWinningsInternal(source: ClaimWinningsInternal) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.resolved);
    builder.writeNumber(source.winningOutcome);
    builder.writeNumber(source.totalPool);
    builder.writeNumber(source.totalOutcomeBets);
    return builder.build();
}

function dictValueParserClaimWinningsInternal(): DictionaryValue<ClaimWinningsInternal> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeClaimWinningsInternal(src)).endCell());
        },
        parse: (src) => {
            return loadClaimWinningsInternal(src.loadRef().beginParse());
        }
    }
}

 type MarketFactory_init_args = {
    $$type: 'MarketFactory_init_args';
}

function initMarketFactory_init_args(src: MarketFactory_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
    };
}

async function MarketFactory_init() {
    const __code = Cell.fromBase64('te6ccgECHgEABXgAART/APSkE/S88sgLAQIBYgIDAtTQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxa2zzy4ILI+EMBzH8BygBZWSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFss/ye1UFwQCASAODwP2AZIwf+BwIddJwh+VMCDXCx/eIIIQFAeUnbqOpTDTHwGCEBQHlJ268uCB1AHQAdM/1AHQAdQB0AHTB1VAbBXbPH/gIIIQlGqYtrqOqDDTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J+EIBcG3bPH/gghCBnb6ZBQsGA5aCANqwJPgjvPL0gStCiwgkAfkBAfkBvfL0gStCiwgjAfkBAfkBvfL0gT9SIcAC8vSBRbeLCCYB+QEB+QG98vRQZds8+EP4KCLbPFwKFgcC6LqPbtMfAYIQgZ2+mbry4IHTP/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBJa2zwxUSHIWYIQMnsrSlADyx/LPwEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJEvhCAX9t2zx/4DBwCgsC9nBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIA6T4QW8kE18D+CdvEIIJMS0AuZ4w+EFvJBNfA4IJMS0Aod5y+EIFEEoQOUjLyFVQ2zzJFRA0EDcQJggJAIqCEI2t8PZQB8sfUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbIUATPFslQA8zLP8hYzxbJAczIWM8WyQHMywcBEn8GBQRBM9s8AQwAEvhCUiDHBfLghAE6bW0ibrOZWyBu8tCAbyIBkTLiECRwAwSAQlAj2zwMAcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7AA0AmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwCASAQEQIBIBobAgN7oBITAhG4Ud2zzbPGwhgXGAIPp+u2ebZ42EMXFAIRpmO2eLG2eNhDFxUAAiABkPhD+ChY2zxwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBYA0gLQ9AQwbSGBYJUBgBD0D2+h8uCHAYFglSICgBD0FwKBNNsBgBD0D2+h8uCHEoE02wECgBD0F8gByPQAyQHMcAHKAEADWSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFoEBAc8AyQGA7UTQ1AH4Y9IAAY4l+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHTP1lsEuAw+CjXCwqDCbry4InbPBkAAiEABvhCcADdu70YJwXOw9XSyuex6E7DnWSoUbZoJwndY1LStkfLMi068t/fFiOYJwIFXAG4BnY5TOWDquRyWyw4JwnZdOWrNOy3M6DpZtlGbopIJw8ud/q+aF6CzkWq0KuwWxSoJwQM51aecV+dJQsB1hbiZHsoAgFIHB0AEbCvu1E0NIAAYAB1sm7jQ1aXBmczovL1FtYldNN3NNUjdCVXU0YjFONXNEUXNOOURMWXA0WGN0MjRYZFRnV29BaFM2ODGCA=');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initMarketFactory_init_args({ $$type: 'MarketFactory_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const MarketFactory_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    8274: { message: `Winnings already claimed` },
    9949: { message: `Only the owner can claim winnings` },
    10454: { message: `Market should be resolved to claim winnings` },
    11074: { message: `Outcome names must be provided` },
    16210: { message: `Should be only 2 outcomes` },
    17847: { message: `Event description has must be provided` },
    20846: { message: `Market already resolved` },
    22516: { message: `Outcome does not match the bet outcome` },
    24032: { message: `Betting has ended` },
    24122: { message: `Only parent contract can init the market` },
    24933: { message: `Only owner can resolve market` },
    25427: { message: `Only the market can call this function` },
    38283: { message: `Invalid outcome` },
    38368: { message: `Event has not ended` },
    39401: { message: `Only owner can claim winnings` },
    53624: { message: `Bet already placed` },
    55984: { message: `End time must be in the future` },
}

const MarketFactory_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"CreateMarketResponse","header":4036598661,"fields":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"CreateMarket","header":336041117,"fields":[{"name":"eventDescription","type":{"kind":"simple","type":"string","optional":false}},{"name":"endTime","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"outcomeName1","type":{"kind":"simple","type":"string","optional":false}},{"name":"outcomeName2","type":{"kind":"simple","type":"string","optional":false}},{"name":"numOutcomes","type":{"kind":"simple","type":"uint","optional":false,"format":8}}]},
    {"name":"MarketInitialize","header":2376986870,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"eventDescription","type":{"kind":"simple","type":"string","optional":false}},{"name":"endTime","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"outcomeName1","type":{"kind":"simple","type":"string","optional":false}},{"name":"outcomeName2","type":{"kind":"simple","type":"string","optional":false}},{"name":"numOutcomes","type":{"kind":"simple","type":"uint","optional":false,"format":8}}]},
    {"name":"PlaceBet","header":3093552415,"fields":[{"name":"outcome","type":{"kind":"simple","type":"int","optional":false,"format":8}}]},
    {"name":"ResolveMarket","header":1189540808,"fields":[{"name":"outcome","type":{"kind":"simple","type":"int","optional":false,"format":8}}]},
    {"name":"ClaimWinningsInfo","header":1086734434,"fields":[{"name":"betAmount","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"userBet","type":{"kind":"simple","type":"address","optional":false}},{"name":"outcome","type":{"kind":"simple","type":"int","optional":false,"format":8}}]},
    {"name":"PredictionMarketDetails","header":2182018728,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"eventDescription","type":{"kind":"simple","type":"string","optional":false}},{"name":"endTime","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"outcomeName1","type":{"kind":"simple","type":"string","optional":false}},{"name":"outcomeName2","type":{"kind":"simple","type":"string","optional":false}},{"name":"numOutcomes","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"totalOutcomeBets","type":{"kind":"dict","key":"uint","keyFormat":8,"value":"uint","valueFormat":64}},{"name":"totalPool","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"outcome","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"resolved","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"PlaceBetInternal","header":4125778717,"fields":[{"name":"outcome","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"betAmount","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"UserBetInfo","header":4155719743,"fields":[{"name":"outcome","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"betAmount","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ClaimWinningsInternal","header":3696625672,"fields":[{"name":"resolved","type":{"kind":"simple","type":"bool","optional":false}},{"name":"winningOutcome","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"totalPool","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"totalOutcomeBets","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
]

const MarketFactory_getters: ABIGetter[] = [
    {"name":"childAddress","arguments":[{"name":"seqno","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"predictionMarketCount","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const MarketFactory_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"CreateMarket"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ChangeOwner"}},
]

export class MarketFactory implements Contract {
    
    static async init() {
        return await MarketFactory_init();
    }
    
    static async fromInit() {
        const init = await MarketFactory_init();
        const address = contractAddress(0, init);
        return new MarketFactory(address, init);
    }
    
    static fromAddress(address: Address) {
        return new MarketFactory(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  MarketFactory_types,
        getters: MarketFactory_getters,
        receivers: MarketFactory_receivers,
        errors: MarketFactory_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: CreateMarket | Deploy | ChangeOwner) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CreateMarket') {
            body = beginCell().store(storeCreateMarket(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeOwner') {
            body = beginCell().store(storeChangeOwner(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getChildAddress(provider: ContractProvider, seqno: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(seqno);
        let source = (await provider.get('childAddress', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getPredictionMarketCount(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('predictionMarketCount', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}