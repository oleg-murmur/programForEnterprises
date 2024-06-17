import axios from "axios"
import {roles} from "../types/MainInterfaces"

export const checkToken = async ({token,email,password}:any) => {
    let {data} = await axios.post(`${process.env.REACT_APP_BACKEND_GET_TOKEN}`,{ token: localStorage.getItem('token')?? ''}, {
    }) 
    if(!data) {
        localStorage.removeItem('token');
        return {status: false, data: {}}
    }
    return {status: true, data}

}

export const setToken = async ({token = '',email,password}:any) => {
    let {data} = await axios.post(`${process.env.REACT_APP_BACKEND_UPDATE_TOKEN}`,{ token: token, email, password}, {
    })
}

export const validateRoleByToken = async (setStatus:any, navigate:any, url = '/auth') => {
    const isValidToken = await checkToken(localStorage.getItem('token')?? '')
        if(isValidToken.status) {
          switch (isValidToken.data.role) {
            case roles.ROLE_ADMIN:
              setStatus(roles.ROLE_ADMIN)
              break;
            case roles.ROLE_EDITOR:
              setStatus(roles.ROLE_EDITOR)
              break;
            case roles.ROLE_BASE:
              setStatus(roles.ROLE_BASE)
              break;
            default:
              setStatus(roles.ROLE_BASE)
          }
        }else{
            localStorage.clear()
            navigate(url ?? '/auth')
          }
    }