import React from 'react';
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
import { createObservableHook } from '@legendapp/state/react-hooks/createObservableHook';
import { useMutation } from '@tanstack/react-query';
import { loginApiCall } from '@APIService/login';
import { useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { AxiosError } from 'axios';
import { addTeacherApiCall } from '@APIService/teachers';

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
    mutationFn: addTeacherApiCall,

    onError(error: AxiosError, variables, context) {
      notifications.show({
        title: 'Error',
        message: 'OOPS! an unezpected error ocoured while creating teacher',
        color: 'red',
      });
    },

    onSuccess(data, variables, context) {
      localStorage.setItem('token', data.token);
      notifications.show({
        title: 'Success',
        message: 'Teacher sucessfully created',
      });
      navigate('/teachers');
    },
  });

  return (
    <Container fluid pt={0} pl={0}>
      <Paper p="md">
        <Title order={3}> Add New Teacher </Title>

        <Box
          component="form"
          onSubmit={form.onSubmit((val) => addTeacherMutation.mutate(val))}
        >
          <Paper p="md">
            <Stack>
              <TextInput$
                {...form.getInputProps('name')}
                withAsterisk
                label="Name"
                placeholder="John Doe"
                disabled={addTeacherMutation.isLoading}
              />

              <TextInput$
                {...form.getInputProps('email')}
                withAsterisk
                label="Email"
                placeholder="abc@gmail.com"
                disabled={addTeacherMutation.isLoading}
              />

              <PasswordInput
                {...form.getInputProps('password')}
                withAsterisk
                label="Passowrd"
                placeholder="****"
                disabled={addTeacherMutation.isLoading}
              />

              <Select$
                {...form.getInputProps('gender')}
                withAsterisk
                label="Gender"
                data={['Male', 'Female']}
                disabled={addTeacherMutation.isLoading}
              />
            </Stack>

            <Button
              mt="md"
              type="submit"
              loading={addTeacherMutation.isLoading}
            >
              Save
            </Button>
          </Paper>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddTeacher;
