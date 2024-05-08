import axios from "axios"

export const getAllInst = async () => {
    let data = await axios.get(`${process.env.REACT_APP_BACKEND_URL_INST_EP}`,{})
    return data
}
export const getInstByID = async (id:any) => {
    let instrumentFromBD = await axios.get(`${process.env.REACT_APP_BACKEND_URL_INST_EP}/${id}`)
    return instrumentFromBD
}
export const deleteByID = async (id:any) => {
    let instrumentFromBD = await axios.delete(`${process.env.REACT_APP_BACKEND_URL_INST_EP}/${id}`)
    return instrumentFromBD
}
export const filterDateOfIssue = async ({from, to}:any) => {
    let data = await axios.get(`${process.env.REACT_APP_BACKEND_FILTER_DATE_OF_ISSUE}`,{
        params: { 
            from, to
        }
    })
    return data
}
export const filterVerificationEndDate = async ({from, to}:any) => {
    let data = await axios.get(`${process.env.REACT_APP_BACKEND_FILTER_END_DATE}`,{
        params: { 
            from, to
        }
    })
    return data
}

