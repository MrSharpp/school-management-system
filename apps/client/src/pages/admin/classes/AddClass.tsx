import {
  Paper,
  Container,
  Title,
  Box,
  Button,
  Stack,
  PasswordInput,
  NumberInput,
  Grid,
  Flex,
  Breadcrumbs,
  Anchor,
  Group,
  Text,
  UnstyledButton,
  ActionIcon,
  Badge,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { TextInput$, Select$, DateInput$ } from 'ui';
import { z } from 'zod';
import AddTeachersSchema from '@schema/Teachers/AddTeacherSchema';
import { useMutation } from '@tanstack/react-query';
import ApiCalls from '@APIService/index';
import { useNavigate, useLocation, useParams, Link } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { addStudentSchema, IAddStudentSchema } from '@schema/StudentsSchema';
import { BreadCrumbs } from '@pages/components/BreadCrumbs';
import { IconPlus, IconTrash, IconX } from '@tabler/icons-react';
import { For } from '@legendapp/state/react';
import { observable } from '@legendapp/state';

const state = observable({
  sections: [],
  sectionName: '',
});

const AddClass = () => {
  const navigate = useNavigate();

  const form = useForm<IAddStudentSchema>({
    validate: zodResolver(addStudentSchema),

    initialValues: {
      name: '',
      admissionNo: '',
      dob: new Date(),
      guardianNumber: '',
      gender: 'Male',
      sections: [],
    },
  });

  const addStudentMutation = useMutation({
    mutationFn: ApiCalls.addStudent,

    onError(error: AxiosError, variables, context) {
      notifications.show({
        title: 'Error',
        message: 'OOPS! an unexpected error ocoured while creating student',
        color: 'red',
      });
    },

    onSuccess(data, variables, context) {
      notifications.show({
        title: 'Success',
        message: 'Student sucessfully created',
      });

      navigate('/students');
    },
  });

  return (
    <Container fluid pt={0}>
      <BreadCrumbs
        path={[
          { title: 'Admin', href: '/' },
          { title: 'Classes', href: '/classes' },
          { title: 'Add Class', href: 'javascript::void' },
        ]}
      />

      <Paper>
        <Box
          component="form"
          onSubmit={form.onSubmit(val => {
            val.guardianNumber = String(val.guardianNumber);
            addStudentMutation.mutate(val);
          })}
        >
          <Paper p="md">
            <Stack spacing={'xs'}>
              <TextInput$
                {...form.getInputProps('className')}
                withAsterisk
                label="Class Name"
                placeholder="Kindergarden"
                disabled={addStudentMutation.isLoading}
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
                        if (state.sections.includes(form.values.sectionName))
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
              loading={addStudentMutation.isLoading}
            >
              Save
            </Button>
          </Paper>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddClass;

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
