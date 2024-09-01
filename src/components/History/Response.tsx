import { Card, Text } from '@mantine/core';
import { dayjs } from '@/lib/dayjs';
import { StoredQuestionResponse, StoredResponse } from '@/lib/local-storage';

export interface ResponseProps {
  response: StoredResponse;
}

export function Response({ response }: ResponseProps) {
  const date = dayjs(response.date).format('MMMM D, YYYY h:mm A');

  const getResponseColor = (question: StoredQuestionResponse) => {
    switch (question.response) {
      case 'yes':
        return 'green';
      case 'no':
        return 'red';
      default:
        return '';
    }
  };

  return (
    <Card shadow="md">
      <Card.Section className="flex flex-col p-4">
        <Text c="dimmed" className="text-sm">
          {date}
        </Text>

        {response.responses.map((question) => (
          <div key={question.id} className="mt-4 flex flex-col justify-between sm:flex-row">
            <Text>{question.label}</Text>
            <Text c={getResponseColor(question)} tt="capitalize">
              {question.response}
            </Text>
          </div>
        ))}
      </Card.Section>
    </Card>
  );
}
