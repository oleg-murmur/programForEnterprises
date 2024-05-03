import axios from "axios"

export const getAllInst = async () => {
    let data = await axios.get("http://localhost:5000/api/measuring-device/",{})
    return data
}
export const getInstByID = async (id:string) => {
    let instrumentFromBD = await axios.get(`http://localhost:5000/api/measuring-device/${id}`)
    return instrumentFromBD
}

