import { IEntityWallet } from '@codefi-assets-and-payments/messaging-events'
import { EntityStatus, WalletType } from '@codefi-assets-and-payments/ts-types'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class LegalEntityEntity {
  @PrimaryColumn()
  id: string

  @Column()
  legalEntityName: string

  @Column()
  ethereumAddress: string //defaultAddress SASS

  @Column()
  orchestrateChainName: string

  @Column({
    type: 'enum',
    enum: EntityStatus,
  })
  status: EntityStatus

  @Column()
  issuer: boolean

  @Column()
  tenantId: string

  @Column({ nullable: true })
  createdBy?: string

  @Column({ nullable: true })
  createdAt?: Date

  @Column('jsonb', { nullable: true })
  metadata?: any
}
