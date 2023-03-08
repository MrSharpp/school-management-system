import { ActionIcon, Box, Grid, TextInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { IconEdit, IconSearch, IconTrash } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import sortBy from 'lodash/sortBy';
import debounce from 'lodash/debounce';
import Teachers from './teachers.json';
import { Container } from '@mantine/core';
import { observable } from '@legendapp/state';
import { observer, useObserveEffect } from '@legendapp/state/react';
import { reactive } from '@legendapp/state/react';

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

const ReactiveTextInput = reactive(TextInput);
const ReactiveDataTable = reactive(DataTable);

function AllTeachers() {
  const navigate = useNavigate();

  useObserveEffect(() => {
    let data = sortBy(Teachers, state.sortStatus.columnAccessor.get());
    data = state.sortStatus.direction.get() === 'desc' ? data.reverse() : data;

    const from = (state.page.get() - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;

    const query = debouncedQuery.get();
    if (query.length) {
      console.log(query.trim().toLowerCase());
      console.log(
        `${Teachers[0].id} ${Teachers[0].name} ${Teachers[0].phone} `
      );

      data = Teachers.filter(({ id, name, phone }: any) =>
        `${id} ${name} ${phone}`.match(new RegExp(query.trim(), 'i'))
      );
    }

    data = data.slice(from, to);

    state.sortedRecords.set(data);
  });

  return (
    <Container fluid>
      <Grid align="center" mb="md">
        <Grid.Col xs={8} sm={9}>
          <ReactiveTextInput
            sx={{ flexBasis: '60%' }}
            placeholder="Search teachers..."
            icon={<IconSearch size={16} />}
            value$={state.query}
            onChange={(e) => state.query.set(e.currentTarget.value)}
          />
        </Grid.Col>
      </Grid>

      <ReactiveDataTable
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
                    // justifyContent: 'center',
                  }}
                >
                  <ActionIcon
                    color="gray"
                    onClick={() => navigate('patient-details')}
                  >
                    <IconEdit size={16} />
                  </ActionIcon>

                  <ActionIcon color="red" >
                    <IconTrash size={16} />
                  </ActionIcon>
                </div>
              );
            },
          },
        ]}
        sortStatus$={state.sortStatus}
        onSortStatusChange={state.sortStatus.set}
        totalRecords={Teachers.length}
        recordsPerPage={PAGE_SIZE}
        page$={state.page}
        onPageChange={(p) => state.page.set(p)}
      />
    </Container>
  );
}

// export default observer(AllTeachers);
export default AllTeachers;
