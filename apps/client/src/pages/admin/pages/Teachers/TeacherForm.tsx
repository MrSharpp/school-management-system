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
import { useNavigate, useLocation } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

interface IProps {
  form: any;
  onSubmit: (...args: any[]) => void;
  type: 'add' | 'edit';
  isLoading: boolean
}

export default function TeacherForm({ form, onSubmit, type, isLoading }: IProps) {
  return (
    <Container fluid pt={0} pl={0}>
      <Paper p="md">
        <Title order={3}> {type === 'add' ? 'Add New' : 'Edit'} Teacher </Title>

        <Box component="form" onSubmit={form.onSubmit(onSubmit)}>
          <Paper p="md">
            <Stack>
              <TextInput$
                {...form.getInputProps('name')}
                withAsterisk
                label="Name"
                placeholder="John Doe"
                disabled={isLoading}
              />

              <TextInput$
                {...form.getInputProps('email')}
                withAsterisk
                label="Email"
                placeholder="abc@gmail.com"
                disabled={isLoading}
              />

              <PasswordInput
                {...form.getInputProps('password')}
                withAsterisk
                label="Passowrd"
                placeholder="****"
                disabled={isLoading}
              />

              <Select$
                {...form.getInputProps('gender')}
                withAsterisk
                label="Gender"
                data={['Male', 'Female']}
                disabled={isLoading}
              />
            </Stack>

            <Button
              mt="md"
              type="submit"
              loading={isLoading}
            >
              Save
            </Button>
          </Paper>
        </Box>
      </Paper>
    </Container>
  );
}
