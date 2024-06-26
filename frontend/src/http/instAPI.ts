import axios from "axios"

interface FiltersParams {
  page?: number;
  deviceName?: string;
  deviceModel?: string;
  DOI_to?: string;
  DOI_from?: string;

  VED_from?: string;
  VED_to?: string;
  
  inventoryName?: string;
  factoryNumber?: string;
  userName?: string;
  note?: string;
  haveMetal?: 'Нет' | 'Нет информации' | 'Да';
  deviceType?: number
  orderDateOfIssue?: 'ESC' | 'DESC';
  verificationEndDate?: 'ESC' | 'DESC';
  sorterVerificationEndDate?: 'ESC' | 'DESC';
  sorterDateOfIssue?: 'ESC' | 'DESC';
}


const PAGE_SIZE = 10
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
export const getAllInstFilter = async (page: any) => {
  const {data} = await axios.get(`${process.env.REACT_APP_BACKEND_URL_INST_EP}`, {params: {
    skip: page, take: PAGE_SIZE
  },
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  },})
    return data
} 
export const universalFilter = async (filters: FiltersParams) => {
  const {data} = await axios.get(`${process.env.REACT_APP_BACKEND_UNVERSAL_FILTER}`, {params: {
    ...filters
  },
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  },})
    return data
}
export const deleteByID = async (id:any) => {
  let data
  try {
    data = await axios.delete(`${process.env.REACT_APP_BACKEND_URL_INST_EP}/${id}`,{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })    
  } catch (error) {
    console.log(error)
  }
    return data
}
export const filterDateOfIssue = async ({from, to,page}:any) => {
    let data = await axios.get(`${process.env.REACT_APP_BACKEND_FILTER_DATE_OF_ISSUE}`,{
        params: { 
          DOI_from: from, DOI_to: to, page
        },
        headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },       
    })
    return data
}
export const filterVerificationEndDate = async ({from, to,page}:any) => {
    let data = await axios.get(`${process.env.REACT_APP_BACKEND_FILTER_END_DATE}`,{
        params: { 
          VED_from: from, VED_to: to, page
        },
        headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
    })
    return data
}



