// import {
//   Anchor,
//   Breadcrumbs,
//   Button,
//   Container,
//   Flex,
//   Text,
//   Title,
// } from '@mantine/core';
// import { DataTable } from 'mantine-datatable';
// import { Link } from 'react-router-dom';

// export default function Teachers() {
//   const items = [
//     { title: 'Admin', href: '/' },
//     { title: 'Teachers', href: '/teachers' },
//   ].map((item, index) => (
//     <Anchor component={Link} to={item.href} key={index}>
//       {item.title}
//     </Anchor>
//   ));

//   return (
//     <>
//       <Flex justify={'space-between'} sx={{ alignItems: 'center' }} mx={'4%'}>
//         <div>
//           <Breadcrumbs separator="/" mt="xs">
//             {items}
//           </Breadcrumbs>

//           <Title mt={4} color={'#495057'}>
//             Teachers
//           </Title>
//         </div>
//         <Button mr={'2%'}>Add Teacher</Button>
//       </Flex>

//       <DataTable
//         ml={'4%'}
//         mr={'6%'}
//         mt={40}
//         height="80%"
//         withBorder
//         borderRadius="sm"
//         withColumnBorders
//         striped
//         highlightOnHover
//         // provide data
//         records={[
//           { id: 1, name: 'Joe Biden', bornIn: 1942, party: 'Democratic' },
//           // more records...
//         ]}
//         // define columns
//         columns={[
//           {
//             accessor: 'id',
//             // this column has a custom title
//             title: '#',
//             // right-align column
//             textAlignment: 'right',
//           },
//           { accessor: 'name' },
//           {
//             accessor: 'party',
//             // this column has custom cell data rendering
//             render: ({ party }) => (
//               <Text
//                 weight={700}
//                 color={party === 'Democratic' ? 'blue' : 'red'}
//               >
//                 {party.slice(0, 3).toUpperCase()}
//               </Text>
//             ),
//           },
//           { accessor: 'bornIn' },
//         ]}
//         // execute this callback when a row is clicked
//         onRowClick={({ name, party, bornIn }) =>
//           alert(
//             `You clicked on ${name}, a ${party.toLowerCase()} president born in ${bornIn}`
//           )
//         }
//       />
//     </>
//   );
// }

import { ActionIcon, Box, Grid, TextInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { IconEdit, IconSearch, IconTrash } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
// import sortBy from 'lodash/sortBy';
import Teachers from './teachers.json';

const initialRecords = Teachers.slice(0, 100);
const PAGE_SIZE = 10;

export default function AllTeachers() {
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
          <TextInput
            sx={{ flexBasis: '60%' }}
            placeholder="Search teachers..."
            icon={<IconSearch size={16} />}
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
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
        totalRecords={Teachers.length}
        recordsPerPage={PAGE_SIZE}
        page={page}
        onPageChange={(p) => setPage(p)}
      />
    </>
  );
}
