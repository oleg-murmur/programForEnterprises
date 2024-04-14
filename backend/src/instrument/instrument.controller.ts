import { Body, Controller, Get, NestInterceptor, Param, Post, Req, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FormDataRequest, IsFile, MaxFileSize, MemoryStoredFile } from 'nestjs-form-data';

// export class FormDataTestDto {

//   @IsFile()
//   @MaxFileSize(1e6)
//   @HasMimeType(['image/jpeg', 'image/png'])
//   avatar: MemoryStoredFile;
  
// }

@Controller('instrument')
export class InstrumentController {

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

      

  @Post('load')
  @FormDataRequest()
  getHello(@Body() testDto: any): void {
    console.log(testDto, 'TEST');
  }
  // @UseInterceptors(FileInterceptor('files'))
  // uploadFile(@UploadedFiles() files: Array<Express.Multer.File[]>) {

  // @FormDataRequest()
  // async createInst(@Req() request: any): Promise<{}> {

  //   console.log(request.body, 'REQUEST')

  //   return {"request": "good"}
  // }
  
  @Get('test')
  async findAlll(@Req() request: Request): Promise<{}> {
      let inst = {
      date: "2024-04-24",
      name: "параметр 1",
      name1: "параметр 2",
      name2: "параметр 3",
      radio: "no",
      textarea: "произвольный текст",
      "type-instrument": { value: "no_info2", label: "Нет информации123" },
      files: [
        {
          uid: "1",
          name: "00000.txt",
          url: "http://localhost:5000/INSTid_22_name_meter-import-example (1).xlsx"
        },
        {
          uid: "2",
          name: "00000000000.docx",
          url: "http://localhost:5000/INSTid_22_name_meter-import-example (1).xlsx"
        },
        {
          uid: "3",
          name: "11111111111.txt",
          url: "http://localhost:5000/INSTid_22_name_meter-import-example (1).xlsx"
        },
        {
          uid: "4",
          name: "111111111111.docx",
          url: "http://localhost:5000/INSTid_22_name_meter-import-example (1).xlsx"
        },
      ]
    }
    return inst;
  }
    @Get()
    async findAll(@Req() request: Request): Promise<any[]> {
        let inst = [
          {value: '2', label: 2},
          {value: '3', label: 3},
          {value: '4', label: 4},
          {value: '1', label: 1},
          {value: '6', label: 6},
          {value: '7', label: 7},
          {value: '8', label: 8},
          {value: '5', label: 5},
        ]
      return inst;
    }
    // @Get('test/:id')
    // async findOne(@Param() params: any): Promise<any[]> {
    //   return [{"test": "work2"}];
    // }

}