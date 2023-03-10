import type { IAddTeacherSchema, IUpdateTeacherSchema } from '@schema/Teachers';

import { axios } from '@APIService/axios';

async function addTeacher(body: IAddTeacherSchema) {
  const resp = await axios.post('/teachers', body);
  return resp.data;
}

async function getTeachers() {
  const resp = await axios.get('/teachers');
  return resp.data;
}

async function updateTeacherById({
  id,
  data,
}: {
  data: IUpdateTeacherSchema;
  id: number | string;
}) {
  const resp = await axios.patch(`/teachers/${id}`, data);
  return resp.data;
}

async function getTeacherById(id: string | number) {
  const resp = await axios.get(`/teachers/${id}`);
  return resp.data;
}

export { addTeacher, getTeachers, updateTeacherById, getTeacherById };
