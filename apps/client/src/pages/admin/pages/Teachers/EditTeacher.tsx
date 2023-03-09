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
import { useObservableQuery } from '@legendapp/state/react-hooks/useObservableQuery';

import TeacherForm from './TeacherForm';

type IForm = z.infer<typeof AddTeachersSchema>;

const EditTeacher = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const getTeachersQuery = useObservableQuery({
    queryKey: [`get_teacher`, params.id],
    queryFn: () => ApiCalls.getTeacherById(params.teacherId),

    onSuccess(data) {
        console.log(data)
    //   form.setValues({
    //     name: data.User.name,
    //     email: data.User.email,
    //     password: '',
    //     gender: data.gender,
    //   });
    },
  });

  const form = useForm<IForm>({
    validate: zodResolver(AddTeachersSchema),

    initialValues: {
      name: '',
      email: '',
      password: '',
      gender: 'Male',
    },
  });

  const editTeacherMutation = useMutation({
    mutationFn: ApiCalls.editTeachers,

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
        message: 'Teacher sucessfully edited',
      });

      navigate('/teachers');
    },
  });

  useEffect(() => {
    const data = location.state?.data;

    if (data) {
      form.setValues({
        name: data.User.name,
        email: data.User.email,
        password: '',
        gender: data.gender,
      });
    }
  }, [location.state]);

  return (
    <TeacherForm
      form={form}
      onSubmit={(val: IForm) =>
        editTeacherMutation.mutate({ data: val, id: params.id })
      }
      type="edit"
      isLoading={editTeacherMutation.isLoading}
    />
  );
};

export default EditTeacher;
