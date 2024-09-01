import { Button, Text } from '@mantine/core';
import { useState } from 'react';
import { Question } from '@/models/question';
import { Question as QuestionInput } from './Question';
import { useDynamicForm } from './use-dynamic-form.hook';

export interface FormProps {
  questions: Question[];
}

export function Form({ questions }: FormProps) {
  const {
    currentQuestion,
    hasSubmitted,
    hasPreviousQuestion,
    isLastQuestion,
    next,
    back,
    addResponse,
  } = useDynamicForm(questions);
  const [inputError, setInputError] = useState<string | null>(null);

  function handleNext() {
    if (!currentQuestion.response) {
      setInputError('This field is required');
      return;
    }
    next();
    setInputError(null);
  }

  if (hasSubmitted) {
    return <Text className="text-xl">Thank you for submitting the form 🥳</Text>;
  }

  return (
    <div>
      <QuestionInput
        question={currentQuestion}
        error={inputError}
        onChange={(v) => addResponse({ response: v })}
      />

      {/* Buttons */}
      <div className="flex gap-4 mt-6 justify-between">
        {hasPreviousQuestion ? <Button onClick={back}>Back</Button> : null}
        <Button onClick={handleNext}>{isLastQuestion ? 'Submit' : 'Next'}</Button>
      </div>
    </div>
  );
}
