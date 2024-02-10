import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import * as chalk from 'chalk'
import * as session from 'express-session'
import { networkInterfaces } from 'os'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  const port = Number(configService.get<number>('PORT')) || 3000

  console.log(session)
  app.use(
    session({
      secret: 'keyboard cat',
      rolling: true,
      name: 'sessionId',
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
      },
      resave: true,
      saveUninitialized: true,
    }),
  )

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
