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
export const getInstByID = async (id:any) => {
    let instrumentFromBD = await axios.get(`${process.env.REACT_APP_BACKEND_URL_INST_EP}/${id}`,{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      })
    return instrumentFromBD
}
export const getAllInstFilter = async (page: any,page_size: any) => {
  console.log(page,'page')
  let test = `Bearer ${localStorage.getItem('token')}`
  console.log('BEARER', test)
  console.log(page_size,'page_size')
  const {data} = await axios.get(`${process.env.REACT_APP_BACKEND_URL_INST_EP}`, {params: {
    skip: page, take: page_size
  },
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  },})
    return data
}
export const deleteByID = async (id:any) => {
    let instrumentFromBD = await axios.delete(`${process.env.REACT_APP_BACKEND_URL_INST_EP}/${id}`,{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      })
    return instrumentFromBD
}
export const filterDateOfIssue = async ({from, to}:any) => {
    let data = await axios.get(`${process.env.REACT_APP_BACKEND_FILTER_DATE_OF_ISSUE}`,{
        params: { 
            from, to
        },
        headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },       
    })
    return data
}
export const filterVerificationEndDate = async ({from, to}:any) => {
    let data = await axios.get(`${process.env.REACT_APP_BACKEND_FILTER_END_DATE}`,{
        params: { 
            from, to
        },
        headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
    })
    return data
}

