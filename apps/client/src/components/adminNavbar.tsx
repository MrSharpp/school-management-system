import {
  Navbar,
  ScrollArea,
  createStyles,
  rem,
} from '@mantine/core';
import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLock,
} from '@tabler/icons-react';
import { UserButton } from '@components/UserButton';
import { LinksGroup } from '@components/NavLinks';
// import { Logo } from './Logo';

const mockdata = [
  { label: 'Dashboard', icon: IconGauge, link: '/' },
  {
    label: 'Teachers',
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { label: 'All Teachers', link: '/teachers' },
      { label: 'Add New', link: '/teachers/new' },
    ],
  },
  {
    label: 'Students',
    icon: IconCalendarStats,
    links: [
      { label: 'All Students', link: '/students' },
      { label: 'Add New', link: '/students/new' },
    ],
  },
  {
    label: 'Classes',
    icon: IconCalendarStats,
    links: [
      { label: 'All Classes', link: '/classes' },
      { label: 'Add New', link: '/classes/new' },
    ],
  },
  { label: 'Fees', icon: IconPresentationAnalytics, 
  links: '/fees' },
  { label: 'Contracts', icon: IconFileAnalytics },
  { label: 'Settings', icon: IconAdjustments },
  {
    label: 'Security',
    icon: IconLock,
    links: [
      { label: 'Enable 2FA', link: '/' },
      { label: 'Change password', link: '/' },
      { label: 'Recovery codes', link: '/' },
    ],
  },
];

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
  },

  linksInner: {
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

export function AdminNavbar() {
  const { classes } = useStyles();
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <>
      <Navbar width={{ sm: 300 }} p="md" className={classes.navbar}>
        <Navbar.Section grow className={classes.links} component={ScrollArea}>
          <div className={classes.linksInner}>{links}</div>
        </Navbar.Section>

        <Navbar.Section className={classes.footer}>
          <UserButton
            image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
            name="Ann Nullpointer"
            email="anullpointer@yahoo.com"
          />
        </Navbar.Section>
      </Navbar>
    </>
  );
}
