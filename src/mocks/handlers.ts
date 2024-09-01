import { http, HttpResponse } from 'msw';
import { Question, QuestionType, ResponseConditionOperation as Operation } from '@/models/question';

const questions: Question[] = [
  {
    id: 'operate-in',
    type: QuestionType.YesNo,
    responseActions: {
      yes: { goToQuestionId: 'employee-count' },
      no: { goToQuestionId: null },
    },
  },
  {
    id: 'employee-count',
    type: QuestionType.Number,
    responseActions: [
      {
        operation: Operation.GreaterThan,
        value: 100,
        goToQuestionId: null,
      },
    ],
  },
  {
    id: 'serves-food',
    type: QuestionType.YesNo,
    responseActions: {
      yes: { goToQuestionId: 'serves-hot-food' },
      no: { goToQuestionId: 'live-music' },
    },
  },
  {
    id: 'serves-hot-food',
    type: QuestionType.YesNo,
    responseActions: {},
  },
  {
    id: 'open-past-midnight',
    type: QuestionType.YesNo,
    responseActions: {},
  },
  {
    id: 'live-music',
    type: QuestionType.YesNo,
    responseActions: {},
  },
];

export const handlers = [http.get('/api/form', () => HttpResponse.json({ questions }))];
