# This package is deprecated
Heads up, I forked this to use in typechain generations, but ended up using [ethcall](https://github.com/Destiner/ethcall), it has everything you need for handling multicalls.

If you're interested in having advanced typings for multicalls, checkout [typechain-ethers-multicall](https://github.com/HOVOH/TypeChain/tree/master/packages/target-ethers-multicall)

# ethers-multicall

Make multiple Ethereum network requests in a single HTTP query. 
This is a fork of [cavanmflynn/ethers-multicall](https://github.com/cavanmflynn/ethers-multicall) to add support for advanced typed multicalls.

## This package is used in 

## API
* `createMulticallProvider(ethersProvider, chainId?)`: Get the MulticallProvider instance. If no chainId is passed, 
you will need to call the `init()` function and it will fetch the chainId from the provider.
* `Contract(address, abi)`: Create contract instance; Calling `contract.funcName` will yield a `Call<any>`. 
You can use typings optionnaly by calling `contract.methods.funcName<returnType>` which will return a `Call<returnType>`. 
Call objects are passed to the MulticallProvider#all method to execute the call.
* `MulticallProvider#all(calls:Call<any>[])`: Execute all calls in a single request

## Example

See the [test file](https://github.com/HOVOH/ethers-multicall/blob/master/test/index.test.ts)
