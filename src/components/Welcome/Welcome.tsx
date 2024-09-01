import { Title, Text, Anchor } from '@mantine/core';
import classes from './Welcome.module.css';
import { useGetUser } from '@/hooks/api/use-get-user.hook';

export function Welcome() {
  const { data, loading } = useGetUser();

  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        Welcome to{' '}
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          Mantine
        </Text>
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        <span>{loading ? 'Loading...' : `Hello ${data?.name} 👋`}</span>
        <br />
        This starter Vite project includes a minimal setup, if you want to learn more on Mantine +
        Vite integration follow{' '}
        <Anchor href="https://mantine.dev/guides/vite/" size="lg">
          this guide
        </Anchor>
        . To get started edit pages/Home.page.tsx file.
      </Text>
    </>
  );
}
