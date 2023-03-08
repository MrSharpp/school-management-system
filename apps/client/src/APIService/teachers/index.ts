import type { IAddTeacherSchema } from '@schema/AddTeacherSchema';
import { axios } from '@APIService/axios';

async function addTeacherApiCall(body: IAddTeacherSchema) {
  const data = await axios.post('/teachers', body);
  return data.data;
}

export { addTeacherApiCall };
