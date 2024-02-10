import {
  Controller,
  Get,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { zip } from 'compressing'
import { Response } from 'express'
import { join } from 'path'

@Controller('upload')
export class UploadController {
  @Post('album')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File) {
    console.log(file ? file.originalname : 'no file')
    return 'test'
  }

  @Get('downLoad')
  downLoad(@Res() res: Response) {
    const url = join(__dirname, '../images/1707590610419.jpeg')
    res.download(url)
    // window.open(url)
  }

  @Get('stream')
  async down(@Res() res: Response) {
    const url = join(__dirname, '../images/1707590610419.jpeg')
    const tarStream = new zip.Stream()
    await tarStream.addEntry(url)
    res.setHeader('Content-Type', 'application/octet-stream')
    res.setHeader('Content-Disposition', 'attachment; filename=aaa.zip')

    tarStream.pipe(res)

    /*前端下載
    function downLoad(url:string){
      const res = await fetch(url).then(res=>res.arrayBuffer())
      const blob = new Blob([res])
      const Url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = Url;
      a.download = 'aaa.zip';
    }
    */
  }
}
