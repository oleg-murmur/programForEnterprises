import axios from "axios"

interface FiltersParams {
  page?: number;

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
//sorterVerificationEndDate
//sorterDateOfIssue
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
  console.log(page,'page')
  let test = `Bearer ${localStorage.getItem('token')}`
  console.log('BEARER', test)
  // console.log(PAGE_SIZE,'page_size')
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
  console.log(filters,'page')
  let test = `Bearer ${localStorage.getItem('token')}`
  // console.log('BEARER', test)
  // console.log(PAGE_SIZE,'page_size')
  const {data} = await axios.get(`${process.env.REACT_APP_BACKEND_UNVERSAL_FILTER}`, {params: {
    ...filters
    //sorterVerificationEndDate
//sorterDateOfIssue
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

