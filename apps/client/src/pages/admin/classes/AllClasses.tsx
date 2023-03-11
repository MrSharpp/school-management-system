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

interface IState {
  query: string;
  sortStatus: {
    columnAccessor: string;
    direction: 'asc' | 'desc';
  };
  page: number;

  selectedClass: null | {
    id: number | string;
    sections: string[];
    className: string;
  };
}

const state = observable<IState>({
  query: '',
  sortStatus: {
    columnAccessor: 'name',
    direction: 'asc',
  },
  page: 1,

  selectedClass: null,
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

  const items = [
    { title: 'Admin', href: '/' },
    { title: 'Classes', href: '/classes' },
  ].map((item, index) =>
    <Anchor component={Link} to={item.href} key={index}>
      {item.title}
    </Anchor>
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
                Classes
              </Title>
            </div>
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
              records={[
                { id: 1, className: 'I', sections: ['A', 'B', 'C', 'D'], numbers: 124 },
                { id: 2, className: 'XII', sections: ['E', 'F', 'G', 'H'], numbers: 242 },
              ]}
              columns={[
                {
                  accessor: 'id',
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
                  accessor: 'none',
                  render(data) {
                    return (
                      <>
                      <Flex gap={'sm'}>
                      <Badge size="md" color="teal" radius="xl" onClick={() => console.log('hello')
                      }>
                        Section A
                      </Badge>
                      <Badge  size="md" color="teal" radius="xl">
                        Section B
                      </Badge>
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

        <Show if={state.selectedClass}>
          <SelectedClass selectedClass={state.selectedClass} />
        </Show>
      </Grid>
    </Container>
  );
}

function SelectedClass({ selectedClass }: { selectedClass: any }) {
  return (
    <Grid.Col span={6}>
      <Paper withBorder p="sm">
        <Group position="apart">
          <Title order={4}>
            {' '}Class {selectedClass.className} Sections {' '}
          </Title>

          <ActionIcon onClick={() => selectedClass.set(null)}>
            <IconX size={16} />
          </ActionIcon>
        </Group>

        <TextInput$
          my="md"
          size="xs"
          label="Add More Sections"
          placeholder="Add section"
          rightSection={
            <ActionIcon variant="transparent">
              <IconPlus size={16} />
            </ActionIcon>
          }
        />

        <Stack spacing={'xs'} mt={'md'}>
          <For each={selectedClass.sections}>
            {section =>
              <UnstyledButton
                sx={theme => ({
                  border: `1px solid ${theme.colors.gray[3]}`,
                  padding: `calc(${theme.spacing.xs}/2) ${theme.spacing.xs}`,
                  paddingRight: 3,
                  borderRadius: 3,

                  '&:hover': {
                    background: theme.colors.gray[0],
                  },
                })}
              >
                <Group position="apart">
                  <Text size={'xs'}>
                    Section {section}
                  </Text>
                  <Text size={'xs'} pr="sm">
                    278 Students
                  </Text>
                </Group>
              </UnstyledButton>}
          </For>
        </Stack>
      </Paper>
    </Grid.Col>
  );
}
