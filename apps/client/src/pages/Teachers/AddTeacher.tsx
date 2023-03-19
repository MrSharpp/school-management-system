import {
  Paper,
  Container,
  Title,
  Box,
  Button,
  PasswordInput,
  NumberInput,
  Grid,
  Flex,
  Breadcrumbs,
  Anchor,
  SimpleGrid,
  Text,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import { TextInput$, Select$ } from 'ui';
import { z } from 'zod';
import AddTeachersSchema from '@schema/Teachers/AddTeacherSchema';
import { useMutation } from '@tanstack/react-query';
import ApiCalls from '@APIService/index';
import { useNavigate, useLocation, useParams, Link } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { AxiosError } from 'axios';
import { useState } from 'react';

type IForm = z.infer<typeof AddTeachersSchema>;

const AddTeacher = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState<Date | null>(null);

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

  const items = [
    { title: 'Admin', href: '/' },
    { title: 'Teachers', href: '/teachers' },
    { title: 'Add Teacher', href: '/teachers/new' },
  ].map((item, index) => (
    <Anchor component={Link} to={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

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
                Add Teacher
              </Title>
            </div>
          </Flex>
        </Grid.Col>
      </Grid>

      <Paper>
        <Box
          component="form"
          onSubmit={form.onSubmit((val) => {
            val.phoneNo = String(val.phoneNo);
            addTeacherMutation.mutate(val);
          })}
        >
          <Paper p="md">
            <Text fw={600} size={20} mb={20}>
              Basic Details
            </Text>
            <SimpleGrid cols={3}>
              <TextInput$
                {...form.getInputProps('TeachersId')}
                withAsterisk
                label="Teacher ID"
                placeholder="Enter Teacher ID"
                disabled={addTeacherMutation.isLoading}
              />

              <TextInput$
                {...form.getInputProps('name')}
                withAsterisk
                label="Name"
                placeholder="Enter Name"
                disabled={addTeacherMutation.isLoading}
              />

              <Select$
                {...form.getInputProps('gender')}
                withAsterisk
                label="Gender"
                placeholder="Choose Gender"
                data={['Male', 'Female']}
                disabled={addTeacherMutation.isLoading}
              />

              <DateInput
                sx={{ width: '100%' }}
                value={value}
                onChange={setValue}
                label="Date 0f Birth"
                placeholder="Enter or Select date"
                maw={400}
                mx="auto"
              />

              <NumberInput
                {...form.getInputProps('phoneNo')}
                withAsterisk
                label="Mobile"
                placeholder="Enter Mobile"
                disabled={addTeacherMutation.isLoading}
                hideControls
              />

              <DateInput
                sx={{ width: '100%' }}
                value={value}
                onChange={setValue}
                label="Joining date"
                placeholder="Enter or Select date"
                maw={400}
                mx="auto"
              />

              <PasswordInput
                {...form.getInputProps('qualifications')}
                withAsterisk
                label="Qualification"
                placeholder="Enter your Qualifications"
                disabled={addTeacherMutation.isLoading}
              />

              <TextInput$
                {...form.getInputProps('experience')}
                withAsterisk
                label="Experience"
                placeholder="Enter Experience"
                disabled={addTeacherMutation.isLoading}
              />
            </SimpleGrid>

            <Text fw={600} size={20} mt={20} mb={20}>
              Login Details
            </Text>

            <SimpleGrid cols={3}>
              <TextInput$
                {...form.getInputProps('username')}
                withAsterisk
                label="Username"
                placeholder="Enter Username"
                disabled={addTeacherMutation.isLoading}
              />
              <TextInput$
                {...form.getInputProps('email')}
                withAsterisk
                label="Email"
                placeholder="Enter Email"
                disabled={addTeacherMutation.isLoading}
              />

              <PasswordInput
                {...form.getInputProps('password')}
                withAsterisk
                label="Password"
                placeholder="Enter Password"
                disabled={addTeacherMutation.isLoading}
              />

              <PasswordInput
                {...form.getInputProps('repeat-password')}
                withAsterisk
                label="Repeat Password"
                placeholder="Repeat Password"
                disabled={addTeacherMutation.isLoading}
              />
            </SimpleGrid>

            <Text fw={600} size={20} mt={20} mb={20}>
              Address Details
            </Text>

            <TextInput$
              {...form.getInputProps('address')}
              withAsterisk
              label="Address"
              placeholder="Enter Address"
              disabled={addTeacherMutation.isLoading}
            />

            <SimpleGrid cols={3}>
              <TextInput$
                {...form.getInputProps('city')}
                withAsterisk
                label="City"
                placeholder="Enter City"
                disabled={addTeacherMutation.isLoading}
              />

              <TextInput$
                {...form.getInputProps('state')}
                withAsterisk
                label="State"
                placeholder="Enter State"
                disabled={addTeacherMutation.isLoading}
              />

              <NumberInput
                {...form.getInputProps('zip-code')}
                withAsterisk
                label="Zip Code"
                placeholder="Enter Zip"
                disabled={addTeacherMutation.isLoading}
                hideControls
              />

              <TextInput$
                {...form.getInputProps('country')}
                withAsterisk
                label="Country"
                placeholder="Enter Country"
                disabled={addTeacherMutation.isLoading}
              />
            </SimpleGrid>

            <Button
              mt="xl"
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
