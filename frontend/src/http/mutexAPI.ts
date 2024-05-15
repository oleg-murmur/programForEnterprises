import axios from "axios"

export const checkTool = async (toolId: string, user: {}) => {
    let data = await axios.get(`${process.env.REACT_APP_BACKEND_MUTEX_CHECK}/${toolId}`,{
        data: {
            toolId, user
        }
    })
    return data
}

export const updateTool = async (toolId: string, user: {}) => {
    let data = await axios.post(`${process.env.REACT_APP_BACKEND_MUTEX_UPDATE}`,{
        data: {
            toolId, user
        }
    })
    return data
}

export const setTool = async (toolId: string) => {
    let data = await axios.post(`${process.env.REACT_APP_BACKEND_MUTEX_SET}`,{
        data: {
            toolId
        }
    })
    return data
}