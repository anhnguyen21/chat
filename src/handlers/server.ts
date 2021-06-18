import { APIGatewayProxyHandler, Context, APIGatewayEvent } from 'aws-lambda'
import { Server } from 'http'
import * as express from 'express'
import { ExpressAdapter } from '@nestjs/platform-express'
import { NestFactory } from '@nestjs/core'
import { AppModule } from '../main/app.module'
import { eventContext } from 'aws-serverless-express/middleware'
import { createServer, proxy } from 'aws-serverless-express'
import { setupSwagger } from '../shared/swagger'
import { Database } from '../db/database'

const binaryMimeTypes: string[] = []
let cachedServer: Server

const bootstrapServer = async () => {
  if (!cachedServer) {
    try {
      const expressApp = express()
      const adapter = new ExpressAdapter(expressApp)

      const nestApp = await NestFactory.create(AppModule, adapter)
      nestApp.use(eventContext())
      setupSwagger(nestApp)
      await nestApp.init()
      nestApp.enableCors()
      cachedServer = createServer(expressApp, undefined, binaryMimeTypes)

      const connectionDb = new Database()
      const connection = await connectionDb.getConnection()
      await connection.runMigrations({ transaction: 'all' })
    } catch (error) {
      return Promise.reject(error)
    }
  }
  return cachedServer
}

export const handler: APIGatewayProxyHandler = async (event: APIGatewayEvent, context: Context) => {
  event.path === '/documentation' ? (event.path = '/documentation/') : event.path
  event.path = event.path.includes('swagger-ui') ? `/documentation${event.path}` : event.path
  cachedServer = await bootstrapServer()

  return proxy(cachedServer, event, context, 'PROMISE').promise
}
