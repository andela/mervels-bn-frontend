import axios from 'axios';
import { baseURL } from '.';

export default axios.create({ baseURL });


const token = `Bearer ${localStorage.getItem('bareFootToken')}`;
export const config = {
    headers: {
        Authorization: token,
    }
};



