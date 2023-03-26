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
  Select,
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
import { observable } from '@legendapp/state';
import { For, observer, Show, useObserveEffect } from '@legendapp/state/react';
import { TextInput$, DataTable$ } from 'ui';
import { useObservableQuery } from '@legendapp/state/react-hooks/useObservableQuery';
import ApiCalls from '@APIService/index';

const PAGE_SIZE = 10;
const INITIAL_DATA = [];

const state = observable({
  records: [INITIAL_DATA],
  query: '',
  sortStatus: {
    columnAccessor: 'name',
    direction: 'asc',
  },
  page: 1,
  sortedRecords: [],
});

const debouncedQuery = observable('');

const getDebounceQuery = debounce(() => {
  debouncedQuery.set(state.query.get());
}, 300);

state.query.onChange(() => {
  getDebounceQuery();
});

export function AllFees() {
  const navigate = useNavigate();

  const getTeachersQuery = useObservableQuery({
    queryKey: ['get_students'],
    queryFn: ApiCalls.getStudents,
    initialData: [],
  });

  const items = [
    { title: 'Admin', href: '/' },
    { title: 'Fees', href: '/fees' },
  ].map((item, index) =>
    <Anchor component={Link} to={item.href} key={index}>
      {item.title}
    </Anchor>
  );

  useObserveEffect(() => {
    let data = [];

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
                All Fees
              </Title>
            </div>
          </Flex>
        </Grid.Col>

        <Grid.Col xs={3} sm={3}>
          <Select data={["Class 1", "Class 2"]} label="Select Class"/>
        </Grid.Col>

        <Select data={["Section A", "Section B"]} label="Select Section"/>
      </Grid>

      <Grid>
        <Grid.Col span={'auto'}>
          <DataTable$
            withBorder
            highlightOnHover
            onRowClick={data => navigate(`${data.studentId}`)}
            records={[ ...Array(10).fill({
                id: Math.random(),
                class: Math.random().toString(),
                admissionNo: Math.random(),
                section: Math.random().toString(),
                studentName: 'Amir Alam',
                fatherName: 'Lol Name',
              }
                   
                   )]}
            fetching$={getTeachersQuery.isLoading}
            idAccessor="id"
            columns={[
              {
                accessor: 'class',
                render: data => {
                  console.log(data);
                  return <>d</>
                },
              },
              {
                accessor: 'admissionNo',
              },
              {
                accessor: 'section',
              },
              {
                accessor: 'studentName',
              },
              {
                accessor: 'fatherName',
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
                     <Button size={'xs'} color="green">Collect Fee</Button>
                    </div>
                  );
                },
              },
            ]}
            totalRecords$={getTeachersQuery.data.length}
          />
        </Grid.Col>
      </Grid>
    </Container>
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
