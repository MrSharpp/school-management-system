import {
    Container,
    Grid,
  } from '@mantine/core';
  import { useForm, zodResolver } from '@mantine/form';
  import { TextInput$, Select$, DateInput$ } from 'ui';
  import { z } from 'zod';
  import UpdateTeacherSchema from '@schema/Teachers/UpdateTeacherSchema';
  import { useMutation } from '@tanstack/react-query';
  import ApiCalls from '@APIService/index';
  import { useNavigate, useLocation, useParams } from 'react-router-dom';
  import { notifications } from '@mantine/notifications';
  import { AxiosError } from 'axios';
  import { useEffect } from 'react';
  import {IEditStudentSchema, editStudentShema} from '@schema/StudentsSchema'
  import { BreadCrumbs } from '@components/BreadCrumbs';
  import { useObservableQuery } from '@legendapp/state/react-hooks/useObservableQuery';
import { StudentForm } from './StudentForm';
  
  
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
      <Container fluid pt={0}>
      <Grid align="center" mb="md">
        <Grid.Col>
          <BreadCrumbs path={[  { title: 'Admin', href: '/' },
    { title: 'Students', href: '/students' },
    { title: 'Edit Student', href: '/students/edit' }]}/>
        </Grid.Col>
      </Grid>

      <StudentForm
        form={form}
        onSubmit={form.onSubmit(() => console.log('hello'))}
        type={undefined}
        isLoading={editStudentMutation.isLoading}
      />
    </Container>
    );
  };
  
  export default EditStudent;
  