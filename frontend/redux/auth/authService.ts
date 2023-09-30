import axios from "axios";
import {userDataTypes} from '../../types/slices'


const API_URL = 'http://localhost:5000/user';


export const authServiceRegister = async(userData:userDataTypes) =>{
    const response = await axios.post(API_URL, userData);
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    console.log(response)
    return response.data
}

