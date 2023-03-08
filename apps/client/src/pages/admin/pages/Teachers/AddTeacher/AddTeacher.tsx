import React from 'react';
import { Paper, Container, Title, Box, Button, Stack } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { TextInput$, Select$ } from 'ui';
import { z } from 'zod';
import AddTeachersSchema from '@schema/AddTeacherSchema';
import { createObservableHook } from '@legendapp/state/react-hooks/createObservableHook';

type IForm = z.infer<typeof AddTeachersSchema>;

const AddTeacher = () => {
  const form = useForm<IForm>({
    validate: zodResolver(AddTeachersSchema),

    initialValues: {
      name: '',
      email: '',
      password: '',
      gender: 'Male',
    },
  });

  return (
    <Container fluid pt={0} pl={0}>
      <Paper p="md">
        <Title order={3}> Add New Teacher </Title>

        <Box
          component="form"
          onSubmit={form.onSubmit((val) => console.log(val))}
        >
          <Paper p="md">
            <Stack>
              <TextInput$
                {...form.getInputProps('name')}
                withAsterisk
                label="Name"
                placeholder="John Doe"
              />

              <TextInput$
                {...form.getInputProps('email')}
                withAsterisk
                label="Email"
                placeholder="abc@gmail.com"
              />

              <TextInput$
                {...form.getInputProps('password')}
                withAsterisk
                label="Passowrd"
                placeholder="****"
              />

              <Select$
                {...form.getInputProps('gender')}
                withAsterisk
                label="Gender"
                data={['Male', 'Female']}
              />
            </Stack>

            <Button mt="md" type="submit">
              {' '}
              Save{' '}
            </Button>
          </Paper>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddTeacher;
