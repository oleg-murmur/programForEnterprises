import axios from "axios"

export const checkToken = async ({token,email,password}:any) => {
    // localStorage.clear();
    // console.log(localStorage.getItem('token'), 'check token')
    let {data} = await axios.post(`http://localhost:5000/api/user/gt`,{ token: localStorage.getItem('token')?? ''}, {
        // headers: {
        //     'Authorization': `Bearer ${token}`,
        //     'Content-Type': 'application/json',
        //   }
    }) 
    // console.log(data,'data token')
    if(!data) {
        localStorage.removeItem('token');
        return {status: false, data: {}}
    }
 
    return {status: true, data}

}
export const setToken = async ({token = '',email,password}:any) => {
    // localStorage.clear();

    let {data} = await axios.post(`http://localhost:5000/api/user/ut`,{ token: token, email, password}, {
        // headers: {
        //     'Authorization': `Bearer ${token}`,
        //     'Content-Type': 'application/json',
        //   }
    })
    console.log(data, 'new data')

}