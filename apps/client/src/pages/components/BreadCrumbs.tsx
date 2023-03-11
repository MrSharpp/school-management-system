import { Anchor, Breadcrumbs, Button, Flex, Grid, Title } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import { TextInput$ } from 'ui';

const BreadCrumbs = ({ path }: { path: { title: string; href: string }[] }) => {
  const items = path.map((item, index) =>
    <Anchor component={Link} to={item.href} key={index}>
      {item.title}
    </Anchor>
  );

  return (
    <Grid align="center" mb="md">
      <Grid.Col>
        <Flex justify={'space-between'} sx={{ alignItems: 'center' }}>
          <div>
            <Breadcrumbs separator="/" mt="xs">
              {items}
            </Breadcrumbs>

            <Title mt={4} color={'#495057'}>
              {path[1].title}
            </Title>
          </div>
        </Flex>
      </Grid.Col>
    </Grid>
  );
};

export { BreadCrumbs };
