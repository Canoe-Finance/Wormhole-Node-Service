import { ixFromRust, uint8ArrayToHex } from '@certusone/wormhole-sdk';
import { importTokenWasm } from '@certusone/wormhole-sdk-wasm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createApproveInstruction, getAssociatedTokenAddress } from '@solana/spl-token';
import { Keypair, PublicKey, Transaction } from '@solana/web3.js';
import { zeroPad } from 'ethers/lib/utils';
import { AppDto } from './app.dto';
import { connection, SOL_BRIDGE_ADDRESS, SOL_TOKEN_BRIDGE_ADDRESS } from './constants';
import { createNonce, getBridgeFeeIx } from './utils';

@Injectable()
export class AppService {
  async buildTx(data: AppDto): Promise<Transaction> {
    // check payerAddress address
    try {
      const mintPublicKey = new PublicKey(data.mint);
      const isValidAddress = PublicKey.isOnCurve(mintPublicKey);
      if (!isValidAddress) {
        throw new HttpException('Invalid mint', HttpStatus.NOT_ACCEPTABLE);
      }
    } catch (_) {
      throw new HttpException('Invalid mint', HttpStatus.NOT_ACCEPTABLE);
    }

    const fromAddress = await getAssociatedTokenAddress(new PublicKey(data.mint), new PublicKey(data.userPublicKey));

    const transferIx = await getBridgeFeeIx(data.userPublicKey);
    console.log(transferIx);

    const nonce = createNonce().readUInt32LE(0);
    const { transfer_native_ix, approval_authority_address } = await importTokenWasm();
    const approvalIx = createApproveInstruction(
      new PublicKey(fromAddress),
      new PublicKey(approval_authority_address(SOL_TOKEN_BRIDGE_ADDRESS)),
      new PublicKey(data.userPublicKey),
      BigInt(data.amount)
    );
    const messageKey = Keypair.generate();

    const targetAddress = zeroPad(new PublicKey(data.targetAddress).toBytes(), 32);
    console.log(uint8ArrayToHex(targetAddress));
    console.log(targetAddress);
    const ix = ixFromRust(
      transfer_native_ix(
        SOL_TOKEN_BRIDGE_ADDRESS,
        SOL_BRIDGE_ADDRESS,
        data.userPublicKey,
        messageKey.publicKey.toString(),
        fromAddress.toBase58(),
        data.mint,
        nonce,
        BigInt(data.amount),
        BigInt(0),
        targetAddress,
        1
      )
    );

    const transaction = new Transaction().add(transferIx, approvalIx, ix);
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = new PublicKey(data.userPublicKey);
    transaction.partialSign(messageKey);
    return transaction;
  }
}
