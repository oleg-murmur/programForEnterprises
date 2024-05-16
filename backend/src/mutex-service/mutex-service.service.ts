import { Injectable } from '@nestjs/common';
import { CreateMutexServiceDto } from './dto/create-mutex-service.dto';
import { UpdateMutexServiceDto } from './dto/update-mutex-service.dto';

interface checkToolViewedProps {
  toolId: string
  user?: any
}
interface updateToolViewedProps {
  toolId: string
  user?: any
}
interface setReadStatusProps {
  toolId: string
  user?: any
}



@Injectable()
export class MutexServiceService {
  private toolsInfo: { [key:string]: { viewer: string, timestamp: number,editingTimer: any} } = {
  };

// 
// addToolInfo
// 
// UpdateToolViewed
//
// isToolAvailable
//
// Попробовать перейти в режим редактирования: 1. проверка, доступен ли инструмент для ред.
// Да? Запись в массив Нет? Уведомляем, что нет


// проверить
  checkToolViewed(toolId2: checkToolViewedProps): {text: string, errors: string | null} {

    const inTool = this.isToolAvailable(toolId2.toolId)
    if(!inTool.bool) {
      return {text:'Можно перейти в режим редактирования', errors: null};
    }else{
      return {text:'Сейчас файл редактируем другой', errors: null};
    }
  }

// обновить нахождение в инструменте сотрудником
  UpdateToolViewed(data: updateToolViewedProps): {text: string, errors: string | null} {

    const tool = this.toolsInfo[data.toolId];
    if (tool) {
        if (!tool.editingTimer) {
          console.log('таймер 10 сек _1')
            tool.editingTimer = setTimeout(() => {
              console.log('таймер 5 сек _1')
                tool.editingTimer = setTimeout(() => {
                    this.deleteFromTool(data.toolId);
                    console.log('освобождаем инструмент', data)
                }, 5000);
            }, 10000);
        } else {
            clearTimeout(tool.editingTimer);
            console.log('таймер 10 сек _2')           
            tool.editingTimer = setTimeout(() => {
              console.log('таймер 5 сек _2')
                tool.editingTimer = setTimeout(() => {
                    this.deleteFromTool(data.toolId);
                    console.log('освобождаем инструмент', data)
                }, 5000);
            }, 10000);
        }
        return {text: 'Сервер принял данные, вы в режиме редактирования', errors: null};
    } else {
      return {text: 'вы уже вышли из режима редактирования. Нужно зайти снова', errors: null};
    }
}
// добавить инструмент в массив
  setReadStatus(data: setReadStatusProps): {text: string, bool: boolean} {
    const inTool = !this.toolsInfo[data.toolId]

    if(inTool) {
      this.addToolInfo(data.toolId, 'тестовый юзер')
      this.UpdateToolViewed(data)
      return {text:'перешли в режим редактирования', bool: inTool};
    }else{
      return {text:'сейчас инструмент редактирует другой', bool: inTool};
    }
  }
  // добавить инструмент в массив
  addToolInfo(toolId: string, viewer: string): {text: string, errors: string | null} {
    this.toolsInfo[toolId] = { viewer, timestamp: Date.now(),editingTimer: null };
    return {text: 'тестовый ответ1',errors: null}
  }
  // проверить, что инструмент есть в массиве
  isToolAvailable(toolId: string): {text: string, bool: boolean} {
    // const inTool = !!this.toolsInfo[toolId]; //редактируют другие?
    if(this.toolsInfo.hasOwnProperty(toolId)) { //редактируют другие?
    console.log(this.toolsInfo, 'общий список')
    return {text:'ye', bool: this.toolsInfo.hasOwnProperty(toolId)};
    }
    return {text:'no', bool: this.toolsInfo.hasOwnProperty(toolId)};
  }
  //удалить инструмент из массива
  deleteFromTool(toolId: string): {text: string, deleted: any} {
    const result = delete this.toolsInfo[toolId];
    return {text:'', deleted: result};
  }




  create(createMutexServiceDto: CreateMutexServiceDto) {
    return 'This action adds a new mutexService';
  }

  findAll() {
    return `This action returns all mutexService`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mutexService`;
  }

  update(id: number, updateMutexServiceDto: UpdateMutexServiceDto) {
    return `This action updates a #${id} mutexService`;
  }

  remove(id: number) {
    return `This action removes a #${id} mutexService`;
  }
}