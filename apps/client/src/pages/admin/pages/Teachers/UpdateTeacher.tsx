import {
  Paper,
  Container,
  Title,
  Box,
  Button,
  Stack,
  PasswordInput,
  NumberInput,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { TextInput$, Select$ } from 'ui';
import { z } from 'zod';
import UpdateTeacherSchema from '@schema/Teachers/UpdateTeacherSchema';
import { useMutation } from '@tanstack/react-query';
import ApiCalls from '@APIService/index';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useObservableQuery } from '@legendapp/state/react-hooks/useObservableQuery';

type IForm = z.infer<typeof UpdateTeacherSchema>;

const UpdateTeacher = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const getTeachersQuery = useObservableQuery({
    queryKey: [`get_teacher`, params.teacherId],
    queryFn: () => ApiCalls.getTeacherById(params.teacherId as string),

    onSuccess(data: any) {
      console.log(data);
      // form.setValues({
      //   gender: data.gender,
      //   User: {
      //     name: data.User.name,
      //     email: data.User.email,
      //     password: '',
      //   },
      // });
    },
  });

  const form = useForm<IForm>({
    validate: zodResolver(UpdateTeacherSchema),

    // initialValues: {
    //   gender: 'Male',

    //   User: {
    //     name: '',
    //     email: '',
    //     password: '',
    //     phoneNo: '',
    //   },
    // },
  });

  const editTeacherMutation = useMutation({
    mutationFn: ApiCalls.updateTeacherById,

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
        message: 'Teacher sucessfully edited',
      });

      navigate('/teachers');
    },
  });

  useEffect(() => {
    const data = location.state?.data;

    if (data) {
      form.setValues({
        gender: data.gender,
        User: {
          name: data.User.name,
          email: data.User.email,
          password: '',
          phoneNo: data.User.phoneNo,
        },
      });
    }
  }, [location.state]);

  return (
    <Container fluid pt={0} pl={0}>
      <Paper p="md">
        <Title order={3}> Edit Teacher </Title>

        <Box
          component="form"
          onSubmit={form.onSubmit((val) => {
            if (val.User?.phoneNo)
              val.User.phoneNo = val.User.phoneNo.toString();

            editTeacherMutation.mutate({
              data: val,
              id: params.teacherId as string,
            });
          })}
        >
          <Paper p="md">
            <Stack>
              <TextInput$
                {...form.getInputProps('User.name')}
                withAsterisk
                label="Name"
                placeholder="John Doe"
                disabled={editTeacherMutation.isLoading}
              />

              <NumberInput
                {...form.getInputProps('User.phoneNo')}
                withAsterisk
                label="Phone Number"
                placeholder="00000-00000"
                disabled={editTeacherMutation.isLoading}
                hideControls
              />

              <TextInput$
                {...form.getInputProps('User.email')}
                withAsterisk
                label="Email"
                placeholder="abc@gmail.com"
                disabled={editTeacherMutation.isLoading}
              />

              <PasswordInput
                {...form.getInputProps('User.password')}
                withAsterisk
                label="Passowrd"
                placeholder="****"
                disabled={editTeacherMutation.isLoading}
              />

              <Select$
                {...form.getInputProps('gender')}
                withAsterisk
                label="Gender"
                data={['Male', 'Female']}
                disabled={editTeacherMutation.isLoading}
              />
            </Stack>

            <Button
              mt="md"
              type="submit"
              loading={editTeacherMutation.isLoading}
            >
              Save
            </Button>
          </Paper>
        </Box>
      </Paper>
    </Container>
  );
};

export default UpdateTeacher;
