
import axios from "axios";
const baseURL = 'http://localhost:5000/api/v1';

export const GET = async (url, headers = {}) => {
    try {
      const res = await axios.get(baseURL + url, {
        headers: {
          ...headers,
        },
        validateStatus: status => {
          return status >= 200;
        },
      });
      return res.data;
    } catch (error) {
      // console.log(error);
      return error;
    }
  };

export const POST = async (url,data={},headers={})=>{
    console.log(baseURL+url);
    try {
       const res = axios.post(baseURL+url,data,{
        headers:{
            ...headers,
        },
        validateStatus:status=>{
            return status>=200;
        }
       }) 
       return res;
    } catch (error) {
        console.log(error);
        
    }
}
export const PUT = async (url,data={},headers={})=>{
    try {
        const res = axios.put(baseURL+url,data,{
            headers:{
                ...headers,
            },
            validateStatus:status=>{
              return status>=200;
          }
        })
        return res;
    } catch (error) {
        console.log(error);
    }
}

export const DELETE = async (url,headers={})=>{
    try {
        const res = axios.delete(baseURL+url,{
            headers:{
                ...headers,
            },
            validateStatus:status=>{
                return status>=200;
            }
        })
        return res;
    } catch (error) {
        console.log(error);
    }
}