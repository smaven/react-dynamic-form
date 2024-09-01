import { http, HttpResponse } from 'msw';
import {
  Question,
  QuestionType,
  ResponseConditionOperation as Operation,
  END_QUESTION_ID,
} from '@/models/question';

const questions: Question[] = [
  {
    id: 'operate-in',
    label: 'Does your business operate in the CA?',
    type: QuestionType.YesNo,
    responseActions: {
      yes: { goToQuestionId: 'employee-count' },
      no: { goToQuestionId: END_QUESTION_ID },
    },
  },
  {
    id: 'employee-count',
    label: 'How many employees do you have?',
    type: QuestionType.Number,
    responseActions: [
      {
        operation: Operation.GreaterThan,
        value: 100,
        goToQuestionId: END_QUESTION_ID,
      },
    ],
  },
  {
    id: 'serves-food',
    label: 'Do you serve food?',
    type: QuestionType.YesNo,
    responseActions: {
      yes: { goToQuestionId: 'serves-hot-food' },
      no: { goToQuestionId: 'live-music' },
    },
  },
  {
    id: 'serves-hot-food',
    label: 'Do you serve hot food?',
    type: QuestionType.YesNo,
    responseActions: {},
  },
  {
    id: 'open-past-midnight',
    label: 'Are you open past midnight?',
    type: QuestionType.YesNo,
    responseActions: {},
  },
  {
    id: 'live-music',
    label: 'Do you host live music?',
    type: QuestionType.YesNo,
    responseActions: {},
  },
];

export const handlers = [http.get('/api/form', () => HttpResponse.json({ questions }))];
