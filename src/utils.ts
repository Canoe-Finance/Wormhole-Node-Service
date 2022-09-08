import { importCoreWasm } from '@certusone/wormhole-sdk-wasm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import { connection, SOL_BRIDGE_ADDRESS } from './constants';

export const createNonce = () => {
  const nonceConst = Math.random() * 100000;
  const nonceBuffer = Buffer.alloc(4);
  nonceBuffer.writeUInt32LE(nonceConst, 0);
  return nonceBuffer;
};

export const getBridgeFeeIx = async (payerAddress: string) => {
  // check payerAddress address
  try {
    const userPublicKey = new PublicKey(payerAddress);
    const isValidAddress = PublicKey.isOnCurve(userPublicKey);
    if (!isValidAddress) {
      throw new HttpException('Invalid userPublicKey', HttpStatus.NOT_ACCEPTABLE);
    }
  } catch (_) {
    throw new HttpException('Invalid userPublicKey', HttpStatus.NOT_ACCEPTABLE);
  }

  const bridgeAddress = SOL_BRIDGE_ADDRESS;
  const bridge = await importCoreWasm();
  const feeAccount = bridge.fee_collector_address(bridgeAddress);
  const bridgeStatePK = new PublicKey(bridge.state_address(bridgeAddress));
  const bridgeStateAccountInfo = await connection.getAccountInfo(bridgeStatePK);
  if (bridgeStateAccountInfo?.data === undefined) {
    throw new HttpException('bridge state not found', HttpStatus.NOT_FOUND);
  }
  const bridgeState = bridge.parse_state(new Uint8Array(bridgeStateAccountInfo?.data));
  const transferIx = SystemProgram.transfer({
    fromPubkey: new PublicKey(payerAddress),
    toPubkey: new PublicKey(feeAccount),
    lamports: bridgeState.config.fee,
  });
  return transferIx;
};
