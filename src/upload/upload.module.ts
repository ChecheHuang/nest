import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname, join } from 'path'
import { UploadController } from './upload.controller'

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: join(__dirname, '..', 'images'),
        filename: (req, file, cb) => {
          const fileExtName = extname(file.originalname)
          const fileName = `${new Date().getTime()}${fileExtName}`
          console.log(fileName)
          return cb(null, fileName)
        },
      }),
    }),
  ],
  controllers: [UploadController],
})
export class UploadModule {}
