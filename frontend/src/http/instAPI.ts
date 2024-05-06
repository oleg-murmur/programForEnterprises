import axios from "axios"

export const getAllInst = async () => {
    let data = await axios.get(`${process.env.REACT_APP_BACKEND_URL_INST_EP}`,{})
    return data
}
export const getInstByID = async (id:any) => {
    let instrumentFromBD = await axios.get(`${process.env.REACT_APP_BACKEND_URL_INST_EP}/${id}`)
    return instrumentFromBD
}

