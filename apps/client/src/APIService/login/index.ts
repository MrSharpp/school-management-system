import { axios } from '@APIService/axios';

async function login(body: { email: string; password: string }) {
  const data = await axios.post('/login', body);
  return data.data;
}

export { login };
