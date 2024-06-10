import { PlutusVersion } from '../types/mod';

type CostModel = Record<string, number>;

export type CostModels = Record<PlutusVersion, CostModel>;

export type ProtocolParameters = {
  minFeeA: number;
  minFeeB: number;
  maxTxSize: number;
  maxValSize: number;
  keyDeposit: bigint;
  poolDeposit: bigint;
  priceMem: number;
  priceStep: number;
  maxTxExMem: bigint;
  maxTxExSteps: bigint;
  coinsPerUtxoByte: bigint;
  collateralPercentage: number;
  maxCollateralInputs: number;
  costModels: CostModels;
};

export interface Provider {
  getProtocolParameters(): Promise<ProtocolParameters>;
  /** Query UTxOs by address or payment credential. */
  // getUtxos(addressOrCredential: Address | Credential): Promise<UTxO[]>;
  // /** Query UTxOs by address or payment credential filtered by a specific unit. */
  // getUtxosWithUnit(
  //   addressOrCredential: Address | Credential,
  //   unit: Unit,
  // ): Promise<UTxO[]>;
  // /** Query a UTxO by a unit. It needs to be an NFT (or optionally the entire supply in one UTxO). */
  // getUtxoByUnit(unit: Unit): Promise<UTxO>;
  // /** Query UTxOs by the output reference (tx hash and index). */
  // getUtxosByOutRef(outRefs: Array<OutRef>): Promise<UTxO[]>;
  // getDelegation(rewardAddress: RewardAddress): Promise<Delegation>;
  // getDatum(datumHash: DatumHash): Promise<Datum>;
  // awaitTx(txHash: TxHash, checkInterval?: number): Promise<boolean>;
  // submitTx(tx: Transaction): Promise<TxHash>;
}

/**
 * Blockfrost REST API response type
 */
export type BlockfrostProtocolParameters = {
  epoch: number;
  min_fee_a: number;
  min_fee_b: number;
  max_block_size: number;
  max_tx_size: number;
  max_block_header_size: number;
  key_deposit: number;
  pool_deposit: number;
  e_max: number;
  n_opt: number;
  a0: string;
  rho: string;
  tau: string;
  decentralisation_param: number;
  extra_entropy: null;
  protocol_major_ver: number;
  protocol_minor_ver: number;
  min_utxo: string;
  min_pool_cost: number;
  nonce: string;
  cost_models: Record<PlutusVersion, { [key: string]: number }>;
  price_mem: string;
  price_step: string;
  max_tx_ex_mem: number;
  max_tx_ex_steps: number;
  max_block_ex_mem: number;
  max_block_ex_steps: number;
  max_val_size: number;
  collateral_percent: number;
  max_collateral_inputs: number;
  coins_per_utxo_size: number;
};

/**
 * @link https://blockfrost.dev/api/specific-stake-pool
 */
export type BlockfrostSpecificStakePool = {
  pool_id: string;
  hex: string;
  vrf_key: string;
  blocks_minted: number;
  blocks_epoch: number;
  live_stake: string;
  live_size: number;
  live_saturation: number;
  live_delegators: number;
  active_stake: string;
  active_size: number;
  declared_pledge: string;
  live_pledge: string;
  margin_cost: number;
  fixed_cost: string;
  reward_account: string;
  owners: string[];
  registration: string[];
  retirement: string[];
};
/**
 * @link https://blockfrost.dev/api/stake-pool-metadata
 */
export type BlockfrostStakePoolMetadata = {
  pool_id: string;
  hex: string;
  url: string;
  hash: string;
  ticker: string;
  name: string;
  description: string;
  homepage: string;
};
