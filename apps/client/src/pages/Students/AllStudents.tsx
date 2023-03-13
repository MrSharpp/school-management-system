import {
  ActionIcon,
  Box,
  Grid,
  Flex,
  Breadcrumbs,
  Title,
  Button,
  Anchor,
  Container,
  Group,
  Paper,
  Stack,
  UnstyledButton,
  Text,
} from '@mantine/core';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import {
  IconEdit,
  IconSearch,
  IconTrash,
  IconPlus,
  IconX,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import sortBy from 'lodash/sortBy';
import debounce from 'lodash/debounce';
import Teachers from './students.json';
import { observable } from '@legendapp/state';
import { For, observer, Show, useObserveEffect } from '@legendapp/state/react';
import { TextInput$, DataTable$ } from 'ui';
import { useObservableQuery } from '@legendapp/state/react-hooks/useObservableQuery';
import ApiCalls from '@APIService/index';

const initialRecords = Teachers.slice(0, 100);
const PAGE_SIZE = 10;

const state = observable({
  records: initialRecords,
  query: '',
  sortStatus: {
    columnAccessor: 'name',
    direction: 'asc',
  },
  page: 1,
  sortedRecords: Teachers.slice(0, PAGE_SIZE),
  selectedStudent: '',
});

const debouncedQuery = observable('');

const getDebounceQuery = debounce(() => {
  debouncedQuery.set(state.query.get());
}, 300);

state.query.onChange(() => {
  getDebounceQuery();
});

export  function AllStudents() {
  const navigate = useNavigate();

  const getTeachersQuery = useObservableQuery({
    queryKey: ['get_students'],
    queryFn: ApiCalls.getStudents,
    initialData: [],
  });

  const items = [
    { title: 'Admin', href: '/' },
    { title: 'Students', href: '/students' },
  ].map((item, index) =>
    <Anchor component={Link} to={item.href} key={index}>
      {item.title}
    </Anchor>
  );

  useObserveEffect(() => {
    let data = [...Teachers];

    const query = debouncedQuery.get().trim().toLowerCase();

    if (query.length) {
      data = data.filter(({ id, name, phone }: any) =>
        `${id} ${name} ${phone} `.toLowerCase().includes(query)
      );
    }

    data = sortBy(data, state.sortStatus.columnAccessor.get());
    data = state.sortStatus.direction.get() === 'desc' ? data.reverse() : data;

    const from = (state.page.get() - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;

    state.sortedRecords.set(data.slice(from, to));
  });

  return (
    <Container fluid>
      <Grid align="center" mb="md">
        <Grid.Col>
          <Flex justify={'space-between'} sx={{ alignItems: 'center' }}>
            <div>
              <Breadcrumbs separator="/" mt="xs">
                {items}
              </Breadcrumbs>

              <Title mt={4} color={'#495057'}>
                Students
              </Title>
            </div>
            <Button mr={'1%'} onClick={() => navigate('new')}>
              Add Student
            </Button>
          </Flex>
        </Grid.Col>

        <Grid.Col xs={3} sm={3}>
          <TextInput$
            placeholder="Search teachers..."
            icon={<IconSearch size={16} />}
            value$={state.query}
            onChange={e => state.query.set(e.currentTarget.value)}
          />
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={'auto'}>
          <DataTable$
            withBorder
            highlightOnHover
            onRowClick={data => state.selectedStudent.set(data)}
            records={getTeachersQuery.data || []}
            fetching$={getTeachersQuery.isLoading}
            idAccessor="teacherId"
            columns={[
              {
                accessor: 'studentId',
              },
              {
                accessor: 'name',
              },
              {
                accessor: 'admissionNo',
              },
              {
                accessor: 'guardianNumber',
              },
              {
                accessor: 'gender',
              },
              {
                accessor: 'action',
                width: '10%',
                sortable: false,
                render(data) {
                  return (
                    <div
                      style={{
                        display: 'flex',
                        gap: 10,
                        justifyContent: 'center',
                      }}
                    >
                      <ActionIcon
                        color="dark"
                        onClick={() =>
                          navigate(`edit/${data.peek().studentId}`, {
                            state: { data: data.peek() },
                          })}
                      >
                        <IconEdit size={16} />
                      </ActionIcon>

                      <ActionIcon color="red">
                        <IconTrash size={16} />
                      </ActionIcon>
                    </div>
                  );
                },
              },
            ]}
            totalRecords$={getTeachersQuery.data.length}
          />
        </Grid.Col>
        <Show if={state.selectedStudent}>
          <Grid.Col span={6}>
            <SelectedStudent selectedStudent={state.selectedStudent} />
          </Grid.Col>
        </Show>
      </Grid>
    </Container>
  );
}

function SelectedStudent({ selectedStudent }: { selectedStudent: any }) {
  return (
    <>
    <Title order={4} color="#495057" mb={10}>
      {' '}{selectedStudent.name} Detaills
    </Title>
    <Paper withBorder p="md">

<Flex>
    <div><Stack spacing={'xs'}>
          <Record label={'Name'} value={selectedStudent.name} />
          <Record
            label={'Admission Number'}
            value={selectedStudent.admissionNo} />
          <Record label={'Gender'} value={selectedStudent.gender} />
          <Record
            label={'Guardian Number'}
            value={selectedStudent.guardianNumber} />
        </Stack></div>

        <ActionIcon onClick={() => selectedStudent.set(null)} style={{marginLeft: 'auto'}}>
        <IconX size={16} />
      </ActionIcon>
</Flex>
      </Paper></>
  );
}

function Record({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <Title order={6} weight={500} style={{ lineHeight: 1.2 }} mb={0}>
        {label}
      </Title>
      <Title
        order={5}
        weight={400}
        style={{ lineHeight: 1.2 }}
        mt={0}
        color={'#808080'}
      >
        {value}
      </Title>
    </div>
  );
}
