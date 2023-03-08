import { Anchor, Breadcrumbs, Button, Container, Flex, Text, Title } from '@mantine/core';
import {DataTable} from 'mantine-datatable'

export function Teachers() {
    const items = [
        { title: 'Admin', href: '/' },
        { title: 'Teachers', href: '/teachers' },

      ].map((item, index) => (
        <Anchor href={item.href} key={index}>
          {item.title}
        </Anchor>
      ));
      
  return (<>
  <Flex justify={'space-between'} sx={{alignItems: 'center'}} mx={"4%"}>
  <div><Breadcrumbs separator="/" mt="xs">{items}</Breadcrumbs>
  <Title mt={4} color={"#495057"}>Teachers</Title></div>
  <Button mr={"2%"}>Add Teacher</Button>
  </Flex>

  <DataTable
  ml={"4%"}
  mr={"6%"}
  mt={40}
  height="80%"
      withBorder
      borderRadius="sm"
      withColumnBorders
      striped
      highlightOnHover
      // provide data
      records={[
        { id: 1, name: 'Joe Biden', bornIn: 1942, party: 'Democratic' },
        // more records...
      ]}
      // define columns
      columns={[
        {
          accessor: 'id',
          // this column has a custom title
          title: '#',
          // right-align column
          textAlignment: 'right',
        },
        { accessor: 'name' },
        {
          accessor: 'party',
          // this column has custom cell data rendering
          render: ({ party }) => (
            <Text weight={700} color={party === 'Democratic' ? 'blue' : 'red'}>
              {party.slice(0, 3).toUpperCase()}
            </Text>
          ),
        },
        { accessor: 'bornIn' },
      ]}
      // execute this callback when a row is clicked
      onRowClick={({ name, party, bornIn }) =>
        alert(`You clicked on ${name}, a ${party.toLowerCase()} president born in ${bornIn}`)
      }
    />
  </>);
}
