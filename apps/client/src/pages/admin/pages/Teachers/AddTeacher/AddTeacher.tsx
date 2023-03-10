import {
  Paper,
  Container,
  Title,
  Box,
  Button,
  Stack,
  PasswordInput,
  NumberInput,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { TextInput$, Select$ } from 'ui';
import { z } from 'zod';
import AddTeachersSchema from '@schema/Teachers/AddTeacherSchema';
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
      phoneNo: '',
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
    <Container fluid pt={0} pl={0}>
      <Paper p="md">
        <Title order={3}> Add New Teacher </Title>

        <Box
          component="form"
          onSubmit={form.onSubmit((val) => {
            val.phoneNo = String(val.phoneNo);
            addTeacherMutation.mutate(val);
          })}
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

              <NumberInput
                {...form.getInputProps('phoneNo')}
                withAsterisk
                label="Phone Number"
                placeholder="00000-00000"
                disabled={addTeacherMutation.isLoading}
                hideControls
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
