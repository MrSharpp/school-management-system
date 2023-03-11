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
  import {IEditStudentSchema, editStudentShema} from '@schema/StudentsSchema'
  import { BreadCrumbs } from '@pages/components/BreadCrumbs';
  import { useObservableQuery } from '@legendapp/state/react-hooks/useObservableQuery';
  
  
  const EditStudent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    const form = useForm<IEditStudentSchema>({
      validate: zodResolver(editStudentShema),
    });

    const editStudentMutation = useMutation({
      mutationFn: ApiCalls.updateStudent,
  
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
  
        navigate('/students');
      },
    });
  
    useEffect(() => {
      const data = location.state?.data;
  
      if (data) {
        form.setValues({
            name: data.name,
            admissionNo: data.admissionNo,
             gender: data.gender,
             guardianNumber: data.guardianNumber
        });
      }
    }, [location.state]);
  
    return (
      <Container fluid pt={0} pl={'sm'}>
            <BreadCrumbs path={[{title: 'Students', href: '/students'},{title: 'Edit Student', href: '/students/edit'}]}/>
        <Paper p="md">
          <Box
            component="form"
            onSubmit={form.onSubmit((val) => {
                editStudentMutation.mutate({
                data: val,
                id: params.studentId as string,
              });
            })}
          >
            <Stack>
              <TextInput$
                {...form.getInputProps('name')}
                withAsterisk
                label="Name"
                placeholder="John Doe"
                disabled={editStudentMutation.isLoading}
              />

                <TextInput$
                {...form.getInputProps('admissionNo')}
                withAsterisk
                label="Admission Number"
                placeholder="John Doe"
                disabled={editStudentMutation.isLoading}
              />

                <Select$
                {...form.getInputProps('gender')}
                withAsterisk
                label="Gender"
                placeholder="Gender"
                data={['Male', 'Female']}
                disabled={editStudentMutation.isLoading}
              />

            <TextInput$
                {...form.getInputProps('guardianNumber')}
                withAsterisk
                label="Guardian Number"
                placeholder="John Doe"
                disabled={editStudentMutation.isLoading}
              />

            </Stack>

            <Button
              mt="md"
              type="submit"
              loading={editStudentMutation.isLoading}
            >
              Save
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  };
  
  export default EditStudent;
  