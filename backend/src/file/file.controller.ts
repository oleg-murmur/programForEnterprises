import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { MeasuringDeviceService } from 'src/measuring-device/measuring-device.service';
import { FilesOfDevicesService } from './file.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid'
import { CreateFilesDeviceDto } from './dto/create-file.dto';
import { Public } from 'src/auth/constants';

@Controller('file')
export class FileController {
  constructor(private readonly measuringDeviceService: MeasuringDeviceService,
    private readonly filesOfDevices: FilesOfDevicesService,
    private filesDevice: CreateFilesDeviceDto
  ) {}
  @Public()
  @Post('upload')
  @UseInterceptors(
      FilesInterceptor('files', 20, {
        storage: diskStorage({
          destination: './uploads/',
          filename: (req,file,cb)=> {
            let fileName = `id_${req.body.instId}_name_${file.originalname}`
            cb(null,fileName)
          },
        }),
      }),
    )
    async upload(@UploadedFiles() files:any, @Body() body:any) {
      this.filesDevice = {
        deviceId: '',
        files: [],
      }
      const response = [];
      this.filesDevice.deviceId = body.instId ?? null
      if(files && files.length >=0) {
      files.map(file => {
        let fileName = `id_${body.instId}_name_${file.originalname}`
        this.filesDevice.files.push({
          uid: uuidv4(),
          url: process.env.SERVER_URL ? `${process.env.SERVER_URL}/${fileName}` : `http://localhost:${process.env.PORT}/${fileName}`,
          name: fileName,
        })
        const fileReponse = {
          filename: file.filename,
        };
        response.push(fileReponse);
      })
    }

///////////////////////////
      this.createFileInfo(this.filesDevice)
      this.filesDevice = {
        deviceId: '',
        files: [],
      }
      return response;
    }
    // async createFileInfo2(@Body() fileDto: Partial<CreateFilesDeviceDto>) {}
//     uploadMultipleFiles(@UploadedFiles() files, @Body() body) {
//       const response = [];
//       files.forEach(file => {
//         const fileReponse = {
//           filename: file.filename,
//         };
//         response.push(fileReponse);
//       });
// ///////////////////////////
//       filesDevice.deviceId = body.instId,

//       console.log(filesDevice, 'filesOfDevices filesOfDevices')
//       this.createFileInfo(filesDevice)
//       filesDevice = {
//         deviceId: '',
//         files: [],
//       }

//       return response;
//     }


@Public()  
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

  @Post('deleteInfo')
  async deleteFileInfo(@Body() fileDtoMassive: any){
    console.log(fileDtoMassive,'fileDtoMassivefileDtoMassivefileDtoMassive')
    let devicesInfo = []
//     fileDtoMassive.files.forEach(async (fileDto) => {
//     if(fileDto && fileDto.deviceId){
//       const result = await this.filesOfDevices.delete(fileDto.uid)
//       devicesInfo.push(result)
//   }
// })
try {
  const filesToDelete = await this.filesOfDevices.delete(fileDtoMassive.files)
  return filesToDelete
} catch (error) {
  return error
}
  }

  @Public()
  @Get('files/:deviceId')
 async findFilesOfInst(@Param('id') id: string) {
  console.log(id, 'FILE ID')
    return await this.filesOfDevices.findOne(id);
  }

}
