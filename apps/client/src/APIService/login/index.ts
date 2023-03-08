import { axios } from '@APIService/axios';

async function loginApiCall(body: { email: string; password: string }) {
  const data = await axios.post('/login', body);
  return data.data;
}

export { loginApiCall };
