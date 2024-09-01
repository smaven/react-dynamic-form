import { Question } from '@/models/question';

export interface FormProps {
  questions: Question[];
}

export function Form({ questions }: FormProps) {
  console.log('🚀 ~ Form ~ questions:', questions);

  return (
    <div>
      <h1>Form</h1>
    </div>
  );
}
