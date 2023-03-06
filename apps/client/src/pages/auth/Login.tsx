import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import LoginSchema from '@schema/LoginSchema';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { loginApiCall } from '@APIService/index';
import { AxiosError } from 'axios';
import { Input } from '@chakra-ui/react';

type IForm = z.infer<typeof LoginSchema>;

const Login = () => {
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

  return <Input placeholder="Basic usage" />;
};

export default Login;
