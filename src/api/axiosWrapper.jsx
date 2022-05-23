import { toast } from 'react-toastify';
import statusMessage from './status';

import Http from './axios';

const httpWrapper = async ({
  method = 'get',
  url,
  status,
  payload,
  message,
  cancelToken,
}) => {
  try {
    const response = await Http[method](url, payload, cancelToken);
    if (status === 'success') toast.success(message || statusMessage(response)?.success);
    return response.data;
  } catch (error) {
    toast.error(statusMessage(error)?.error);
    Promise.reject(error);
    return null;
  }
};
export default httpWrapper;
