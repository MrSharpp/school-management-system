import { ActionIcon, Box, Grid, TextInput, Button, Group } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { IconEdit, IconSearch, IconTrash, IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
// import sortBy from 'lodash/sortBy';
import Teachers from './teachers.json';
import { Container } from '@mantine/core';
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

function AllTeachers() {
  const navigate = useNavigate();

  const [records, setRecords] = useState(initialRecords);
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebouncedValue(query, 200);
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: 'name',
    direction: 'asc',
  });
  const [page, setPage] = useState(1);
  const [pageRecords, setPageRecords] = useState(Teachers.slice(0, PAGE_SIZE));

  useEffect(() => {
    setRecords(
      initialRecords.filter(({ id, name, phone }: any) => {
        if (
          debouncedQuery !== '' &&
          !`${id} ${name} ${phone} `
            .toLowerCase()
            .includes(debouncedQuery.trim().toLowerCase())
        ) {
          return false;
        }
        return true;
      })
    );

    // let data = sortBy(Teachers, sortStatus.columnAccessor);
    // data = sortStatus.direction === 'desc' ? data.reverse() : data;

    // const from = (page - 1) * PAGE_SIZE;
    // const to = from + PAGE_SIZE;

    // setPageRecords(data.slice(from, to));
  }, [debouncedQuery, page, sortStatus]);

  return (
    <>
      <Grid align="center" mb="md">
        <Grid.Col xs={8} sm={9}>
          <TextInput$
            // sx={{ flexBasis: '60%' }}
            placeholder="Search teachers..."
            icon={<IconSearch size={16} />}
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
          />
        </Grid.Col>

        <Grid.Col xs={4} sm={3}>
          <Group position="right">
            <Button
              leftIcon={<IconPlus size={16} />}
              onClick={() => navigate('new')}
            >
              Add New Teacher
            </Button>
          </Group>
        </Grid.Col>
      </Grid>

      <DataTable$
        withBorder
        records={records}
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
        sortStatus={sortStatus}
        onSortStatusChange={setSortStatus}
        totalRecords={Teachers.length}
        recordsPerPage={PAGE_SIZE}
        page={page}
        onPageChange={(p) => setPage(p)}
      />
    </>
  );
}
