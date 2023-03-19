import {
  Box,
  Grid,
  Paper,
  Avatar,
  FileInput,
  Title,
  Divider,
  SimpleGrid,
  Button,
} from '@mantine/core';
import { TextInput$, DateInput$, Select$ } from 'ui';

export const StudentForm = ({ form, onSubmit, type, isLoading }) => {
  return (
    <Box component="form" onSubmit={onSubmit}>
      <Grid>
        <Grid.Col span={'auto'}>
          <Paper
            radius="md"
            withBorder
            p="lg"
            sx={theme => ({
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[8]
                  : theme.white,
            })}
          >
            <Avatar size={'xl * 2'} radius={'md * 2'} mx="auto" />
            <FileInput
              mt={'md'}
              placeholder="Student Image"
              withAsterisk
              {...form.getInputProps('photo')}
            />
          </Paper>
        </Grid.Col>
        <Grid.Col span={9}>
          <Paper p="md" shadow={'xs'}>
            <Title color={'#343A40'} order={4} mb="sm">
              Required Informations
            </Title>
            <Divider my="sm" />
            <SimpleGrid cols={3}>
              <TextInput$
                {...form.getInputProps('name')}
                withAsterisk
                label="Student Name"
                placeholder="John Doe"
                disabled={isLoading}
              />

              <TextInput$
                {...form.getInputProps('admissionNo')}
                withAsterisk
                label="Admission Number"
                placeholder="Number"
                disabled={isLoading}
              />

              <DateInput$
                {...form.getInputProps('dob')}
                withAsterisk
                label="Date Of Birth"
                placeholder="Date"
                disabled={isLoading}
              />

              <TextInput$
                {...form.getInputProps('guardianNumber')}
                withAsterisk
                label="Guardian Number"
                placeholder="Phone Number"
                disabled={isLoading}
              />

              <Select$
                {...form.getInputProps('gender')}
                withAsterisk
                label="Gender"
                data={['Male', 'Female']}
                disabled={isLoading}
              />

              <TextInput$
                {...form.getInputProps('fatherName')}
                withAsterisk
                label="Father Name"
                placeholder="Father Name"
                disabled={isLoading}
              />
            </SimpleGrid>
          </Paper>
          <Paper p="md" mt={'md'} shadow="xs">
            <Title color={'#343A40'} order={4} mb="sm">
              Optional Informations
            </Title>
            <Divider my="sm" />
            <SimpleGrid cols={3}>
              <TextInput$
                {...form.getInputProps('relegion')}
                withAsterisk
                label="Relegion"
                placeholder="Relegion"
                disabled={isLoading}
              />

              <TextInput$
                {...form.getInputProps('cast')}
                withAsterisk
                label="Cast"
                placeholder="cast"
                disabled={isLoading}
              />

              <TextInput$
                {...form.getInputProps('fatherName')}
                withAsterisk
                label="Father Name"
                placeholder="Father Name"
                disabled={isLoading}
              />
            </SimpleGrid>
          </Paper>
        </Grid.Col>
      </Grid>
      {type != 'view' &&
        <Button
          ml={'auto'}
          mt="md"
          type="submit"
          loading={isLoading}
          style={{ display: 'block' }}
        >
          {type == 'add' ? 'Add' : 'Save'} Student
        </Button>}
    </Box>
  );
};
