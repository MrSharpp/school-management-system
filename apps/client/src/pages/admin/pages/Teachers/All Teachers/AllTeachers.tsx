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
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { IconEdit, IconSearch, IconTrash, IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import sortBy from 'lodash/sortBy';
import debounce from 'lodash/debounce';
import Teachers from './teachers.json';
import { observable } from '@legendapp/state';
import { observer, useObserveEffect } from '@legendapp/state/react';
import { reactive } from '@legendapp/state/react';
import { TextInput$, DataTable$ } from 'ui';

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
});

const debouncedQuery = observable('');

const getDebounceQuery = debounce(() => {
  debouncedQuery.set(state.query.get());
}, 300);

state.query.onChange(() => {
  getDebounceQuery();
});

export default function AllTeachers() {
  const navigate = useNavigate();

  const items = [
    { title: 'Admin', href: '/' },
    { title: 'Teachers', href: '/teachers' },
  ].map((item, index) => (
    <Anchor component={Link} to={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

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
                Teachers
              </Title>
            </div>
            <Button mr={'1%'}>Add Teacher</Button>
          </Flex>
        </Grid.Col>

        <Grid.Col xs={3} sm={3}>
          <TextInput$
            placeholder="Search teachers..."
            icon={<IconSearch size={16} />}
            value$={state.query}
            onChange={(e) => state.query.set(e.currentTarget.value)}
          />
        </Grid.Col>
      </Grid>

      <DataTable$
        withBorder
        records$={state.sortedRecords}
        columns={[
          {
            accessor: 'id',
            sortable: true,
          },
          {
            accessor: 'name',
            sortable: true,
          },
          { accessor: 'class', sortable: true },
          { accessor: 'gender', sortable: true },
          {
            accessor: 'subject',
            sortable: true,
          },
          {
            accessor: 'section',
            sortable: true,
          },
          { accessor: 'phone', title: 'Phone Number', sortable: true },
          { accessor: 'address', sortable: true },
          {
            accessor: 'action',
            width: '10%',
            sortable: false,
            render() {
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
                    onClick={() => navigate('patient-details')}
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
        sortStatus$={state.sortStatus}
        onSortStatusChange={state.sortStatus.set}
        totalRecords$={state.records.length}
        recordsPerPage={PAGE_SIZE}
        page$={state.page}
        onPageChange={(p) => state.page.set(p)}
      />
    </Container>
  );
}

// export default AllTeachers
