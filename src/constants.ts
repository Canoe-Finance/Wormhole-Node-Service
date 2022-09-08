import { CONTRACTS } from '@certusone/wormhole-sdk';
import { clusterApiUrl, Connection } from '@solana/web3.js';

const CLUSTER = 'devnet';

export const connection = new Connection(clusterApiUrl(CLUSTER));

const SOLANA_CONTRACTS = CONTRACTS[CLUSTER.toUpperCase()].solana;
export const SOL_BRIDGE_ADDRESS = SOLANA_CONTRACTS.core;
export const SOL_TOKEN_BRIDGE_ADDRESS = SOLANA_CONTRACTS.token_bridge;
