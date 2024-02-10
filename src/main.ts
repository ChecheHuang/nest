import { ConfigService } from '@nestjs/config'
import { NestApplication, NestFactory } from '@nestjs/core'
import * as chalk from 'chalk'
import { networkInterfaces } from 'os'
import { join } from 'path'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule)
  const configService = app.get(ConfigService)
  app.useStaticAssets(join(__dirname, 'images'), {
    prefix: '/images',
  })
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
