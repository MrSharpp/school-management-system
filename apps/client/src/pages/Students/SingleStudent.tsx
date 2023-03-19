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

const SingleStudent = () => {
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
                Student Detail
              </Title>
            </div>
          </Flex>
        </Grid.Col>
      </Grid>

      <Box
        component="form"
        onSubmit={form.onSubmit(val => {
          val.guardianNumber = String(val.guardianNumber);
          addStudentMutation.mutate(val);
        })}
      >
        <Grid>
          <Grid.Col span={3}>
            <Paper
              radius="md"
              withBorder
              p="lg"
              sx={theme => ({
                backgroundColor:
                  theme.colorScheme === 'dark'
                    ? theme.colors.dark[8]
                    : theme.white,
              })}
            >
              <Avatar size={250} radius={120} mx="auto" />
              <FileInput
                mt={'xl'}
                placeholder="Student Image"
                withAsterisk
                {...form.getInputProps('photo')}
                variant={'filled'}
                disabled
              />
            </Paper>
          </Grid.Col>
          <Grid.Col span={9}>
            <Paper p="md" shadow={'xs'}>
              <Title color={'#343A40'} order={4} mb="sm">
                Required Informations
              </Title>
              <Divider my="sm" />
              <SimpleGrid cols={3}>
                <TextInput$
                  {...form.getInputProps('name')}
                  withAsterisk
                  label="Student Name"
                  placeholder="John Doe"
                  disabled={true}
                  variant={'filled'}
                />

                <TextInput$
                  {...form.getInputProps('admissionNo')}
                  withAsterisk
                  label="Admission Number"
                  placeholder="Number"
                  disabled={true}
                  variant={'filled'}
                />

                <DateInput$
                  {...form.getInputProps('dob')}
                  withAsterisk
                  label="Date Of Birth"
                  placeholder="Date"
                  disabled={true}
                  variant={'filled'}
                />

                <TextInput$
                  {...form.getInputProps('guardianNumber')}
                  withAsterisk
                  label="Guardian Number"
                  placeholder="Phone Number"
                  disabled={true}
                  variant={'filled'}
                />

                <Select$
                  {...form.getInputProps('gender')}
                  withAsterisk
                  label="Gender"
                  data={['Male', 'Female']}
                  disabled={true}
                  variant={'filled'}
                />

                <TextInput$
                  {...form.getInputProps('fatherName')}
                  withAsterisk
                  label="Father Name"
                  placeholder="Father Name"
                  variant={'filled'}
                  disabled={true}
                />
              </SimpleGrid>
            </Paper>
            <Paper p="md" mt={'md'} shadow="xs">
              <Title color={'#343A40'} order={4} mb="sm">
                Optional Informations
              </Title>
              <Divider my="sm" />
              <SimpleGrid cols={3}>
                <TextInput$
                  {...form.getInputProps('relegion')}
                  withAsterisk
                  label="Relegion"
                  placeholder="Relegion"
                  disabled={true}
                  variant={'filled'}
                />

                <TextInput$
                  {...form.getInputProps('cast')}
                  withAsterisk
                  label="Cast"
                  placeholder="cast"
                  disabled={true}
                  variant={'filled'}
                />

                <TextInput$
                  {...form.getInputProps('fatherName')}
                  withAsterisk
                  label="Father Name"
                  placeholder="Father Name"
                  disabled={true}
                  variant={'filled'}
                />
              </SimpleGrid>
            </Paper>
          </Grid.Col>
        </Grid>
      </Box>
    </Container>
  );
};

export default SingleStudent;
