import { Form } from '@/components/Form/Form';
import { useGetForm } from '@/hooks/api/use-get-form.hook';
import { Layout } from '@/layouts/Layout';

export function HomePage() {
  const { data, loading, error } = useGetForm();

  if (loading) {
    return <Layout>Loading...</Layout>;
  }
  if (error) {
    return <Layout>Error: {error.message}</Layout>;
  }

  return (
    <Layout title="Tell us about your business 👨🏻‍💼">
      <Form questions={data?.questions ?? []} />
    </Layout>
  );
}
