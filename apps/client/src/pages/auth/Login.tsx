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

type IForm = z.infer<typeof LoginSchema>;

const LoginComponent = () => {
  const form = useForm<IForm>({
    resolver: zodResolver(LoginSchema),
  });

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
      console.log(data);
    },
  });

  return (
    <Container size={420} my={40}>
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
        <TextInput label="Email" placeholder="you@mantine.dev" required />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
        />
        <Group position="apart" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl">
          Sign in
        </Button>
      </Paper>
    </Container>
  );
};

export default LoginComponent;
