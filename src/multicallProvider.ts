import { Provider as EthersProvider } from '@ethersproject/abstract-provider';
import { all } from './call';
import { getEthBalance } from './calls';
import { ContractCall } from './types';

export type MulticallProvider = typeof Provider & Multicalls;

export function createMulticallProvider(provider: EthersProvider, chainId?: number): MulticallProvider {
  return Provider.create(provider, chainId);
}

class Provider implements Multicalls {

  public static create(provider: EthersProvider, chainId?: number): MulticallProvider {
    return new Provider(provider, chainId) as unknown as MulticallProvider;
  }

  private _provider: EthersProvider;
  private _multicallAddress: string;

  constructor(provider: EthersProvider, chainId?: number) {
    this._provider = provider;
    this._multicallAddress = getAddressForChainId(chainId);
  }

  public async init() {
    // Only required if `chainId` was not provided in constructor
    this._multicallAddress = await getAddress(this._provider);
  }

  public getEthBalance(address: string) {
    if (!this._provider) {
      throw new Error('Provider should be initialized before use.');
    }
    return getEthBalance(address, this._multicallAddress);
  }

  public async all<T extends ContractCall<any>[] = ContractCall<any>[]>(calls: T) {
    if (!this._provider) {
      throw new Error('Provider should be initialized before use.');
    }
    return all(calls, this._multicallAddress, this._provider);
  }
}

export interface Multicalls {
  all<T1, T2>(calls: [ContractCall<T1>, ContractCall<T2>]): Promise<[T1, T2]>;
  all<T1, T2, T3>(calls: [ContractCall<T1>, ContractCall<T2>, ContractCall<T3>]): Promise<[T1, T2, T3]>;
  all<T1, T2, T3, T4>(calls: [
    ContractCall<T1>,
    ContractCall<T2>,
    ContractCall<T3>,
    ContractCall<T4>
  ]): Promise<[T1, T2, T3, T4]>;
  all<T1, T2, T3, T4, T5>(calls: [
    ContractCall<T1>,
    ContractCall<T2>,
    ContractCall<T3>,
    ContractCall<T4>,
    ContractCall<T5>
  ]): Promise<[T1, T2, T3, T4, T5]>;
  all<T1, T2, T3, T4, T5, T6>(calls: [
    ContractCall<T1>,
    ContractCall<T2>,
    ContractCall<T3>,
    ContractCall<T4>,
    ContractCall<T5>,
    ContractCall<T6>,
  ]): Promise<[T1, T2, T3, T4, T5, T6]>;
  all<T1, T2, T3, T4, T5, T6, T7>(calls: [
    ContractCall<T1>,
    ContractCall<T2>,
    ContractCall<T3>,
    ContractCall<T4>,
    ContractCall<T5>,
    ContractCall<T6>,
    ContractCall<T7>,
  ]): Promise<[T1, T2, T3, T4, T5, T6, T7]>;
  all<T1, T2, T3, T4, T5, T6, T7, T8>(calls: [
    ContractCall<T1>,
    ContractCall<T2>,
    ContractCall<T3>,
    ContractCall<T4>,
    ContractCall<T5>,
    ContractCall<T6>,
    ContractCall<T7>,
    ContractCall<T8>,
  ]): Promise<[T1, T2, T3, T4, T5, T6, T7, T8]>;
  all<T extends ContractCall[] = ContractCall[]>(calls: T): Promise<T>;
}

const multicallAddresses = {
  1: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441',
  3: '0xF24b01476a55d635118ca848fbc7Dab69d403be3',
  4: '0x42ad527de7d4e9d9d011ac45b31d8551f8fe9821',
  5: '0x77dca2c955b15e9de4dbbcf1246b4b85b651e50e',
  10: '0x7Cbc68dc836e05833CF88b6676715dB805B5c0a2',
  42: '0x2cc8688c5f75e365aaeeb4ea8d6a480405a48d2a',
  56: '0x1Ee38d535d541c55C9dae27B12edf090C608E6Fb',
  66: '0x94fEadE0D3D832E4A05d459eBeA9350c6cDd3bCa',
  69: '0x4afaA782D74825a267e40aE2a231C271D1c392C3',
  97: '0x3A09ad1B8535F25b48e6Fa0CFd07dB6B017b31B2',
  100: '0xb5b692a88bdfc81ca69dcb1d924f59f0413a602a',
  128: '0x2C55D51804CF5b436BA5AF37bD7b8E5DB70EBf29',
  137: '0x11ce4B23bD875D7F5C6a31084f55fDe1e9A87507',
  250: '0x0118EF741097D0d3cc88e46233Da1e407d9ac139',
  1337: '0x77dca2c955b15e9de4dbbcf1246b4b85b651e50e',
  42161: '0x813715eF627B01f4931d8C6F8D2459F26E19137E',
  43114: '0x7f3aC7C283d7E6662D886F494f7bc6F1993cDacf',
  80001: '0x08411ADd0b5AA8ee47563b146743C13b3556c9Cc',
};

export function setMulticallAddress(chainId: number, address: string) {
  multicallAddresses[chainId] = address;
}

function getAddressForChainId(chainId: number) {
  return multicallAddresses[chainId];
}

async function getAddress(provider: EthersProvider) {
  const { chainId } = await provider.getNetwork();
  return getAddressForChainId(chainId);
}
