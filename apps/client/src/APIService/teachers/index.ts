import type { IAddTeacherSchema } from '@schema/AddTeacherSchema';
import { axios } from '@APIService/axios';

async function addTeacher(body: IAddTeacherSchema) {
  const data = await axios.post('/teachers', body);
  return data.data;
}

async function getTeachers() {
  const data = await axios.get('/teachers');
  return data.data;
}

export { addTeacher, getTeachers };
