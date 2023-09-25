import axios from 'axios';
import { formatString } from '../utils/helpers';
import { apiEndpoints } from '../utils/constants';
import { APIResponse } from '../utils/interfaces';

const token = 'fdksalerikfdsli373kefsk';

const apiServices = {
    async getComics(): Promise<APIResponse> {
        try {
            const endPoint = formatString(apiEndpoints.COMICS_LIST, token);
            const { data } = await axios.get(endPoint);
            return data;
        } catch (error: any) {
            throw new Error(error.message || 'Unable to connect to the api');
        }
    }
};

export default apiServices;
