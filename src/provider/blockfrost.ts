import type {
  Provider,
  Network,
  ProtocolParameters,
  BlockfrostProtocolParameters,
  BlockfrostSpecificStakePool,
  BlockfrostStakePoolMetadata,
} from '../types/mod';

export class Blockfrost implements Provider {
  network: Network;
  projectId: string;
  endpoint: 'cardano-mainnet' | 'cardano-preprod' | 'cardano-preview';

  constructor(projectId: string, network?: Network) {
    this.network = network || 'Mainnet';
    this.projectId = projectId;
    this.endpoint =
      network === 'Preprod'
        ? 'cardano-preprod'
        : network === 'Preview'
          ? 'cardano-preview'
          : 'cardano-mainnet';
  }

  async getProtocolParameters(): Promise<ProtocolParameters> {
    const response = await fetch(
      `https://${this.endpoint}.blockfrost.io/api/v0/epochs/latest/parameters`,
      {
        headers: { project_id: this.projectId },
      },
    );
    const result: BlockfrostProtocolParameters = await response.json();

    return {
      minFeeA: parseInt(result.min_fee_a.toString()),
      minFeeB: parseInt(result.min_fee_b.toString()),
      maxTxSize: parseInt(result.max_tx_size.toString()),
      maxValSize: parseInt(result.max_val_size.toString()),
      keyDeposit: BigInt(result.key_deposit),
      poolDeposit: BigInt(result.pool_deposit),
      priceMem: parseFloat(result.price_mem),
      priceStep: parseFloat(result.price_step),
      maxTxExMem: BigInt(result.max_tx_ex_mem),
      maxTxExSteps: BigInt(result.max_tx_ex_steps),
      coinsPerUtxoByte: BigInt(result.coins_per_utxo_size),
      collateralPercentage: parseInt(result.collateral_percent.toString()),
      maxCollateralInputs: parseInt(result.max_collateral_inputs.toString()),
      costModels: result.cost_models,
    };
  }

  async getSpecificPoolData(
    pool_id: string,
  ): Promise<BlockfrostSpecificStakePool> {
    const response = await fetch(
      `https://${this.endpoint}.blockfrost.io/api/v0/pools/${pool_id}`,
      {
        headers: { project_id: this.projectId },
      },
    );
    return await response.json();
  }

  async getStakePoolMetadata(
    pool_id: string,
  ): Promise<BlockfrostStakePoolMetadata> {
    const response = await fetch(
      `https://${this.endpoint}.blockfrost.io/api/v0/pools/${pool_id}/metadata`,
      {
        headers: { project_id: this.projectId },
      },
    );
    return await response.json();
  }
}
