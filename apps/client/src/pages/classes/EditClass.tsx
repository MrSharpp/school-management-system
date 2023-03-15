import {
    Paper,
    Container,
    Title,
    Box,
    Button,
    Stack,
    PasswordInput,
    NumberInput,
    Flex,
    ActionIcon,
    Badge,
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
import { editClassSchema } from '@APIService/classes';
import { IconPlus, IconX } from '@tabler/icons-react';
import { For } from '@legendapp/state/react';
import {observable} from '@legendapp/state'


const state = observable<{sections: string[]}>({
    sections: [],
})

  interface IForm extends z.infer<typeof editClassSchema> {
    sectionName: string
  }
  
  const EditClass = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
  
    const form = useForm<IForm>({
        validate: {
            className: (val) => !val &&  'Class Name should not be empty'
          },
     

      initialValues: {
        className: '',
        sections: [],
        sectionName: ''
      },
     
    });
  
    const editClassMutation = useMutation({
      mutationFn: ApiCalls.editClass,
  
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
  
        navigate('/classes');
      },
    });
  
    useEffect(() => {
      const data = location.state?.data;
  
      if (data) {
        form.setValues({
          className: data.className,
          sections: data.sections
        });
        state.sections.set(data.sections.split(","))
      }
    }, [location.state]);
  
    return (
      <Container fluid pt={0} pl={0}>
        <Paper p="md">
          <Title order={3}> Edit Teacher </Title>
  
          <Box
            component="form"
            onSubmit={form.onSubmit((val) => {

                val.sections = state.sections.peek();
                
                editClassMutation.mutate({
                    body: val,
                id: params.classId as string,
              });
            })}
          >
            <Paper p="md">
              <Stack>
                <TextInput$
                  {...form.getInputProps('className')}
                  withAsterisk
                  label="Class Name"
                  placeholder="Class Name"
                  disabled={editClassMutation.isLoading}
                />
  
            <Flex direction={'column'}>
                <TextInput$
                  {...form.getInputProps('sectionName')}
                  label="Sections"
                  placeholder="Add section"
                  rightSection={
                    <ActionIcon
                      variant="transparent"
                      onClick={e => {
                        if (
                          state.sections
                            .peek()
                            .includes(form.values.sectionName)
                        )
                          return form.setFieldError(
                            'sectionName',
                            'Section Already Exists'
                          );
                        state.sections.push(form.values.sectionName);
                        form.setFieldValue('sectionName', '');
                      }}
                    >
                      <IconPlus size={16} />
                    </ActionIcon>
                  }
                />

                <Flex gap={'sm'} mt={10}>
                  <For
                    each={state.sections}
                    item={({ item }) =>
                      <Badge
                        variant="light"
                        color={'green'}
                        pr={3}
                        size="lg"
                        style={{ fontWeight: 600 }}
                        rightSection={removeButton(item.peek())}
                      >
                        {item.peek()}
                      </Badge>}
                  />
                </Flex>
              </Flex>
  
                
              </Stack>
  
              <Button
                mt="md"
                type="submit"
                loading={editClassMutation.isLoading}
              >
                Save
              </Button>
            </Paper>
          </Box>
        </Paper>
      </Container>
    );
  };
  
  export default EditClass;

  const removeButton = (val: string) =>
  <ActionIcon
    size="xs"
    color="green"
    radius="xl"
    variant="transparent"
    onClick={() =>
      state.sections.set(state.sections.peek().filter(item => item != val))}
  >
    <IconX size={'10rem'} />
  </ActionIcon>;

  