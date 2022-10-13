# Canoe cross-chain back-end

## Introduction

The back-end node service using wormhole sdk.

Cross chain operations can be performed across platforms [Flutter, Unity, ...].

## Clone canoe wormhole node

```bash
git clone git@github.com:Canoe-Finance/wormhole-node.git
```

## Install

```bash
npm install
```

## Run

```bash
npm run start
```

## Request

```json
{
 "userPublicKey": "[wallet publicKey]",
 "mint": "[token address]",
 "messageAddress": "[optional address]"
 "targetAddress": "[eth address]",
 "amount": "[optional cross-chain amount, if not input, it's cross-chain NFT]"
}
```

## Function

### 1. Cross-chain token

Cross-chain token from solana to ethereum

Support tokens:

- SOL (Native token)
- USDT (Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB)
- USDC (EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v)
- BUSDet (33fsBLA8djQm82RpHmE3SuVrPGtZBWNYExsEUeKX1HXX)
- USDK (43m2ewFV5nDepieFjT9EmAQnc1HRtAF247RBpLGFem5F)
- HUSD (7VQo3HFLNH5QqGtM8eC3XQbPkJUu7nS9LeGWjerRh5Sw)
- ETH (7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs)
- BNB (9gP2kCy3wA1ctvYWQk75guqXuHfrEomqydHLtcTCqiLa)
- UST (9vMJfxuKxXBoEa7rM12mYLMwTacLMLDJqHozw96WQL8i)
- USDCet (A9mUU4qviSctJVPJdBJWkb28deg915LYJKrzQ19ji3FM)
- USDTet (Dn4noZ5jgGfkntzcQSUZ8czkreiZ1ForXYoV2H8Dm7S1)
- USDCpo (E2VmbootbVCBkMNNxKQgCLMS1X3NoGMaYAsufaAsf7M)
- DAI (EjmyN6qEC1Tf1JxiG1ae7UTJhUxSwk1TCWNWqxWV4J6o)
- FTT (EzfgjvkSwthhgHaceR3LnKXUoRkP6NUhfghdaHAj1tUv)
- LUNA (F6v4wfAdJB8D8p77bMXZgYt8TDKsYxLYxH5AFhUkYx9W)
- FRAX (FR87nWEUxVgerFGhZM8Y4AggKGLnaXswr1Pd8wZ4kZcp)
- MATICpo (Gz7VkD4MacbEB6yC5XD3HcumEiYx2EtDYYrfikGsvopG)
- AVAX (KgV1GvrHQmRBY8sHQQeUKwTm2r2h8t4C8qt12Cw1HVE)
- SRMet (KgV1GvrHQmRBY8sHQQeUKwTm2r2h8t4C8qt12Cw1HVE)

#### Cross-chain token example

![image](https://user-images.githubusercontent.com/13432688/190568712-0eca5f59-09cc-4e31-b1c0-5887a89a5cef.png)

### 2. Cross-chain NFT

Cross-chain NFT from solana to ethereum

### Cross-chain NFT example

![image](https://user-images.githubusercontent.com/13432688/193602553-6343956a-b940-49aa-9f7f-e03c4d234c1a.png)

## How to use the front end

```js
// serializedTransaction: api response
const transaction = Transaction.from(Buffer.from(serializedTransaction, 'base64'))
// send transaction
const txid = await connection.sendTransaction(transaction, [wallet.payer], {
  skipPreflight: true
})
await connection.confirmTransaction(txid)
console.log(`https://solscan.io/tx/${txid}`)
```

## Features

1. Add fromChain and toChain

2. Support chains:

- Acala
- Aurora
- Avalanche
- Binance Smart Chain
- Celo
- Fantom
- Karura
- Moonbeam
- Near
- Oasis
- Polygon
- Terra Classic
- Terra
