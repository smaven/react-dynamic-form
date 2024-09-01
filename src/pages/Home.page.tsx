import { Text } from '@mantine/core';
import { Form } from '@/components/Form/Form';
import { useGetForm } from '@/hooks/api/use-get-form.hook';
import { Layout } from '@/layouts/Layout';

export function HomePage() {
  const { data, loading, error } = useGetForm();

  if (loading) {
    return (
      <Layout>
        <Text>Loading...</Text>
      </Layout>
    );
  }
  if (error) {
    return (
      <Layout>
        <Text c="red">Error: {error.message}</Text>
      </Layout>
    );
  }

  if (!data || !data.questions.length) {
    return (
      <Layout>
        <Text c="red">Unable to load the form</Text>
      </Layout>
    );
  }

  return (
    <Layout title="Tell us about your business 👨🏻‍💼">
      <Form questions={data.questions} />
    </Layout>
  );
}
