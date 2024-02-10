import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import * as chalk from 'chalk'
import { NextFunction, Request, Response } from 'express'
import { networkInterfaces } from 'os'
import { AppModule } from './app.module'

const whiteList = ['/users']
function middlewareAll(req: Request, res: Response, next: NextFunction) {
  if (whiteList.includes(req.originalUrl)) {
    console.log(req.originalUrl)
  }
  next()
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(middlewareAll)

  const configService = app.get(ConfigService)
  const port = Number(configService.get<number>('PORT')) || 3000
  await app.listen(port)
  const interfaces = networkInterfaces()
  const addresses = Object.values(interfaces)
    .flat()
    .filter((iface) => iface.family === 'IPv4' && !iface.internal)
    .map((iface) => iface.address)
  const SERVER_ADDRESS = `http://${addresses[0]}:${port}`
  console.log(chalk.yellowBright(`😼[server] :${SERVER_ADDRESS}`))
}
bootstrap()
