import { NumberInput, Radio, Stack } from '@mantine/core';
import { QuestionType } from '@/models/question';
import { QuestionWithResponse } from './use-dynamic-form.hook';

export interface QuestionProps {
  question: QuestionWithResponse;
  error?: string | null;
  onChange?: (value: string | number) => void;
}

export function Question({ question, error, onChange }: QuestionProps) {
  function handleChange(value: string | number) {
    if (value === '') return;
    onChange?.(value);
  }

  switch (question.type) {
    case QuestionType.YesNo:
      return (
        <Radio.Group
          key={question.id}
          name={question.id}
          label={question.label}
          onChange={(value) => handleChange(value)}
          defaultValue={question.response}
          error={error}
        >
          <Stack>
            <Radio label="Yes" value="yes" />
            <Radio label="No" value="no" />
          </Stack>
        </Radio.Group>
      );
    case QuestionType.Number:
      return (
        <NumberInput
          key={question.id}
          name={question.id}
          label={question.label}
          placeholder="Enter number"
          defaultValue={question.response}
          onChange={(value) => handleChange(value)}
          error={error}
        />
      );
    default:
      return null;
  }
}
