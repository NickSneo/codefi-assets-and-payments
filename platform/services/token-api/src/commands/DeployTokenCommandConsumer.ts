import { M2mTokenService } from '@codefi-assets-and-payments/auth'
import { Commands, IDeployTokenCommand } from '@codefi-assets-and-payments/messaging-events'
import { Injectable } from '@nestjs/common'
import { NestJSPinoLogger } from '@codefi-assets-and-payments/observability'
import { NewTokenResponse } from '@codefi-assets-and-payments/ts-types'

import { EventsService } from '../services/EventsService'
import { TokensManagerService } from '../services/TokensManagerService'
import { getGroupId } from '../utils/kafka'
import { TokenCommandConsumer } from './TokenCommandConsumer'

@Injectable()
export class DeployTokenCommandConsumer extends TokenCommandConsumer {
  private tokenManagerService: TokensManagerService

  constructor(
    tokenManagerService: TokensManagerService,
    logger: NestJSPinoLogger,
    m2mTokenService: M2mTokenService,
    eventsService: EventsService,
  ) {
    logger.setContext(DeployTokenCommandConsumer.name)

    super(
      logger,
      m2mTokenService,
      eventsService,
      Commands.tokenDeployCommand.getMessageName(),
      getGroupId(DeployTokenCommandConsumer.name),
    )

    this.tokenManagerService = tokenManagerService
  }

  async onStopListener() {
    this.logger.info(
      { name: DeployTokenCommandConsumer.name },
      'Stopping consumer',
    )
  }

  protected submitTransaction(
    decodedMessage: IDeployTokenCommand,
    authToken: string,
    headers: { [x: string]: string },
  ): Promise<NewTokenResponse> {
    return this.tokenManagerService.deploy(
      { ...decodedMessage, config: decodedMessage.txConfig },
      decodedMessage.tenantId,
      decodedMessage.entityId,
      decodedMessage.subject,
      authToken,
      headers,
    )
  }
}
