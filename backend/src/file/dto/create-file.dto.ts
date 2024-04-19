import { MeasuringDevice } from "src/measuring-device/entities/measuring-device.entity"

export class CreateFilesDeviceDto {
    device: MeasuringDevice
    deviceId: string
    files: 
        {
            device: MeasuringDevice
            uid: string
            url: string
            name: string
            deviceId: string
        }[]
}

export { MeasuringDevice }
