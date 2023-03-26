import { observable } from '@legendapp/state';
import { Memo } from '@legendapp/state/react';
import {
  ActionIcon,
  Avatar,
  Group,
  Header,
  Menu,
  Text,
  UnstyledButton,
  createStyles,
  rem,
} from '@mantine/core';
import { MantineLogo } from '@mantine/ds';
import {
  IconBell,
  IconChevronDown,
  IconSettings,
  IconSwitchHorizontal,
  IconLogout,
  IconTrash,
} from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';

const user = {
  name: 'Mohd Ahmad',
  image: undefined,
};

const useStyles = createStyles(theme => ({
  user: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },

    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  userActive: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[8]
        : theme.colors.gray[0],
  },
}));

const userMenu = observable({ opened: false });

const AdminHeader = () => {
  const { classes, theme, cx } = useStyles();
  const navigate = useNavigate();

  return (
    <Header height={rem(60)} p="xs">
      <Group position="apart" align="center" h={'100%'}>
        <Link to="/" style={{ display: 'flex' }}>
          <MantineLogo size={rem(30)} />
        </Link>

        <Group>
          <ActionIcon size={'lg'}>
            <IconBell size={20} />
          </ActionIcon>

          <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: 'pop-top-right' }}
            onClose={() => userMenu.opened.set(false)}
            onOpen={() => userMenu.opened.set(true)}
            withinPortal
          >
            <Memo>
              {() => {
                const opened = userMenu.opened.get();

                return (
                  <Menu.Target>
                    <UnstyledButton
                      className={cx(classes.user, {
                        [classes.userActive]: opened,
                      })}
                    >
                      <Group spacing={7}>
                        <Avatar
                          src={user.image}
                          alt={user.name}
                          radius="xl"
                          size={20}
                        />
                        <Text
                          weight={500}
                          size="sm"
                          sx={{ lineHeight: 1 }}
                          mr={3}
                        >
                          {user.name}
                        </Text>
                        <IconChevronDown size={rem(12)} stroke={1.5} />
                      </Group>
                    </UnstyledButton>
                  </Menu.Target>
                );
              }}
            </Memo>

            <Menu.Dropdown>
              <Menu.Label>Settings</Menu.Label>
              <Menu.Item icon={<IconSettings size="0.9rem" stroke={1.5} />}>
                Account settings
              </Menu.Item>
              <Menu.Item
                icon={<IconSwitchHorizontal size="0.9rem" stroke={1.5} />}
              >
                Change account
              </Menu.Item>
              <Menu.Item
                icon={<IconLogout size="0.9rem" stroke={1.5} />}
                onClick={() => {
                  localStorage.removeItem('token');
                  navigate('/auth/login');
                }}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Group>
    </Header>
  );
};

export default AdminHeader;
