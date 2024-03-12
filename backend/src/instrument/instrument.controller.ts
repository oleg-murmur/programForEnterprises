import { Controller, Get, Param, Req } from '@nestjs/common';

@Controller('instrument')
export class InstrumentController {
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
    @Get(':id')
    async findOne(@Param() params: any): Promise<any[]> {
      return [{"test": "work1"}];
    }

}