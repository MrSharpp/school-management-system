import { axios } from '@APIService/axios';
import { z } from 'zod';

const addClassSchema = z.object({
  className: z.string().nonempty(),
  sections: z.array(z.string()),
});

const deleteClassSchema = z.object({
  classId: z.string().transform(val => parseInt(val)),
});

const editClassSchema = z.object({
  className: z.string().optional(),
  sections: z.array(z.string()),
});

type IAddClassType = z.infer<typeof addClassSchema>;
type IDeleteClassType = z.infer<typeof deleteClassSchema>;
type IEditClassSchema = z.infer<typeof editClassSchema>;

function getClasses() {
  return axios.get('/classes').then(res => res.data);
}

function addClass({ body }: { body: IAddClassType }) {
  console.log(body);
  
  return axios.post('/classes', body);
}

function editClass({
  body,
  id,
}: {
  body: IEditClassSchema;
  id: number | string;
}) {
  console.log(body, id);
  
  return axios.patch(`/classes/${id}`, body).then(res => res.data);
}

function getStudentsById({
  classId,
  sectionName,
}: {
  classId: string | number;
  sectionName: string;
}) {
  return axios.get(`/classes/${classId}/${sectionName}`).then(res => res.data);
}

async function deleteClass({ id }: { id: string | number }) {
  return axios.delete(`/classes/${id}`).then(res => res.data);
}

export { getClasses, addClass, editClass, getStudentsById, deleteClass };
export { addClassSchema, editClassSchema };
export type { IAddClassType, IEditClassSchema };
