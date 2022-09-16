# Canoe cross-chain back-end

### Resquest

```bash
{
 "userPublicKey": "[wallet publicKey]",
 "mint": "[token address]",
 "targetAddress": "[eth address]",
 "amount": "[cross-chain amount]"
}
```

### Example

![image](https://user-images.githubusercontent.com/13432688/190568712-0eca5f59-09cc-4e31-b1c0-5887a89a5cef.png)

### How to use the front end

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

## Installation

```bash
npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
