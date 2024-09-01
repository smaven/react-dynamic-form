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
    return (
      <Text className="text-xl" data-testid="thank-you-message">
        Thank you for submitting the form 🥳
      </Text>
    );
  }

  return (
    <div>
      <QuestionInput
        question={currentQuestion}
        error={inputError}
        onChange={(v) => addResponse({ response: v })}
      />

      {/* Buttons */}
      <div className="mt-6 flex justify-between gap-4">
        {hasPreviousQuestion ? (
          <Button variant="default" onClick={back} aria-label="Back">
            Back
          </Button>
        ) : null}
        <Button onClick={handleNext} aria-label={isLastQuestion ? 'Submit' : 'Next'}>
          {isLastQuestion ? 'Submit' : 'Next'}
        </Button>
      </div>
    </div>
  );
}
