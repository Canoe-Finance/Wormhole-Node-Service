import { CONTRACTS } from '@certusone/wormhole-sdk';
import { clusterApiUrl, Connection } from '@solana/web3.js';

export const connection = new Connection(clusterApiUrl('mainnet-beta'));

const SOLANA_CONTRACTS = CONTRACTS['MAINNET'].solana;
export const SOL_BRIDGE_ADDRESS = SOLANA_CONTRACTS.core;
export const SOL_TOKEN_BRIDGE_ADDRESS = SOLANA_CONTRACTS.token_bridge;
export const SOL_NFT_BRIDGE_ADDRESS = SOLANA_CONTRACTS.nft_bridge;
