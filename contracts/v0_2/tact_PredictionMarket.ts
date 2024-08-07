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
    liquidityAmount: bigint;
    initialOddsForOutcome1: bigint;
}

export function storeCreateMarket(src: CreateMarket) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4136314327, 32);
        b_0.storeStringRefTail(src.eventName);
        b_0.storeStringRefTail(src.eventDescription);
        b_0.storeStringRefTail(src.eventType);
        b_0.storeUint(src.endTime, 64);
        let b_1 = new Builder();
        b_1.storeStringRefTail(src.outcomeName1);
        b_1.storeStringRefTail(src.outcomeName2);
        b_1.storeCoins(src.liquidityAmount);
        b_1.storeUint(src.initialOddsForOutcome1, 8);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadCreateMarket(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4136314327) { throw Error('Invalid prefix'); }
    let _eventName = sc_0.loadStringRefTail();
    let _eventDescription = sc_0.loadStringRefTail();
    let _eventType = sc_0.loadStringRefTail();
    let _endTime = sc_0.loadUintBig(64);
    let sc_1 = sc_0.loadRef().beginParse();
    let _outcomeName1 = sc_1.loadStringRefTail();
    let _outcomeName2 = sc_1.loadStringRefTail();
    let _liquidityAmount = sc_1.loadCoins();
    let _initialOddsForOutcome1 = sc_1.loadUintBig(8);
    return { $$type: 'CreateMarket' as const, eventName: _eventName, eventDescription: _eventDescription, eventType: _eventType, endTime: _endTime, outcomeName1: _outcomeName1, outcomeName2: _outcomeName2, liquidityAmount: _liquidityAmount, initialOddsForOutcome1: _initialOddsForOutcome1 };
}

function loadTupleCreateMarket(source: TupleReader) {
    let _eventName = source.readString();
    let _eventDescription = source.readString();
    let _eventType = source.readString();
    let _endTime = source.readBigNumber();
    let _outcomeName1 = source.readString();
    let _outcomeName2 = source.readString();
    let _liquidityAmount = source.readBigNumber();
    let _initialOddsForOutcome1 = source.readBigNumber();
    return { $$type: 'CreateMarket' as const, eventName: _eventName, eventDescription: _eventDescription, eventType: _eventType, endTime: _endTime, outcomeName1: _outcomeName1, outcomeName2: _outcomeName2, liquidityAmount: _liquidityAmount, initialOddsForOutcome1: _initialOddsForOutcome1 };
}

function storeTupleCreateMarket(source: CreateMarket) {
    let builder = new TupleBuilder();
    builder.writeString(source.eventName);
    builder.writeString(source.eventDescription);
    builder.writeString(source.eventType);
    builder.writeNumber(source.endTime);
    builder.writeString(source.outcomeName1);
    builder.writeString(source.outcomeName2);
    builder.writeNumber(source.liquidityAmount);
    builder.writeNumber(source.initialOddsForOutcome1);
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
    protocolOwner: Address;
    eventName: string;
    eventDescription: string;
    eventType: string;
    endTime: bigint;
    outcomeName1: string;
    outcomeName2: string;
    liquidityAmount: bigint;
    initialOddsForOutcome1: bigint;
}

export function storeMarketInitialize(src: MarketInitialize) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2281811116, 32);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.protocolOwner);
        b_0.storeStringRefTail(src.eventName);
        b_0.storeStringRefTail(src.eventDescription);
        b_0.storeStringRefTail(src.eventType);
        b_0.storeUint(src.endTime, 64);
        let b_1 = new Builder();
        b_1.storeStringRefTail(src.outcomeName1);
        b_1.storeStringRefTail(src.outcomeName2);
        b_1.storeCoins(src.liquidityAmount);
        b_1.storeUint(src.initialOddsForOutcome1, 8);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadMarketInitialize(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2281811116) { throw Error('Invalid prefix'); }
    let _owner = sc_0.loadAddress();
    let _protocolOwner = sc_0.loadAddress();
    let _eventName = sc_0.loadStringRefTail();
    let _eventDescription = sc_0.loadStringRefTail();
    let _eventType = sc_0.loadStringRefTail();
    let _endTime = sc_0.loadUintBig(64);
    let sc_1 = sc_0.loadRef().beginParse();
    let _outcomeName1 = sc_1.loadStringRefTail();
    let _outcomeName2 = sc_1.loadStringRefTail();
    let _liquidityAmount = sc_1.loadCoins();
    let _initialOddsForOutcome1 = sc_1.loadUintBig(8);
    return { $$type: 'MarketInitialize' as const, owner: _owner, protocolOwner: _protocolOwner, eventName: _eventName, eventDescription: _eventDescription, eventType: _eventType, endTime: _endTime, outcomeName1: _outcomeName1, outcomeName2: _outcomeName2, liquidityAmount: _liquidityAmount, initialOddsForOutcome1: _initialOddsForOutcome1 };
}

function loadTupleMarketInitialize(source: TupleReader) {
    let _owner = source.readAddress();
    let _protocolOwner = source.readAddress();
    let _eventName = source.readString();
    let _eventDescription = source.readString();
    let _eventType = source.readString();
    let _endTime = source.readBigNumber();
    let _outcomeName1 = source.readString();
    let _outcomeName2 = source.readString();
    let _liquidityAmount = source.readBigNumber();
    let _initialOddsForOutcome1 = source.readBigNumber();
    return { $$type: 'MarketInitialize' as const, owner: _owner, protocolOwner: _protocolOwner, eventName: _eventName, eventDescription: _eventDescription, eventType: _eventType, endTime: _endTime, outcomeName1: _outcomeName1, outcomeName2: _outcomeName2, liquidityAmount: _liquidityAmount, initialOddsForOutcome1: _initialOddsForOutcome1 };
}

function storeTupleMarketInitialize(source: MarketInitialize) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.protocolOwner);
    builder.writeString(source.eventName);
    builder.writeString(source.eventDescription);
    builder.writeString(source.eventType);
    builder.writeNumber(source.endTime);
    builder.writeString(source.outcomeName1);
    builder.writeString(source.outcomeName2);
    builder.writeNumber(source.liquidityAmount);
    builder.writeNumber(source.initialOddsForOutcome1);
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
}

export function storeAddLiquidity(src: AddLiquidity) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(136608060, 32);
        b_0.storeCoins(src.amount);
    };
}

export function loadAddLiquidity(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 136608060) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    return { $$type: 'AddLiquidity' as const, amount: _amount };
}

function loadTupleAddLiquidity(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'AddLiquidity' as const, amount: _amount };
}

function storeTupleAddLiquidity(source: AddLiquidity) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
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
    parent: Address;
    seqno: bigint;
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
    isRemoved: boolean;
}

export function storePredictionMarketDetails(src: PredictionMarketDetails) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1742772941, 32);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.parent);
        b_0.storeUint(src.seqno, 64);
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
        b_1.storeBit(src.isRemoved);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPredictionMarketDetails(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1742772941) { throw Error('Invalid prefix'); }
    let _owner = sc_0.loadAddress();
    let _parent = sc_0.loadAddress();
    let _seqno = sc_0.loadUintBig(64);
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
    let _isRemoved = sc_1.loadBit();
    return { $$type: 'PredictionMarketDetails' as const, owner: _owner, parent: _parent, seqno: _seqno, eventName: _eventName, eventDescription: _eventDescription, eventType: _eventType, endTime: _endTime, outcomeName1: _outcomeName1, outcomeName2: _outcomeName2, totalOutcome1Bets: _totalOutcome1Bets, totalOutcome2Bets: _totalOutcome2Bets, totalPool: _totalPool, totalLiquidity: _totalLiquidity, reserve1: _reserve1, reserve2: _reserve2, oddsForOutcome1: _oddsForOutcome1, protocolFeePercentage: _protocolFeePercentage, outcome: _outcome, resolved: _resolved, protocolFees: _protocolFees, isRemoved: _isRemoved };
}

function loadTuplePredictionMarketDetails(source: TupleReader) {
    let _owner = source.readAddress();
    let _parent = source.readAddress();
    let _seqno = source.readBigNumber();
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
    let _isRemoved = source.readBoolean();
    return { $$type: 'PredictionMarketDetails' as const, owner: _owner, parent: _parent, seqno: _seqno, eventName: _eventName, eventDescription: _eventDescription, eventType: _eventType, endTime: _endTime, outcomeName1: _outcomeName1, outcomeName2: _outcomeName2, totalOutcome1Bets: _totalOutcome1Bets, totalOutcome2Bets: _totalOutcome2Bets, totalPool: _totalPool, totalLiquidity: _totalLiquidity, reserve1: _reserve1, reserve2: _reserve2, oddsForOutcome1: _oddsForOutcome1, protocolFeePercentage: _protocolFeePercentage, outcome: _outcome, resolved: _resolved, protocolFees: _protocolFees, isRemoved: _isRemoved };
}

function storeTuplePredictionMarketDetails(source: PredictionMarketDetails) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.parent);
    builder.writeNumber(source.seqno);
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
    builder.writeBoolean(source.isRemoved);
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
    isClaimed: boolean;
}

export function storeUserBetInfo(src: UserBetInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3267701942, 32);
        b_0.storeInt(src.outcome, 8);
        b_0.storeCoins(src.betAmount);
        b_0.storeBit(src.isClaimed);
    };
}

export function loadUserBetInfo(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3267701942) { throw Error('Invalid prefix'); }
    let _outcome = sc_0.loadIntBig(8);
    let _betAmount = sc_0.loadCoins();
    let _isClaimed = sc_0.loadBit();
    return { $$type: 'UserBetInfo' as const, outcome: _outcome, betAmount: _betAmount, isClaimed: _isClaimed };
}

function loadTupleUserBetInfo(source: TupleReader) {
    let _outcome = source.readBigNumber();
    let _betAmount = source.readBigNumber();
    let _isClaimed = source.readBoolean();
    return { $$type: 'UserBetInfo' as const, outcome: _outcome, betAmount: _betAmount, isClaimed: _isClaimed };
}

function storeTupleUserBetInfo(source: UserBetInfo) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.outcome);
    builder.writeNumber(source.betAmount);
    builder.writeBoolean(source.isClaimed);
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
    const __code = Cell.fromBase64('te6ccgECOAEADJcAART/APSkE/S88sgLAQIBYgIDA9LQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zwRFREXERURFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDlUd2zzy4IIyBAUCASAgIQSq7aLt+wGWgCDXITB/4HAh10nCH5UwINcLH94gghCIAaysuo8IMNs8bBrbPH/gIIIQCCR5PLqOlTDTHwGCEAgkeTy68uCB+gABMds8f+AgghAPYjAnugYHCAkBPMj4QwHMfwHKABEWERURFBETERIREREQVeDbPMntVB4A7tMfAYIQiAGsrLry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB1AHQAdQB0AHUAdAB0z/UAdDUAdAB1AHQAfoA0wcwEEoQSRBIEEcQRhBFBPJXE1cTVxZXFlcWVxZXGFcYgV46+EJWFwHHBfL0ggDasFYT+CO88vQBERYBERURFBETERIRFxESARERAREQDxEXDw4RFw4NERcNDBEXDFWQC1YXAds8+EFvJBNfAwERF6GCCTEtAKFyiFYXVSB/VTBtbds8ERQRFREUDBscCgH0ggCPNSHCAI4Q+EFvJBNfA4IJMS0AoFIguZFw4vL0gUsT+EJWGAHHBfL0ERURFhEVERQRFhEUERMRFhETERIRFhESERERFhERERARFhEQDxEWDw4RFg4NERYNDBEWDAsRFgsKERYKCREWCQgRFggHERYHBhEWBgURFgULBL6OqjDTHwGCEA9iMCe68uCB+gABMYIA7s8hwgDy9IFLE/hCVhgBxwXy9Ns8f+AgghCGcX/uuo6VMNMfAYIQhnF/7rry4IH6ANIHWWwS4CCCEEbm88i64wIgghDxCPEJug0ODxAAPBETERQRExESERMREhERERIREREQEREREA8REA9VDgOmBBEWBAMRFgNWFlUgIBEY2zz4QW8kE18DAREXoYIJMS0AoXKIVhdVIH9VMG1t2zwRFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ4MGxwAQDQ0NFMhqIBkqQRTMKFRZKBTFlCWoFCioFCGoBBYBwYEAoxT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O7mlNCg0PTMZLJooJiqqJCk0Jhu3t7M5GTk1rLWimrkmwQIXpfO2ebZ4riC+HtjDMjEAAiYC1u1E0NQB+GPSAAGOqNs8VxYRFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7g+CjXCwqDCbry4In6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcAWQLRAds8NDUAWFYVVhRWFFYUVhRWFFYUVhFWEVYRVhFWEVYRVhFWEVYRVhFWHlYdVhNWIBAjAfb6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHTP9QB0AHUAdAB1AHQ1AHQAdM/0gDSANIH1AE2AfJwIMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIcCDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiIsIiwiLCHCLCIsIcHB/VHVVVHAAIHohERMRFRETNwB60AHUAdAB+gD6APoA+gD6APoA0wfTB/oAMBEQERYREBEQERUREBEQERQREBEQERMREBEQERIREBEQEREREAAUERIRFBESXioQmw==');
    const __system = Cell.fromBase64('te6cckECUAEAEBsAAQHAAQIBSAIXAQW7TbgDART/APSkE/S88sgLBAIBYgUNA3rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVFNs88uCCDwYMA+ztou37AZaAINchMH/gcCHXScIflTAg1wsf3iCCENKJiqy6j1Aw0x8BghDSiYqsuvLggdIH+gBZbBKCAIHd+EJScMcF8vSCAJy5JMD/kjR/k1FCuuIU8vRaoPhBbyQTXwOCCJiWgKFyiCdVIH9VMG1t2zwCf+AgBzIIABQAAAAAcmVmdW5kAnKCEJRqmLa6jqgw0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/4MAAkTDjDXAtCQPo+QEggvDz4U6a5B0wncJo0VJfxEiuxkcTGSdpLXY9EzsCWkbbAbrjAoLwIowpV1CZzKEoMEzfXQC0/X9yyXLtkZ5mmVn2XEbANMW6jyaBY1P4QlJQxwXy9IEgUgHAAPL0f3CBAIKIJ1Ugf1UwbW3bPH/bMeAKCzIBuDCBJt34QlJgxwXy9IEgUiHAAPL0cIBC+EJUZGBYyFUgghDxCPEJUATLH1j6AgEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbKB8kmVSB/VTBtbds8f9sxMgAWAAAAAHdpbm5pbmcAqMj4QwHMfwHKAFVAUFQg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZYINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8Wyz8SygfKAMntVAIBIA4TAhG+0W7Z5tnjYpwPEgHE7UTQ1AH4Y9IAAY5K+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdM/0gfSAFVAbBXg+CjXCwqDCbry4IkQAYr6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSAtEB2zwRAAZwf3AACFRyEBICASA+FAIBSBUWABGwr7tRNDSAAGAAdbJu40NWlwZnM6Ly9RbWJBRmt4MXF6SnZCSjJNcHMxNnM3NUNUTFBQN0FDeHFQNHVKUUxkN0hDTENBggAQW6CVgYART/APSkE/S88sgLGQIBYho3A9LQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zwRFREXERURFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDlUd2zzy4IJKGzQEqu2i7fsBloAg1yEwf+BwIddJwh+VMCDXCx/eIIIQiAGsrLqPCDDbPGwa2zx/4CCCEAgkeTy6jpUw0x8BghAIJHk8uvLggfoAATHbPH/gIIIQD2IwJ7ocHR8iAO7THwGCEIgBrKy68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdQB0AHUAdAB1AHQAdM/1AHQ1AHQAdQB0AH6ANMHMBBKEEkQSBBHEEYQRQTyVxNXE1cWVxZXFlcWVxhXGIFeOvhCVhcBxwXy9IIA2rBWE/gjvPL0AREWAREVERQRExESERcREgEREQEREA8RFw8OERcODREXDQwRFwxVkAtWFwHbPPhBbyQTXwMBERehggkxLQChcohWF1Ugf1UwbW3bPBEUERURFCExMh4APBETERQRExESERMREhERERIREREQEREREA8REA9VDgH0ggCPNSHCAI4Q+EFvJBNfA4IJMS0AoFIguZFw4vL0gUsT+EJWGAHHBfL0ERURFhEVERQRFhEUERMRFhETERIRFhESERERFhERERARFhEQDxEWDw4RFg4NERYNDBEWDAsRFgsKERYKCREWCQgRFggHERYHBhEWBgURFgUgA6YEERYEAxEWA1YWVSAgERjbPPhBbyQTXwMBERehggkxLQChcohWF1Ugf1UwbW3bPBEUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDiExMgBANDQ0UyGogGSpBFMwoVFkoFMWUJagUKKgUIagEFgHBgQEvo6qMNMfAYIQD2IwJ7ry4IH6AAExggDuzyHCAPL0gUsT+EJWGAHHBfL02zx/4CCCEIZxf+66jpUw0x8BghCGcX/uuvLggfoA0gdZbBLgIIIQRubzyLrjAiCCEPEI8Qm6IyUnKAKMUwOogGSpBFyhUYKhUXGhUWihUZKhULuhUJeh+CdvEPhBbyQTXwOh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quKq4qriquKq4qriquKq4qriquKq4qriyuKCIkIiYiJCIiIiQiIiIgIiIiIB4iIB6qHQSk8C1u1E0NQB+GPSAAGOqNs8VxYRFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7g+CjXCwqDCbry4In6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcAWQLRAds8S00B9vpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdM/1AHQAdQB0AHUAdDUAdAB0z/SANIA0gfUAUwAetAB1AHQAfoA+gD6APoA+gD6ANMH0wf6ADAREBEWERAREBEVERAREBEUERAREBETERAREBESERAREBERERAB8nAgyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhwIMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIiwiLCIsIcIsIiwhwcH9UdVVUcAAgeiERExEVERNOABQREhEUERJeKhCbAFhWFVYUVhRWFFYUVhRWFFYRVhFWEVYRVhFWEVYRVhFWEVYRVh5WHVYTViAQIz510vg=');
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
    11543: { message: `Market may be removed to after protocol fees are collected` },
    12328: { message: `You should provide mininum of 5 TON liquidity` },
    17847: { message: `Event description has must be provided` },
    19219: { message: `Only owner contract can provire liquidity for the market` },
    20846: { message: `Market already resolved` },
    22516: { message: `Outcome does not match the bet outcome` },
    24032: { message: `Betting has ended` },
    24122: { message: `Only parent contract can init the market` },
    25427: { message: `Only the market can call this function` },
    33245: { message: `Only the market can place a bet` },
    36661: { message: `Amount must be positive and less than the value sent` },
    38283: { message: `Invalid outcome` },
    38368: { message: `Event has not ended` },
    39401: { message: `Only owner can claim winnings` },
    40121: { message: `Should be first bet or same outcome bet` },
    42611: { message: `Market may be removed to before delete` },
    43115: { message: `Only owner contract can collect fees` },
    51040: { message: `Market may be removed to after liquidity is removed` },
    51687: { message: `Market may be removed to after 2 weeks` },
    51893: { message: `Event type has must be provided` },
    52045: { message: `Only owners can resolve market` },
    55984: { message: `End time must be in the future` },
    59266: { message: `Event name has must be provided` },
    61135: { message: `Amount must be positive` },
    61142: { message: `Only owners contract can collect fees` },
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
    {"name":"CreateMarket","header":4136314327,"fields":[{"name":"eventName","type":{"kind":"simple","type":"string","optional":false}},{"name":"eventDescription","type":{"kind":"simple","type":"string","optional":false}},{"name":"eventType","type":{"kind":"simple","type":"string","optional":false}},{"name":"endTime","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"outcomeName1","type":{"kind":"simple","type":"string","optional":false}},{"name":"outcomeName2","type":{"kind":"simple","type":"string","optional":false}},{"name":"liquidityAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"initialOddsForOutcome1","type":{"kind":"simple","type":"uint","optional":false,"format":8}}]},
    {"name":"MarketInitialize","header":2281811116,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"protocolOwner","type":{"kind":"simple","type":"address","optional":false}},{"name":"eventName","type":{"kind":"simple","type":"string","optional":false}},{"name":"eventDescription","type":{"kind":"simple","type":"string","optional":false}},{"name":"eventType","type":{"kind":"simple","type":"string","optional":false}},{"name":"endTime","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"outcomeName1","type":{"kind":"simple","type":"string","optional":false}},{"name":"outcomeName2","type":{"kind":"simple","type":"string","optional":false}},{"name":"liquidityAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"initialOddsForOutcome1","type":{"kind":"simple","type":"uint","optional":false,"format":8}}]},
    {"name":"AddLiquidity","header":136608060,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"RemoveLiquidity","header":258093095,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"PlaceBet","header":2255585262,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"outcome","type":{"kind":"simple","type":"int","optional":false,"format":8}}]},
    {"name":"ResolveMarket","header":1189540808,"fields":[{"name":"outcome","type":{"kind":"simple","type":"int","optional":false,"format":8}}]},
    {"name":"ClaimWinningsInfo","header":4043895049,"fields":[{"name":"betAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"walletAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"outcome","type":{"kind":"simple","type":"int","optional":false,"format":8}}]},
    {"name":"PredictionMarketDetails","header":1742772941,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"parent","type":{"kind":"simple","type":"address","optional":false}},{"name":"seqno","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"eventName","type":{"kind":"simple","type":"string","optional":false}},{"name":"eventDescription","type":{"kind":"simple","type":"string","optional":false}},{"name":"eventType","type":{"kind":"simple","type":"string","optional":false}},{"name":"endTime","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"outcomeName1","type":{"kind":"simple","type":"string","optional":false}},{"name":"outcomeName2","type":{"kind":"simple","type":"string","optional":false}},{"name":"totalOutcome1Bets","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"totalOutcome2Bets","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"totalPool","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"totalLiquidity","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"reserve1","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"reserve2","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"oddsForOutcome1","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"protocolFeePercentage","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"outcome","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"resolved","type":{"kind":"simple","type":"bool","optional":false}},{"name":"protocolFees","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"isRemoved","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"PlaceBetInternal","header":3532229292,"fields":[{"name":"outcome","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"betAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"UserBetInfo","header":3267701942,"fields":[{"name":"outcome","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"betAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"isClaimed","type":{"kind":"simple","type":"bool","optional":false}}]},
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
    {"receiver":"internal","message":{"kind":"text","text":"remove"}},
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
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: MarketInitialize | AddLiquidity | RemoveLiquidity | PlaceBet | ResolveMarket | ClaimWinningsInfo | 'collectFees' | 'remove' | Deploy) {
        
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
        if (message === 'remove') {
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