import { WalletType } from '@codefi-assets-and-payments/ts-types'
import { Column, PrimaryColumn } from 'typeorm'
import { EntityAutoFields } from './EntityAutoFields'

export abstract class StoreMappingFields extends EntityAutoFields {
  @PrimaryColumn('enum', { nullable: false, enum: WalletType })
  walletType: WalletType

  @Column()
  storeId: string
}
