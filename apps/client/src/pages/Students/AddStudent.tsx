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
  useMantineTheme,
  Textarea,
  FileInput,
  Avatar,
  rem,
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
  const theme = useMantineTheme();

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
  ].map((item, index) => (
    <Anchor component={Link} to={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  return (
    <Container fluid p={0}>
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

      <Paper withBorder>
        <Box
          component="form"
          onSubmit={form.onSubmit((val) => {
            val.guardianNumber = String(val.guardianNumber);
            addStudentMutation.mutate(val);
          })}
          p="md"
        >
          <Stack spacing={`calc(${theme.spacing.xl} * 2)`}>
            <Grid>
              <Grid.Col>
                <Title order={4}> Personal Details </Title>
              </Grid.Col>

              {/* <Grid.Col>
                <Avatar size={rem(100)}  radius={999} />
              </Grid.Col> */}

              <Grid.Col span={4}>
                <TextInput$
                  {...form.getInputProps('name')}
                  withAsterisk
                  label="Student Name"
                  placeholder="John Doe"
                  disabled={addStudentMutation.isLoading}
                />
              </Grid.Col>

              <Grid.Col span={4}>
                <TextInput$
                  {...form.getInputProps('admissionNo')}
                  withAsterisk
                  label="Admission Number"
                  placeholder="Number"
                  disabled={addStudentMutation.isLoading}
                />
              </Grid.Col>

              <Grid.Col span={4}>
                <DateInput$
                  {...form.getInputProps('dob')}
                  withAsterisk
                  label="Date Of Birth"
                  placeholder="Date"
                  disabled={addStudentMutation.isLoading}
                />
              </Grid.Col>

              <Grid.Col span={4}>
                <Select$
                  {...form.getInputProps('gender')}
                  withAsterisk
                  label="Gender"
                  data={['Male', 'Female']}
                  disabled={addStudentMutation.isLoading}
                />
              </Grid.Col>

              <Grid.Col span={4}>
                <Select$
                  {...form.getInputProps('gender')}
                  withAsterisk
                  label="Relegion"
                  data={['Male', 'Female']}
                  disabled={addStudentMutation.isLoading}
                />
              </Grid.Col>

              <Grid.Col span={4}>
                <FileInput
                  label="Birth Certificate"
                  accept="image/png,image/jpeg"
                  placeholder="Pick file"
                />
              </Grid.Col>

              <Grid.Col span={4}>
                <FileInput
                  label="Previous year marksheet"
                  accept="image/png,image/jpeg"
                  placeholder="Pick file"
                />
              </Grid.Col>

              {/* <Grid.Col span={12}>
                <Textarea
                  label="Address"
                  withAsterisk
                  placeholder="eg: Street 1 dummy place, Aligarh 202001"
                />
              </Grid.Col> */}
            </Grid>

            <Grid>
              <Grid.Col>
                <Title order={4}> Parent Information </Title>
              </Grid.Col>

              <Grid.Col span={4}>
                <TextInput$
                  {...form.getInputProps('name')}
                  withAsterisk
                  label="Mother's Name"
                  placeholder="John Doe"
                  disabled={addStudentMutation.isLoading}
                />
              </Grid.Col>

              <Grid.Col span={4}>
                <TextInput$
                  {...form.getInputProps('name')}
                  withAsterisk
                  label="Father's Name"
                  placeholder="John Doe"
                  disabled={addStudentMutation.isLoading}
                />
              </Grid.Col>

              <Grid.Col span={4}>
                <NumberInput
                  {...form.getInputProps('name')}
                  withAsterisk
                  hideControls
                  label="Mobile Number"
                  placeholder="John Doe"
                  disabled={addStudentMutation.isLoading}
                />
              </Grid.Col>

              <Grid.Col span={4}>
                <NumberInput
                  {...form.getInputProps('name')}
                  hideControls
                  label="Mobile Number 2 (optional)"
                  placeholder="John Doe"
                  disabled={addStudentMutation.isLoading}
                />
              </Grid.Col>

              <Grid.Col span={4}>
                <TextInput$
                  {...form.getInputProps('name')}
                  label="Email"
                  placeholder="John Doe"
                  disabled={addStudentMutation.isLoading}
                />
              </Grid.Col>
            </Grid>

            <Grid>
              <Grid.Col>
                <Title order={4}> Address </Title>
              </Grid.Col>

              <Grid.Col span={4}>
                <TextInput$
                  {...form.getInputProps('name')}
                  withAsterisk
                  label="Street"
                  // placeholder="John Doe"
                  disabled={addStudentMutation.isLoading}
                />
              </Grid.Col>

              <Grid.Col span={4}>
                <TextInput$
                  {...form.getInputProps('name')}
                  withAsterisk
                  label="Locality"
                  // placeholder="John Doe"
                  disabled={addStudentMutation.isLoading}
                />
              </Grid.Col>

              <Grid.Col span={4}>
                <TextInput$
                  {...form.getInputProps('name')}
                  withAsterisk
                  label="City"
                  // placeholder="John Doe"
                  disabled={addStudentMutation.isLoading}
                />
              </Grid.Col>

              <Grid.Col span={4}>
                <TextInput$
                  {...form.getInputProps('name')}
                  withAsterisk
                  label="District"
                  // placeholder="John Doe"
                  disabled={addStudentMutation.isLoading}
                />
              </Grid.Col>

              <Grid.Col span={4}>
                <TextInput$
                  {...form.getInputProps('name')}
                  withAsterisk
                  label="State"
                  // placeholder="John Doe"
                  disabled={addStudentMutation.isLoading}
                />
              </Grid.Col>

              <Grid.Col span={4}>
                <TextInput$
                  {...form.getInputProps('name')}
                  withAsterisk
                  label="Pin Code"
                  // placeholder="John Doe"
                  disabled={addStudentMutation.isLoading}
                />
              </Grid.Col>

              <Grid.Col span={4}>
                <TextInput$
                  {...form.getInputProps('name')}
                  withAsterisk
                  label="Country of origin"
                  // placeholder="John Doe"
                  disabled={addStudentMutation.isLoading}
                />
              </Grid.Col>
            </Grid>

            <div>
              {' '}
              <Button
                mt="md"
                type="submit"
                loading={addStudentMutation.isLoading}
              >
                Save
              </Button>
            </div>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddStudent;
