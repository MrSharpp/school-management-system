import { axios } from '@APIService/axios';

async function getStudents() {
  return axios.get('/students').then((res) => res.data.student);
}

export { getStudents };
