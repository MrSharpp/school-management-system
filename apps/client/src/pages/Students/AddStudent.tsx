import {
  Paper,
  Container,
  Title,
  Box,
  Button,
  Stack,
  PasswordInput,
  NumberInput,
  Grid,
  Flex,
  Breadcrumbs,
  Anchor,
  SimpleGrid,
  FileInput,
  Avatar,
  Text,
  Divider,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { TextInput$, Select$, DateInput$ } from 'ui';
import { z } from 'zod';
import AddTeachersSchema from '@schema/Teachers/AddTeacherSchema';
import { useMutation } from '@tanstack/react-query';
import ApiCalls from '@APIService/index';
import { useNavigate, useLocation, useParams, Link } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { addStudentSchema, IAddStudentSchema } from '@schema/StudentsSchema';
import { StudentForm } from './StudentForm';

const AddStudent = () => {
  const navigate = useNavigate();

  const form = useForm<Omit<IAddStudentSchema, 'sections'>>({
    validate: zodResolver(addStudentSchema.partial({ sections: true })),

    initialValues: {
      name: '',
      admissionNo: '',
      dob: new Date(),
      guardianNumber: '',
      gender: 'Male',
    },
  });

  const addStudentMutation = useMutation({
    mutationFn: ApiCalls.addStudent,

    onError(error: AxiosError, variables, context) {
      notifications.show({
        title: 'Error',
        message: 'OOPS! an unexpected error ocoured while creating student',
        color: 'red',
      });
    },

    onSuccess(data, variables, context) {
      notifications.show({
        title: 'Success',
        message: 'Student sucessfully created',
      });

      navigate('/students');
    },
  });

  const items = [
    { title: 'Admin', href: '/' },
    { title: 'Students', href: '/students' },
    { title: 'Add Student', href: '/students/new' },
  ].map((item, index) =>
    <Anchor component={Link} to={item.href} key={index}>
      {item.title}
    </Anchor>
  );

  console.log(form.errors);

  return (
    <Container fluid pt={0}>
      <Grid align="center" mb="md">
        <Grid.Col>
          <Flex justify={'space-between'} sx={{ alignItems: 'center' }}>
            <div>
              <Breadcrumbs separator="/" mt="xs">
                {items}
              </Breadcrumbs>

              <Title mt={4} color={'#495057'}>
                Add Student
              </Title>
            </div>
          </Flex>
        </Grid.Col>
      </Grid>

      <StudentForm
        form={form}
        onSubmit={form.onSubmit(() => console.log('hello'))}
        type={undefined}
        isLoading={addStudentMutation.isLoading}
      />
    </Container>
  );
};

export default AddStudent;
