import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { ContractManager } from './ContractManager'
import { OrchestrateTransactionManager } from './OrchestrateTransactionManager'
import { OrchestrateConsumer } from '../events/OrchestrateConsumer'
import { RawTransactionManager } from './RawTransactionManager'
import { EthersWrapper } from '@codefi-assets-and-payments/ethers'
import { ContractRegistryModule } from '../contracts/ContractRegistryModule'
import { ChainRegistryModule } from '../chains/ChainRegistryModule'
import { ApmModule } from '@codefi-assets-and-payments/observability'

@Module({
  imports: [
    HttpModule,
    EthersWrapper,
    ContractRegistryModule,
    ChainRegistryModule,
    ApmModule,
  ],
  providers: [
    ContractManager,
    OrchestrateTransactionManager,
    OrchestrateConsumer,
    RawTransactionManager,
  ],
  exports: [
    ContractManager,
    OrchestrateConsumer,
    RawTransactionManager,
    OrchestrateTransactionManager,
  ],
})
export class OrchestrateContractManagerModule {}
