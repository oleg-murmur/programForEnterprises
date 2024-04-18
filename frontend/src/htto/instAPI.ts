import axios from "axios"





export const getAllInst = async () => {
    let data = await axios.get("http://localhost:5000/api/measuring-device/",{})
    console.log(data)
}
export const getInstByID = async (id:string) => {
    let instrumentFromBD = await axios.get(`http://localhost:5000/api/measuring-device/${id}`)
    console.log(instrumentFromBD.data, 'inst')
    return instrumentFromBD
}

    // @Generated("uuid")
    // id: string;

    // //инвантарный номер
    // inventoryName: string

    // //заводской номер
    // factoryNumber: string

    // //пользователь прибора
    // userName: string // кто отвечает за прибор (отдельная сущность?)

    // dateOfIssue: Date; // Дата выпуска

    // note: string; // Примечание

    // verificationEndDate: Date; // Дата окончания поверки

    // //наличие драг. металлов
    // haveMetal: 'yes' | 'no_info' | 'no'
    
    // type: number; // Тип измерительного прибора


