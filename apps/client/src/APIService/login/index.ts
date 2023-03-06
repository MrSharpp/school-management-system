import axios from 'axios';
import Config from 'src/Config';

async function loginApiCall(body: { email: string; password: string }) {
  const data = await axios.post(Config.baseURL + '/login', body);
  return data.data;
}

export { loginApiCall };
