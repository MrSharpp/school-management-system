import {
  ActionIcon,
  Grid,
  Flex,
  Button,
  Container,
  Text,
  Badge,
} from '@mantine/core';
import {
  IconEdit,
  IconSearch,
  IconTrash,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { observable } from '@legendapp/state';
import { TextInput$, DataTable$ } from 'ui';
import { useObservableQuery } from '@legendapp/state/react-hooks/useObservableQuery';
import ApiCalls from '@APIService/index';
import { BreadCrumbs } from '@components/BreadCrumbs';
import {modals} from '@mantine/modals'
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {notifications} from '@mantine/notifications'
import queryClient from '@APIService/queryClient';

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

  const deleteClassMutation = useMutation({
    mutationFn: ApiCalls.deleteClass,

    onError(error: AxiosError, variables, context) {
      console.log(error);

      notifications.show({
        title: 'Error',
        message: 'OOPS! an unexpected error occoured!',
        color: 'red',
      });
    },

    onSuccess(data, variables, context) {
      console.log(variables);

      queryClient.setQueryData(['get_classes'], (old: any) =>
        old.filter((classObj: any) => classObj.classId !== variables.id)
      );

      notifications.show({
        title: 'Success',
        message: 'Sucessfully Deleted Teacher!',
      });
    },
  })

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
                            navigate(`edit/${data.peek().classId}`, {
                              state: { data: data.peek() },
                            })}
                        >
                          <IconEdit size={16} />
                        </ActionIcon>
                        <ActionIcon color="red" onClick={() => {
                      modals.openConfirmModal({
                        title: 'Delete Teacher',
                        centered: true,
                        children: (
                          <Text size="sm">
                            Are you sure want to delete this teacher?
                          </Text>
                        ),
                        labels: {
                          confirm: 'Delete Teacher',
                          cancel: "No don't delete it",
                        },
                        confirmProps: { color: 'red' },
                        onCancel: () => console.log('Cancel'),
                        onConfirm: () =>
                        deleteClassMutation.mutate({
                            id: data.peek().classId,
                          }),
                      });
                    }}>
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
