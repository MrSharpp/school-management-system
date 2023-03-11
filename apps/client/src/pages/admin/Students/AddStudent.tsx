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

const AddStudent = () => {
  const navigate = useNavigate();

  const form = useForm<IAddStudentSchema>({
    validate: zodResolver(addStudentSchema),

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

      <Paper>
        <Box
          component="form"
          onSubmit={form.onSubmit(val => {
            val.guardianNumber = String(val.guardianNumber);
            addStudentMutation.mutate(val);
          })}
        >
          <Paper p="md">
            <Stack>
              <TextInput$
                {...form.getInputProps('name')}
                withAsterisk
                label="Student Name"
                placeholder="John Doe"
                disabled={addStudentMutation.isLoading}
              />

              <TextInput$
                {...form.getInputProps('admissionNo')}
                withAsterisk
                label="Admission Number"
                placeholder="Number"
                disabled={addStudentMutation.isLoading}
              />

              <DateInput$
                {...form.getInputProps('dob')}
                withAsterisk
                label="Date Of Birth"
                placeholder="Date"
                disabled={addStudentMutation.isLoading}
              />

              <TextInput$
                {...form.getInputProps('guardianNumber')}
                withAsterisk
                label="Guardian Number"
                placeholder="Phone Number"
                disabled={addStudentMutation.isLoading}
              />

              <Select$
                {...form.getInputProps('gender')}
                withAsterisk
                label="Gender"
                data={['Male', 'Female']}
                disabled={addStudentMutation.isLoading}
              />
            </Stack>

            <Button
              mt="md"
              type="submit"
              loading={addStudentMutation.isLoading}
            >
              Save
            </Button>
          </Paper>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddStudent;
