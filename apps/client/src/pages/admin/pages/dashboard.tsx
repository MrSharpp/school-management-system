import { Text, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export function Dasboard() {
  const navigate = useNavigate()

  return (<><Text>Dashboard</Text>
  <Button onClick={() => navigate('/teachers')}> Teachers</Button></>)
}
