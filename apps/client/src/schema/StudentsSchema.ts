import { z } from 'zod';

const AddStudentSchema = z.object({
  name: z.string().nonempty(),
  admissionNo: z.string().nonempty(),
  gender: z.enum(['Male', 'Female']),
  dob: z.date(),
  guardianNumber: z.string().optional(),
  classId: z.string().optional(),
  sections: z.array(z.string()),
});

const EditStudentShema = AddStudentSchema.partial();

const DeleteTeacherSchema = z.object({
  teacherId: z.number(),
});

export {
  AddStudentSchema as addStudentSchema,
  DeleteTeacherSchema as deleteTeacherSchema,
  EditStudentShema as editStudentShema,
};
export type IAddStudentSchema = z.infer<typeof AddStudentSchema>;
export type IEditStudentSchema = z.infer<typeof EditStudentShema>;
export type IDeleteStudentSchema = z.infer<typeof DeleteTeacherSchema>;
