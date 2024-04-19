import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { UpdateFileDto } from './dto/update-file.dto';
import { MeasuringDeviceService } from 'src/measuring-device/measuring-device.service';
import { CreateFilesDeviceDto } from 'src/measuring-device/dto/create-measuring-device.dto';
import { FilesOfDevicesService } from './file.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('file')
export class FileController {
  constructor(private readonly measuringDeviceService: MeasuringDeviceService,
    private readonly filesOfDevices: FilesOfDevicesService
  ) {}
  @Post('upload')
  @UseInterceptors(
      FilesInterceptor('files', 20, {
        storage: diskStorage({
          destination: './uploads/',
          filename: (req,file,cb)=> {
            cb(null,`instId__${req.body.instId}_name__${file.originalname}`)
            console.log(file, `FILE ${file.originalname}`)

          },
        }),

      }),
    )
    uploadMultipleFiles(@UploadedFiles() files, @Body() body) {
      const response = [];
      console.log(body.instId, 'instId')
      console.log(files, 'files')
      files.forEach(file => {
        const fileReponse = {
          filename: file.filename,
        };
        response.push(fileReponse);
      });
      return response;
    }

    
  @Post('fileInfo')
  async createFileInfo(@Body() fileDto: Partial<CreateFilesDeviceDto>) {

    let deviceInfo = await this.measuringDeviceService.findOne(fileDto.deviceId)

    let file = {
      ...fileDto, device: deviceInfo
    }
    let files = fileDto.files
    files.forEach(file => {
      this.filesOfDevices.createFileInfo({
        ...file, device: deviceInfo
      });
    });
    console.log(file, 'typeDto')

    return this.filesOfDevices.createFileInfo(file);
  }
  @Get('files/:deviceId')
 async findFilesOfInst(@Param('id') id: string) {
    return await this.filesOfDevices.findOne(id);
  }

}
