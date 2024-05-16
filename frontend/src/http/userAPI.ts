import axios from "axios"

export const getAllInst = async () => {
    let data = await axios.get(`${process.env.REACT_APP_BACKEND_URL_INST_EP}`,{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      })
    return data
}