import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { MeasuringDeviceService } from 'src/measuring-device/measuring-device.service';
import { FilesOfDevicesService } from './file.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid'
import { CreateFilesDeviceDto } from './dto/create-file.dto';

let filesDevice: CreateFilesDeviceDto = {
  deviceId: '',
  files: [],
}

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
            console.log(req.body, 'REQ BODY CHECK')
            let fileName = `id_${req.body.instId}_name_${file.originalname}`
            cb(null,fileName)
            console.log(file, `FILE ${file.originalname}`)
            filesDevice.files.push({
              uid: uuidv4(),
              url: process.env.SERVER_URL ? `${process.env.SERVER_URL}/${fileName}` : `http://localhost:5000/${fileName}`,
              name: fileName,
            })
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
///////////////////////////
      filesDevice.deviceId = body.instId,

      console.log(filesDevice, 'filesOfDevices filesOfDevices')
      this.createFileInfo(filesDevice)
      filesDevice = {
        deviceId: '',
        files: [],
      }

      return response;
    }

    
  @Post('fileInfo')
  async createFileInfo(@Body() fileDto: Partial<CreateFilesDeviceDto>) {
    let deviceInfo
    if(fileDto && fileDto.deviceId){
      deviceInfo = await this.measuringDeviceService.findOne(fileDto.deviceId)
    

    let file = {
      ...fileDto, device: deviceInfo
    }
    
    let files = fileDto.files
    files.forEach(file => {
      this.filesOfDevices.createFileInfo({
        ...file, device: deviceInfo
      });
    });
    console.log(file, 'typeDto this.filesOfDevices.createFileInfo')
  
    return files
  }
  }
  @Get('files/:deviceId')
 async findFilesOfInst(@Param('id') id: string) {
  console.log(id, 'FILE ID')
    return await this.filesOfDevices.findOne(id);
  }

}
