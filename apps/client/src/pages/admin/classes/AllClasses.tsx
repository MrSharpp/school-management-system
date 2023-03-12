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
  Indicator,
  Badge,
} from '@mantine/core';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import {
  IconEdit,
  IconSearch,
  IconTrash,
  IconPlus,
  IconEye,
  IconX,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import sortBy from 'lodash/sortBy';
import debounce from 'lodash/debounce';
import { observable } from '@legendapp/state';
import { observer, useObserveEffect, Show, For } from '@legendapp/state/react';
import { TextInput$, DataTable$ } from 'ui';
import { useObservableQuery } from '@legendapp/state/react-hooks/useObservableQuery';
import ApiCalls from '@APIService/index';
import { BreadCrumbs } from '@pages/components/BreadCrumbs';

const PAGE_SIZE = 10;

const state = observable({
  initialRecords: [],
  query: '',
  sortStatus: {
    columnAccessor: 'name',
    direction: 'asc',
  },
  page: 1,
});

const debouncedQuery = observable('');

const getDebounceQuery = debounce(() => {
  debouncedQuery.set(state.query.get());
}, 300);

state.query.onChange(() => {
  getDebounceQuery();
});

export default function AllClasses() {
  const navigate = useNavigate();

  const getClassesQuery = useObservableQuery({
    queryKey: ['get_classes'],
    queryFn: ApiCalls.getClasses,
    initialData: [],
  });

  return (
    <Container fluid>
      <Grid align="center" mb="md">
        <Grid.Col>
          <Flex justify={'space-between'} sx={{ alignItems: 'center' }}>
            <BreadCrumbs
              path={[
                { title: 'Admin', href: '/' },
                { title: 'Classes', href: '/classes' },
              ]}
            />
            <Button mr={'1%'} onClick={() => navigate('new')}>
              Add Class
            </Button>
          </Flex>
        </Grid.Col>

        <Grid.Col xs={3} sm={3}>
          <TextInput$
            placeholder="Search classes..."
            icon={<IconSearch size={16} />}
            value$={state.query}
            onChange={e => state.query.set(e.currentTarget.value)}
          />
        </Grid.Col>
      </Grid>

      <Grid grow>
        <Grid.Col span={6}>
          <div>
            <DataTable$
              withBorder
              records={getClassesQuery.data}
              fetching$={getClassesQuery.isLoading}
              columns={[
                {
                  accessor: 'classId',
                },
                {
                  title: 'Class Name',
                  accessor: 'className',
                },
                {
                  title: 'Class Strength',
                  accessor: 'numbers',
                },
                {
                  title: 'Sections',
                  accessor: 'sections',
                  render({sections}: {sections: any}) {
                    return (
                      <>
                      <Flex gap={'sm'}>
                       
                      {sections.get().length  && (sections.get().split(',')?.map((section:string) => <Badge  size="md" color="teal" radius="xl">
                        {section}
                      </Badge>))}

                      </Flex>
                      </>
                    );
                  },
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
            />
          </div>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
