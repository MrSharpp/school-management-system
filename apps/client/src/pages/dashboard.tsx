import { Text, Button, Flex } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export default function Dasboard() {
  const navigate = useNavigate();

  return (
    <>
      <Text>Dashboard</Text>
      <Flex gap={"sm"}>
      <Button onClick={() => navigate('/teachers')}> Teachers</Button>
      <Button onClick={() => navigate('/classes')}> Classes</Button>
      <Button onClick={() => navigate('/students')}> Students</Button>

      </Flex>
    </>
  );
}
