import { UUID } from "crypto"
import { MeasuringDevice } from "src/measuring-device/entities/measuring-device.entity"

export class CreateFilesDeviceDto {
    deviceId: string
    files: 
    {
        uid: string
        url: string
        name: string
    }[]
}

export class CreateFilesDeviceForDB {
    device: MeasuringDevice
    deviceId: UUID
    files: 
        {
            uid: UUID
            url: string
            name: string
        }[]
    uid: string
}

export { MeasuringDevice }
