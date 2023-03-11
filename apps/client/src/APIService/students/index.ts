import { axios } from '@APIService/axios';
import { IAddStudentSchema } from '@schema/StudentsSchema';
import { IUpdateTeacherSchema } from '@schema/Teachers';

async function getStudents() {
  return axios.get('/students').then((res) => res.data.student);
}

async function addStudent(body: IAddStudentSchema) {
  return axios.post('/students', body).then((res) => res.data);
}

async function updateStudent({
  data,
  id,
}: {
  data: IUpdateTeacherSchema;
  id: number | string;
}) {
  return axios.patch(`/students/${id}`, data).then((res) => res.data);
}

async function deleteTeacherById(teacherId: number) {
  return axios.delete(`/students/${teacherId}`).then((res) => res.data);
}

export { getStudents, addStudent, updateStudent };
