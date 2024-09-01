import { Text } from '@mantine/core';
import { Response } from './Response';
import { useGetHistory } from './use-get-history.hook';

export function History() {
  const { responses } = useGetHistory();

  if (!responses.length) {
    return (
      <Text className="text-center">
        No responses have been recorded.
        <br />
        Complete the form to see your responses here.
      </Text>
    );
  }

  return (
    <div className="flex flex-col items-stretch gap-8 sm:min-w-96">
      {responses.map((response) => (
        <Response key={response.date} response={response} />
      ))}
    </div>
  );
}
