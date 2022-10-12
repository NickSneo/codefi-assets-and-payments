import { NestFactory } from '@nestjs/core'
import { nestjsLogger } from '@codefi-assets-and-payments/observability'
import { AppModule } from './modules/AppModule'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import * as docsOverrides from './utils/docs-override.json'
import { writeFileSync } from 'fs'
import config from './config'
import { INestApplication } from '@nestjs/common'

let context: INestApplication = null
export const ApplicationContext = async (module = AppModule) => {
  if (!context) {
    context = await NestFactory.create(module, {
      logger: nestjsLogger(),
    })

    const options = new DocumentBuilder()
      .setTitle("Codefi's Entity API")
      .setDescription('## Component Overview\n\nThis is Entity API.')
      .setVersion('v0.1.0')
      .addTag('Other', 'System Health Endpoints.')
      .addTag('Entity', 'Entity Endpoints.')
      .addOAuth2()
      .setContact(
        'ConsenSys Codefi',
        'https://codefi.consensys.net',
        'codefi-api@consensys.net',
      )
      .addServer(
        `http://localhost:${config().serverPort}/`,
        "Codefi's Entity Server",
      )
      .build()
    const document = SwaggerModule.createDocument(context, options)
    if (config().docs.enableSwagger) {
      SwaggerModule.setup('docs', context, document)
    }
    // Whether to export an Open API spec file to disk for generation of a docs site
    if (config().docs.exportDocs) {
      // Now inject static info that Nest doesn't/can't autogenerate.
      // These extensions are added to enrich the generated redoc site with more content, more info here: https://github.com/Redocly/redoc#swagger-vendor-extensions
      Object.assign(document.info, docsOverrides.info)
      Object.assign(document.components, docsOverrides.components)
      // Use tag groups to group your API sections. Entity in admin-api.
      // document['x-tagGroups'] = docsOverrides['x-tagGroups']

      writeFileSync('./api-spec.json', JSON.stringify(document))
    }
    return context
  }
}
