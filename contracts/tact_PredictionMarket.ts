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
    eventName: string;
    eventDescription: string;
    eventType: string;
    endTime: bigint;
    outcomeName1: string;
    outcomeName2: string;
}

export function storeCreateMarket(src: CreateMarket) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1393681475, 32);
        b_0.storeStringRefTail(src.eventName);
        b_0.storeStringRefTail(src.eventDescription);
        b_0.storeStringRefTail(src.eventType);
        b_0.storeUint(src.endTime, 64);
        let b_1 = new Builder();
        b_1.storeStringRefTail(src.outcomeName1);
        b_1.storeStringRefTail(src.outcomeName2);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadCreateMarket(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1393681475) { throw Error('Invalid prefix'); }
    let _eventName = sc_0.loadStringRefTail();
    let _eventDescription = sc_0.loadStringRefTail();
    let _eventType = sc_0.loadStringRefTail();
    let _endTime = sc_0.loadUintBig(64);
    let sc_1 = sc_0.loadRef().beginParse();
    let _outcomeName1 = sc_1.loadStringRefTail();
    let _outcomeName2 = sc_1.loadStringRefTail();
    return { $$type: 'CreateMarket' as const, eventName: _eventName, eventDescription: _eventDescription, eventType: _eventType, endTime: _endTime, outcomeName1: _outcomeName1, outcomeName2: _outcomeName2 };
}

function loadTupleCreateMarket(source: TupleReader) {
    let _eventName = source.readString();
    let _eventDescription = source.readString();
    let _eventType = source.readString();
    let _endTime = source.readBigNumber();
    let _outcomeName1 = source.readString();
    let _outcomeName2 = source.readString();
    return { $$type: 'CreateMarket' as const, eventName: _eventName, eventDescription: _eventDescription, eventType: _eventType, endTime: _endTime, outcomeName1: _outcomeName1, outcomeName2: _outcomeName2 };
}

function storeTupleCreateMarket(source: CreateMarket) {
    let builder = new TupleBuilder();
    builder.writeString(source.eventName);
    builder.writeString(source.eventDescription);
    builder.writeString(source.eventType);
    builder.writeNumber(source.endTime);
    builder.writeString(source.outcomeName1);
    builder.writeString(source.outcomeName2);
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
    eventName: string;
    eventDescription: string;
    eventType: string;
    endTime: bigint;
    outcomeName1: string;
    outcomeName2: string;
}

export function storeMarketInitialize(src: MarketInitialize) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2175637175, 32);
        b_0.storeAddress(src.owner);
        b_0.storeStringRefTail(src.eventName);
        b_0.storeStringRefTail(src.eventDescription);
        b_0.storeStringRefTail(src.eventType);
        b_0.storeUint(src.endTime, 64);
        let b_1 = new Builder();
        b_1.storeStringRefTail(src.outcomeName1);
        b_1.storeStringRefTail(src.outcomeName2);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadMarketInitialize(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2175637175) { throw Error('Invalid prefix'); }
    let _owner = sc_0.loadAddress();
    let _eventName = sc_0.loadStringRefTail();
    let _eventDescription = sc_0.loadStringRefTail();
    let _eventType = sc_0.loadStringRefTail();
    let _endTime = sc_0.loadUintBig(64);
    let sc_1 = sc_0.loadRef().beginParse();
    let _outcomeName1 = sc_1.loadStringRefTail();
    let _outcomeName2 = sc_1.loadStringRefTail();
    return { $$type: 'MarketInitialize' as const, owner: _owner, eventName: _eventName, eventDescription: _eventDescription, eventType: _eventType, endTime: _endTime, outcomeName1: _outcomeName1, outcomeName2: _outcomeName2 };
}

function loadTupleMarketInitialize(source: TupleReader) {
    let _owner = source.readAddress();
    let _eventName = source.readString();
    let _eventDescription = source.readString();
    let _eventType = source.readString();
    let _endTime = source.readBigNumber();
    let _outcomeName1 = source.readString();
    let _outcomeName2 = source.readString();
    return { $$type: 'MarketInitialize' as const, owner: _owner, eventName: _eventName, eventDescription: _eventDescription, eventType: _eventType, endTime: _endTime, outcomeName1: _outcomeName1, outcomeName2: _outcomeName2 };
}

function storeTupleMarketInitialize(source: MarketInitialize) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeString(source.eventName);
    builder.writeString(source.eventDescription);
    builder.writeString(source.eventType);
    builder.writeNumber(source.endTime);
    builder.writeString(source.outcomeName1);
    builder.writeString(source.outcomeName2);
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

export type AddLiquidity = {
    $$type: 'AddLiquidity';
    amount: bigint;
    oddsForOutcome1: bigint;
}

export function storeAddLiquidity(src: AddLiquidity) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1027787397, 32);
        b_0.storeCoins(src.amount);
        b_0.storeUint(src.oddsForOutcome1, 8);
    };
}

export function loadAddLiquidity(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1027787397) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    let _oddsForOutcome1 = sc_0.loadUintBig(8);
    return { $$type: 'AddLiquidity' as const, amount: _amount, oddsForOutcome1: _oddsForOutcome1 };
}

function loadTupleAddLiquidity(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _oddsForOutcome1 = source.readBigNumber();
    return { $$type: 'AddLiquidity' as const, amount: _amount, oddsForOutcome1: _oddsForOutcome1 };
}

function storeTupleAddLiquidity(source: AddLiquidity) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeNumber(source.oddsForOutcome1);
    return builder.build();
}

function dictValueParserAddLiquidity(): DictionaryValue<AddLiquidity> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeAddLiquidity(src)).endCell());
        },
        parse: (src) => {
            return loadAddLiquidity(src.loadRef().beginParse());
        }
    }
}

export type RemoveLiquidity = {
    $$type: 'RemoveLiquidity';
    amount: bigint;
}

export function storeRemoveLiquidity(src: RemoveLiquidity) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(258093095, 32);
        b_0.storeCoins(src.amount);
    };
}

export function loadRemoveLiquidity(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 258093095) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    return { $$type: 'RemoveLiquidity' as const, amount: _amount };
}

function loadTupleRemoveLiquidity(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'RemoveLiquidity' as const, amount: _amount };
}

function storeTupleRemoveLiquidity(source: RemoveLiquidity) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserRemoveLiquidity(): DictionaryValue<RemoveLiquidity> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeRemoveLiquidity(src)).endCell());
        },
        parse: (src) => {
            return loadRemoveLiquidity(src.loadRef().beginParse());
        }
    }
}

export type PlaceBet = {
    $$type: 'PlaceBet';
    amount: bigint;
    outcome: bigint;
}

export function storePlaceBet(src: PlaceBet) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2255585262, 32);
        b_0.storeCoins(src.amount);
        b_0.storeInt(src.outcome, 8);
    };
}

export function loadPlaceBet(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2255585262) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    let _outcome = sc_0.loadIntBig(8);
    return { $$type: 'PlaceBet' as const, amount: _amount, outcome: _outcome };
}

function loadTuplePlaceBet(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _outcome = source.readBigNumber();
    return { $$type: 'PlaceBet' as const, amount: _amount, outcome: _outcome };
}

function storeTuplePlaceBet(source: PlaceBet) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
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
    walletAddress: Address;
    outcome: bigint;
}

export function storeClaimWinningsInfo(src: ClaimWinningsInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4043895049, 32);
        b_0.storeCoins(src.betAmount);
        b_0.storeAddress(src.walletAddress);
        b_0.storeInt(src.outcome, 8);
    };
}

export function loadClaimWinningsInfo(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4043895049) { throw Error('Invalid prefix'); }
    let _betAmount = sc_0.loadCoins();
    let _walletAddress = sc_0.loadAddress();
    let _outcome = sc_0.loadIntBig(8);
    return { $$type: 'ClaimWinningsInfo' as const, betAmount: _betAmount, walletAddress: _walletAddress, outcome: _outcome };
}

function loadTupleClaimWinningsInfo(source: TupleReader) {
    let _betAmount = source.readBigNumber();
    let _walletAddress = source.readAddress();
    let _outcome = source.readBigNumber();
    return { $$type: 'ClaimWinningsInfo' as const, betAmount: _betAmount, walletAddress: _walletAddress, outcome: _outcome };
}

function storeTupleClaimWinningsInfo(source: ClaimWinningsInfo) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.betAmount);
    builder.writeAddress(source.walletAddress);
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
    eventName: string;
    eventDescription: string;
    eventType: string;
    endTime: bigint;
    outcomeName1: string;
    outcomeName2: string;
    totalOutcome1Bets: bigint;
    totalOutcome2Bets: bigint;
    totalPool: bigint;
    totalLiquidity: bigint;
    reserve1: bigint;
    reserve2: bigint;
    oddsForOutcome1: bigint;
    protocolFeePercentage: bigint;
    outcome: bigint;
    resolved: boolean;
    protocolFees: bigint;
}

export function storePredictionMarketDetails(src: PredictionMarketDetails) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4424983, 32);
        b_0.storeAddress(src.owner);
        b_0.storeStringRefTail(src.eventName);
        b_0.storeStringRefTail(src.eventDescription);
        b_0.storeStringRefTail(src.eventType);
        b_0.storeUint(src.endTime, 64);
        let b_1 = new Builder();
        b_1.storeStringRefTail(src.outcomeName1);
        b_1.storeStringRefTail(src.outcomeName2);
        b_1.storeCoins(src.totalOutcome1Bets);
        b_1.storeCoins(src.totalOutcome2Bets);
        b_1.storeCoins(src.totalPool);
        b_1.storeCoins(src.totalLiquidity);
        b_1.storeCoins(src.reserve1);
        b_1.storeCoins(src.reserve2);
        b_1.storeUint(src.oddsForOutcome1, 8);
        b_1.storeUint(src.protocolFeePercentage, 8);
        b_1.storeInt(src.outcome, 8);
        b_1.storeBit(src.resolved);
        b_1.storeCoins(src.protocolFees);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPredictionMarketDetails(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4424983) { throw Error('Invalid prefix'); }
    let _owner = sc_0.loadAddress();
    let _eventName = sc_0.loadStringRefTail();
    let _eventDescription = sc_0.loadStringRefTail();
    let _eventType = sc_0.loadStringRefTail();
    let _endTime = sc_0.loadUintBig(64);
    let sc_1 = sc_0.loadRef().beginParse();
    let _outcomeName1 = sc_1.loadStringRefTail();
    let _outcomeName2 = sc_1.loadStringRefTail();
    let _totalOutcome1Bets = sc_1.loadCoins();
    let _totalOutcome2Bets = sc_1.loadCoins();
    let _totalPool = sc_1.loadCoins();
    let _totalLiquidity = sc_1.loadCoins();
    let _reserve1 = sc_1.loadCoins();
    let _reserve2 = sc_1.loadCoins();
    let _oddsForOutcome1 = sc_1.loadUintBig(8);
    let _protocolFeePercentage = sc_1.loadUintBig(8);
    let _outcome = sc_1.loadIntBig(8);
    let _resolved = sc_1.loadBit();
    let _protocolFees = sc_1.loadCoins();
    return { $$type: 'PredictionMarketDetails' as const, owner: _owner, eventName: _eventName, eventDescription: _eventDescription, eventType: _eventType, endTime: _endTime, outcomeName1: _outcomeName1, outcomeName2: _outcomeName2, totalOutcome1Bets: _totalOutcome1Bets, totalOutcome2Bets: _totalOutcome2Bets, totalPool: _totalPool, totalLiquidity: _totalLiquidity, reserve1: _reserve1, reserve2: _reserve2, oddsForOutcome1: _oddsForOutcome1, protocolFeePercentage: _protocolFeePercentage, outcome: _outcome, resolved: _resolved, protocolFees: _protocolFees };
}

function loadTuplePredictionMarketDetails(source: TupleReader) {
    let _owner = source.readAddress();
    let _eventName = source.readString();
    let _eventDescription = source.readString();
    let _eventType = source.readString();
    let _endTime = source.readBigNumber();
    let _outcomeName1 = source.readString();
    let _outcomeName2 = source.readString();
    let _totalOutcome1Bets = source.readBigNumber();
    let _totalOutcome2Bets = source.readBigNumber();
    let _totalPool = source.readBigNumber();
    let _totalLiquidity = source.readBigNumber();
    let _reserve1 = source.readBigNumber();
    let _reserve2 = source.readBigNumber();
    let _oddsForOutcome1 = source.readBigNumber();
    let _protocolFeePercentage = source.readBigNumber();
    let _outcome = source.readBigNumber();
    let _resolved = source.readBoolean();
    let _protocolFees = source.readBigNumber();
    return { $$type: 'PredictionMarketDetails' as const, owner: _owner, eventName: _eventName, eventDescription: _eventDescription, eventType: _eventType, endTime: _endTime, outcomeName1: _outcomeName1, outcomeName2: _outcomeName2, totalOutcome1Bets: _totalOutcome1Bets, totalOutcome2Bets: _totalOutcome2Bets, totalPool: _totalPool, totalLiquidity: _totalLiquidity, reserve1: _reserve1, reserve2: _reserve2, oddsForOutcome1: _oddsForOutcome1, protocolFeePercentage: _protocolFeePercentage, outcome: _outcome, resolved: _resolved, protocolFees: _protocolFees };
}

function storeTuplePredictionMarketDetails(source: PredictionMarketDetails) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeString(source.eventName);
    builder.writeString(source.eventDescription);
    builder.writeString(source.eventType);
    builder.writeNumber(source.endTime);
    builder.writeString(source.outcomeName1);
    builder.writeString(source.outcomeName2);
    builder.writeNumber(source.totalOutcome1Bets);
    builder.writeNumber(source.totalOutcome2Bets);
    builder.writeNumber(source.totalPool);
    builder.writeNumber(source.totalLiquidity);
    builder.writeNumber(source.reserve1);
    builder.writeNumber(source.reserve2);
    builder.writeNumber(source.oddsForOutcome1);
    builder.writeNumber(source.protocolFeePercentage);
    builder.writeNumber(source.outcome);
    builder.writeBoolean(source.resolved);
    builder.writeNumber(source.protocolFees);
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
        b_0.storeUint(3532229292, 32);
        b_0.storeInt(src.outcome, 8);
        b_0.storeCoins(src.betAmount);
    };
}

export function loadPlaceBetInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3532229292) { throw Error('Invalid prefix'); }
    let _outcome = sc_0.loadIntBig(8);
    let _betAmount = sc_0.loadCoins();
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
        b_0.storeUint(2079623544, 32);
        b_0.storeInt(src.outcome, 8);
        b_0.storeCoins(src.betAmount);
    };
}

export function loadUserBetInfo(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2079623544) { throw Error('Invalid prefix'); }
    let _outcome = sc_0.loadIntBig(8);
    let _betAmount = sc_0.loadCoins();
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

 type PredictionMarket_init_args = {
    $$type: 'PredictionMarket_init_args';
    parent: Address;
    seqno: bigint;
}

function initPredictionMarket_init_args(src: PredictionMarket_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.parent);
        b_0.storeInt(src.seqno, 257);
    };
}

async function PredictionMarket_init(parent: Address, seqno: bigint) {
    const __code = Cell.fromBase64('te6ccgECNQEACvsAART/APSkE/S88sgLAQIBYgIDA+7QAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zwRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDlUd2zzy4ILI+EMBzH8BygARFBETERIREREQVeDbPMntVDAEBQIBIB4fBOLtou37AZaAINchMH/gcCHXScIflTAg1wsf3iCCEIGtlre6j8Qw2zxsF1cQVxBXElcSVxJXElcUgV46+EJWFAHHBfL0ggDasC74I7zy9PhBbyQTXwOCCTEtAKFyiFYWVSB/VTBtbds8f+AgghA9QsqFugYSGwcB9gERFAEREyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgERESDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFh/LP8hQDs8WyVANzMhQDM8WyVALzMjIUAvPFslQCswYyz8WygAUygfIUAPPFslYzMhYzxbJAR0AntMfAYIQga2Wt7ry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdQB0AHUAdAB1AHQAdM/1AHQ1AHQAdQw0BAnECYQJRAkECMExo6YMNMfAYIQPULKhbry4IH6ANMHWWwS2zx/4CCCEA9iMCe6jpUw0x8BghAPYjAnuvLggfoAATHbPH/gIIIQhnF/7rqOlTDTHwGCEIZxf+668uCB+gDSB1lsEuAgghBG5vPIuggJCgsB8IIAjzUiwgCOEPhBbyQTXwOCCTEtAKBSMLmRcOLy9IFLE/hCVhcBxwXy9BEUERURFBETERURExESERUREhERERUREREQERUREA8RFQ8OERUODREVDQwRFQwLERULChEVCgkRFQkIERUIBxEVBwYRFQYFERUFBBEVBAwE9IIA7s8hwgDy9IFLE/hCVhYBxwXy9BETERQRExESERQREhERERQREREQERQREA8RFA8OERQODREUDQwRFAwLERQLChEUCgkRFAkRFAgHBlVAVhTbPIBCiFYVAxEXWX9VMG1t2zwREhETERIRERESEREREBERERAPERAPDhIbDwHYggCPNSLCAI4Q+EFvJBNfA4IJMS0AoFIwuZFw4vL0gV3g+CNWEbny9IIAlYshwv+TIcECkXDi8vRT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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initPredictionMarket_init_args({ $$type: 'PredictionMarket_init_args', parent, seqno })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const PredictionMarket_errors: { [key: number]: { message: string } } = {
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
    17847: { message: `Event description has must be provided` },
    19219: { message: `Only owner contract can provire liquidity for the market` },
    20846: { message: `Market already resolved` },
    22516: { message: `Outcome does not match the bet outcome` },
    24032: { message: `Betting has ended` },
    24122: { message: `Only parent contract can init the market` },
    24933: { message: `Only owner can resolve market` },
    25427: { message: `Only the market can call this function` },
    36661: { message: `Amount must be positive and less than the value sent` },
    38283: { message: `Invalid outcome` },
    38368: { message: `Event has not ended` },
    39401: { message: `Only owner can claim winnings` },
    43115: { message: `Only owner contract can collect fees` },
    51893: { message: `Event type has must be provided` },
    53624: { message: `Bet already placed` },
    55984: { message: `End time must be in the future` },
    59266: { message: `Event name has must be provided` },
    61135: { message: `Amount must be positive` },
}

const PredictionMarket_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"CreateMarketResponse","header":4036598661,"fields":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"CreateMarket","header":1393681475,"fields":[{"name":"eventName","type":{"kind":"simple","type":"string","optional":false}},{"name":"eventDescription","type":{"kind":"simple","type":"string","optional":false}},{"name":"eventType","type":{"kind":"simple","type":"string","optional":false}},{"name":"endTime","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"outcomeName1","type":{"kind":"simple","type":"string","optional":false}},{"name":"outcomeName2","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"MarketInitialize","header":2175637175,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"eventName","type":{"kind":"simple","type":"string","optional":false}},{"name":"eventDescription","type":{"kind":"simple","type":"string","optional":false}},{"name":"eventType","type":{"kind":"simple","type":"string","optional":false}},{"name":"endTime","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"outcomeName1","type":{"kind":"simple","type":"string","optional":false}},{"name":"outcomeName2","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"AddLiquidity","header":1027787397,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"oddsForOutcome1","type":{"kind":"simple","type":"uint","optional":false,"format":8}}]},
    {"name":"RemoveLiquidity","header":258093095,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"PlaceBet","header":2255585262,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"outcome","type":{"kind":"simple","type":"int","optional":false,"format":8}}]},
    {"name":"ResolveMarket","header":1189540808,"fields":[{"name":"outcome","type":{"kind":"simple","type":"int","optional":false,"format":8}}]},
    {"name":"ClaimWinningsInfo","header":4043895049,"fields":[{"name":"betAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"walletAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"outcome","type":{"kind":"simple","type":"int","optional":false,"format":8}}]},
    {"name":"PredictionMarketDetails","header":4424983,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"eventName","type":{"kind":"simple","type":"string","optional":false}},{"name":"eventDescription","type":{"kind":"simple","type":"string","optional":false}},{"name":"eventType","type":{"kind":"simple","type":"string","optional":false}},{"name":"endTime","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"outcomeName1","type":{"kind":"simple","type":"string","optional":false}},{"name":"outcomeName2","type":{"kind":"simple","type":"string","optional":false}},{"name":"totalOutcome1Bets","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"totalOutcome2Bets","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"totalPool","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"totalLiquidity","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"reserve1","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"reserve2","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"oddsForOutcome1","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"protocolFeePercentage","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"outcome","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"resolved","type":{"kind":"simple","type":"bool","optional":false}},{"name":"protocolFees","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"PlaceBetInternal","header":3532229292,"fields":[{"name":"outcome","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"betAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"UserBetInfo","header":2079623544,"fields":[{"name":"outcome","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"betAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
]

const PredictionMarket_getters: ABIGetter[] = [
    {"name":"predictionMarketDetails","arguments":[],"returnType":{"kind":"simple","type":"PredictionMarketDetails","optional":false}},
    {"name":"totalPool","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"totalBetForOutcome","arguments":[{"name":"outcome","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"resolvedOutcome","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"isResolved","arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
]

const PredictionMarket_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"MarketInitialize"}},
    {"receiver":"internal","message":{"kind":"typed","type":"AddLiquidity"}},
    {"receiver":"internal","message":{"kind":"typed","type":"RemoveLiquidity"}},
    {"receiver":"internal","message":{"kind":"typed","type":"PlaceBet"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ResolveMarket"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ClaimWinningsInfo"}},
    {"receiver":"internal","message":{"kind":"text","text":"collectFees"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class PredictionMarket implements Contract {
    
    static async init(parent: Address, seqno: bigint) {
        return await PredictionMarket_init(parent, seqno);
    }
    
    static async fromInit(parent: Address, seqno: bigint) {
        const init = await PredictionMarket_init(parent, seqno);
        const address = contractAddress(0, init);
        return new PredictionMarket(address, init);
    }
    
    static fromAddress(address: Address) {
        return new PredictionMarket(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  PredictionMarket_types,
        getters: PredictionMarket_getters,
        receivers: PredictionMarket_receivers,
        errors: PredictionMarket_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: MarketInitialize | AddLiquidity | RemoveLiquidity | PlaceBet | ResolveMarket | ClaimWinningsInfo | 'collectFees' | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'MarketInitialize') {
            body = beginCell().store(storeMarketInitialize(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'AddLiquidity') {
            body = beginCell().store(storeAddLiquidity(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RemoveLiquidity') {
            body = beginCell().store(storeRemoveLiquidity(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'PlaceBet') {
            body = beginCell().store(storePlaceBet(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ResolveMarket') {
            body = beginCell().store(storeResolveMarket(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ClaimWinningsInfo') {
            body = beginCell().store(storeClaimWinningsInfo(message)).endCell();
        }
        if (message === 'collectFees') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getPredictionMarketDetails(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('predictionMarketDetails', builder.build())).stack;
        const result = loadTuplePredictionMarketDetails(source);
        return result;
    }
    
    async getTotalPool(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('totalPool', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getTotalBetForOutcome(provider: ContractProvider, outcome: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(outcome);
        let source = (await provider.get('totalBetForOutcome', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getResolvedOutcome(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('resolvedOutcome', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getIsResolved(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('isResolved', builder.build())).stack;
        let result = source.readBoolean();
        return result;
    }
    
}