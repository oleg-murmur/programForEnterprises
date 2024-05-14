import axios from "axios"

export const setTool = async (toolId: string, user: {}) => {
    let data = await axios.post(`${process.env.REACT_APP_BACKEND_MUTEX_CHECK}/${toolId}`,{
        data: {
            toolId, user
        }
    })
    return data
}

export const updateTool = async (toolId: string, user: {}) => {
    let data = await axios.post(`${process.env.REACT_APP_BACKEND_MUTEX_UPDATE}/${toolId}`,{
        data: {
            toolId, user
        }
    })
    return data
}

export const checkTool = async (toolId: string) => {
    let data = await axios.get(`${process.env.REACT_APP_BACKEND_MUTEX_SET}/${toolId}`,{})
    return data
}