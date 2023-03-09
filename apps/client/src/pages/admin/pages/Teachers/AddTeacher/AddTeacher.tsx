import {
  Paper,
  Container,
  Title,
  Box,
  Button,
  Stack,
  PasswordInput,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { TextInput$, Select$ } from 'ui';
import { z } from 'zod';
import AddTeachersSchema from '@schema/AddTeacherSchema';
import { useMutation } from '@tanstack/react-query';
import ApiCalls from '@APIService/index';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import TeacherForm from '../TeacherForm';

type IForm = z.infer<typeof AddTeachersSchema>;

const AddTeacher = () => {
  const navigate = useNavigate();

  const form = useForm<IForm>({
    validate: zodResolver(AddTeachersSchema),

    initialValues: {
      name: '',
      email: '',
      password: '',
      gender: 'Male',
    },
  });

  const addTeacherMutation = useMutation({
    mutationFn: ApiCalls.addTeacher,

    onError(error: AxiosError, variables, context) {
      notifications.show({
        title: 'Error',
        message: 'OOPS! an unexpected error ocoured while creating teacher',
        color: 'red',
      });
    },

    onSuccess(data, variables, context) {
      notifications.show({
        title: 'Success',
        message: 'Teacher sucessfully created',
      });

      navigate('/teachers');
    },
  });

  return (
    <TeacherForm
      form={form}
      onSubmit={(val: IForm) => addTeacherMutation.mutate(val)}
      type="add"
      isLoading={addTeacherMutation.isLoading}
    />
  );
};

export default AddTeacher;
