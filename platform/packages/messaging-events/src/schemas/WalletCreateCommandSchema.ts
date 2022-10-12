import BaseMessageSchema from './BaseMessageSchema';

export class WalletCreateCommandSchema {
  static schema = {
    type: 'record',
    name: 'walletCreateCommand',
    namespace: 'net.consensys.codefi.convergence.wallet',
    fields: [
      {
        ...BaseMessageSchema.schema,
      },
      {
        name: 'tenantId',
        type: ['null', 'string'],
        default: null,
      },
      {
        name: 'entityId',
        type: 'string',
      },
      {
        name: 'address',
        type: ['null', 'string'],
        default: null,
      },
      {
        name: 'type',
        type: {
          type: 'enum',
          name: 'WalletType',
          symbols: [
            'orchestrate',
            'external',
            'INTERNAL_CODEFI_HASHICORP_VAULT',
            'INTERNAL_CODEFI_AZURE_VAULT',
            'INTERNAL_CODEFI_AWS_VAULT',
            'INTERNAL_CLIENT_AZURE_VAULT',
            'INTERNAL_CLIENT_AWS_VAULT',
            'EXTERNAL_CLIENT_METAMASK',
            'EXTERNAL_CLIENT_METAMASK_INSTITUTIONAL',
            'EXTERNAL_OTHER',
          ],
        },
      },
      {
        name: 'metadata',
        type: ['null', 'string'],
        default: null,
      },
      {
        name: 'setAsDefault',
        type: 'boolean',
        default: false,
      },
      {
        name: 'createdBy',
        type: ['null', 'string'],
        default: null,
      },
    ],
  };
}
