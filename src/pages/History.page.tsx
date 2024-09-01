import { History } from '@/components/History/History';
import { Layout } from '@/layouts/Layout';

export function HistoryPage() {
  return (
    <Layout title="Your previous responses 🗂️">
      <History />
    </Layout>
  );
}
