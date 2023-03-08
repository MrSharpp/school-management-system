import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import LoginSchema from '@schema/LoginSchema';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { loginApiCall } from '@APIService/index';
import { AxiosError } from 'axios';
import {
  Container,
  Title,
  Text,
  Anchor,
  Paper,
  TextInput,
  PasswordInput,
  Checkbox,
  Group,
  Button,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

type IForm = z.infer<typeof LoginSchema>;

const LoginComponent = () => {
  const navigate = useNavigate();
  const form = useForm<IForm>({
    resolver: zodResolver(LoginSchema),
  });

  useEffect(() => {
    // will add the verification from the backend lateer
    if (localStorage.getItem('token')) {
      navigate('/');
    }
  }, []);

  const mutation = useMutation({
    mutationFn: loginApiCall,

    onError(error: AxiosError, variables, context) {
      form.setError('email', {
        message: 'Invalid email or password combination',
      });
      form.setError('password', {
        message: 'Invalid email or password combination',
      });
    },

    onSuccess(data, variables, context) {
      localStorage.setItem('token', data.token);
      notifications.show({
        title: 'Success',
        message: 'Sucessfully logged In!',
      });
      navigate('/');
    },
  });

  return (
    <Container size={420} my={40}>
      <form onSubmit={form.handleSubmit(data => mutation.mutate(data))}>
        <Title
          align="center"
          sx={theme => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Welcome back!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{' '}
          <Anchor size="sm" component="button">
            Create account
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
            error={
              form.formState.errors.email && form.formState.errors.email.message
            }
            {...form.register('email')}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            error={
              form.formState.errors.password &&
              form.formState.errors.password.message
            }
            {...form.register('password')}
          />
          <Group position="apart" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button loading={mutation.isLoading} type="submit" fullWidth mt="xl">
            Sign in
          </Button>
        </Paper>
      </form>
    </Container>
  );
};

export default LoginComponent;
