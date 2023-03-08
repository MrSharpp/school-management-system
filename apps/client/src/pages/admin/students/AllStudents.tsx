import {
  ActionIcon,
  Box,
  Grid,
  TextInput,
  Flex,
  Breadcrumbs,
  Title,
  Button,
  Anchor,
  Container,
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { IconEdit, IconSearch, IconTrash } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import sortBy from 'lodash/sortBy';
import Students from './students.json';

const initialRecords = Students.slice(0, 100);
const PAGE_SIZE = 10;

const items = [
  { title: 'Admin', href: '/' },
  { title: 'Students', href: '/students' },
].map((item, index) =>
  <Anchor component={Link} to={item.href} key={index}>
    {item.title}
  </Anchor>
);

export default function AllStudents() {
  const navigate = useNavigate();

  const [records, setRecords] = useState(initialRecords);
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebouncedValue(query, 200);
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: 'name',
    direction: 'asc',
  });
  const [page, setPage] = useState(1);
  const [pageRecords, setPageRecords] = useState(Students.slice(0, PAGE_SIZE));

  useEffect(
    () => {
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
    },
    [debouncedQuery, page, sortStatus]
  );

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
            <Button mr={'1%'}>Add Student</Button>
          </Flex>
        </Grid.Col>
        <Grid.Col xs={2} sm={2}>
          <TextInput
            sx={{ flexBasis: '60%' }}
            placeholder="Search teachers..."
            icon={<IconSearch size={16} />}
            value={query}
            onChange={e => setQuery(e.currentTarget.value)}
          />
        </Grid.Col>
      </Grid>

      <DataTable
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
                  <ActionIcon>
                    <IconTrash size={16} />
                  </ActionIcon>
                </div>
              );
            },
          },
        ]}
        sortStatus={sortStatus}
        onSortStatusChange={setSortStatus}
        totalRecords={Students.length}
        recordsPerPage={PAGE_SIZE}
        page={page}
        onPageChange={p => setPage(p)}
      />
    </Container>
  );
}
