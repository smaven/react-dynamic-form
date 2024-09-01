import { produce } from 'immer';
import { useReducer } from 'react';
import {
  ResponseConditionOperation as ConditionOperation,
  END_QUESTION_ID,
  Question,
  QuestionType,
} from '@/models/question';

export interface UseDynamicFormOutput {
  currentQuestion: QuestionWithResponse;
  hasNextQuestion: boolean;
  hasPreviousQuestion: boolean;
  isLastQuestion: boolean;
  hasSubmitted: boolean;
  next: () => void;
  back: () => void;
  addResponse: (response: Pick<QuestionWithResponse, 'response'>) => void;
}

export function useDynamicForm(questions: Question[]): UseDynamicFormOutput {
  const [state, dispatch] = useReducer(dynamicFormReducer, {
    questions,
    stack: [],
    currentQuestion: questions[0],
    hasNextQuestion: questions.length > 1,
    hasPreviousQuestion: false,
    hasSubmitted: false,
  });

  const submit = () => {
    const { stack, currentQuestion } = state;
    const allQuestionsAnswered = stack.concat(currentQuestion);
    saveResponses(allQuestionsAnswered);
    dispatch({ type: DynamicFormActionType.Submit });
  };

  const next = () => {
    const { stack, currentQuestion } = state;

    // If there are no more questions, submit the form
    if (!state.hasNextQuestion) {
      if (stack.length === 0) throw new Error('Cannot submit without answering any questions');
      submit();
      return;
    }

    // If the go-to question is the end question, submit the form
    const goToQuestionId = getGoToQuestionId(currentQuestion);
    if (goToQuestionId === END_QUESTION_ID) {
      submit();
      return;
    }

    dispatch({ type: DynamicFormActionType.Next });
  };

  return {
    currentQuestion: state.currentQuestion,
    hasNextQuestion: state.hasNextQuestion,
    hasPreviousQuestion: state.hasPreviousQuestion,
    hasSubmitted: state.hasSubmitted,
    isLastQuestion: questions[questions.length - 1].id === state.currentQuestion.id,
    next,
    back: () => dispatch({ type: DynamicFormActionType.Back }),
    addResponse: (response) =>
      dispatch({ type: DynamicFormActionType.AddResponse, payload: response }),
  };
}

function dynamicFormReducer(state: DynamicFormState, action: DynamicFormAction): DynamicFormState {
  return produce(state, (draft) => {
    const { currentQuestion, stack, questions } = draft;
    const currentQuestionIndex = questions.findIndex((q) => q.id === currentQuestion.id);

    switch (action.type) {
      case DynamicFormActionType.Next:
        // By default, go to the next question in the list
        let nextQuestion = questions[currentQuestionIndex + 1];

        // Check if the current question specifies a go-to question based on the response
        const goToQuestionId = getGoToQuestionId(currentQuestion);
        if (goToQuestionId && goToQuestionId !== END_QUESTION_ID) {
          nextQuestion = questions.find((q) => q.id === goToQuestionId)!;
        }

        // Update the state
        draft.stack.push(currentQuestion);
        draft.currentQuestion = nextQuestion;
        draft.hasNextQuestion = hasNextQuestion(nextQuestion, questions);
        draft.hasPreviousQuestion = true;

        break;
      case DynamicFormActionType.Back:
        if (stack.length === 0) {
          throw new Error('Cannot go back from the first question');
        }

        // Update the state
        draft.currentQuestion = draft.stack.pop()!;
        draft.hasNextQuestion = true;
        draft.hasPreviousQuestion = stack.length > 0;

        break;
      case DynamicFormActionType.Submit:
        const firstQuestion = questions[0];

        // Update the state
        draft.stack = [];
        draft.currentQuestion = firstQuestion;
        draft.hasNextQuestion = questions.length > 1;
        draft.hasPreviousQuestion = false;
        draft.hasSubmitted = true;

        break;
      case DynamicFormActionType.AddResponse:
        draft.currentQuestion.response = action.payload.response;
        break;
    }
  });
}

function getGoToQuestionId(question: QuestionWithResponse): string | null {
  if (question.response === undefined) {
    return null;
  }
  let goToQuestionId: string | undefined;

  if (question.type === QuestionType.YesNo) {
    goToQuestionId =
      question.response === 'yes'
        ? question.responseActions.yes?.goToQuestionId
        : question.responseActions.no?.goToQuestionId;
  } else if (question.type === QuestionType.Number) {
    goToQuestionId = question.responseActions.find((condition) => {
      switch (condition.operation) {
        case ConditionOperation.GreaterThan:
          return question.response! > condition.value;
        case ConditionOperation.LessThan:
          return question.response! < condition.value;
        case ConditionOperation.Equal:
          return question.response! === condition.value;
        default:
          return false;
      }
    })?.goToQuestionId;
  }

  return goToQuestionId ?? null;
}

function hasNextQuestion(currentQuestion: Question, questions: Question[]): boolean {
  const hasGoToQuestion = getGoToQuestionId(currentQuestion) !== null;
  if (hasGoToQuestion) return true;

  const currentQuestionIndex = questions.findIndex((q) => q.id === currentQuestion.id);
  return currentQuestionIndex < questions.length - 1;
}

function saveResponses(questionsWithResponses: QuestionWithResponse[]) {
  const responses: StoredQuestionResponse[] = questionsWithResponses
    .filter((q) => q.response !== undefined)
    .map((q) => ({
      id: q.id,
      label: q.label,
      response: q.response,
    }));

  const storedResponses = localStorage.getItem('responses');
  const responsesToStore = storedResponses ? JSON.parse(storedResponses) : [];
  responsesToStore.push({ date: new Date().toISOString(), responses });

  localStorage.setItem('responses', JSON.stringify(responsesToStore));
}

export type QuestionResponse = { id: Question['id'] } & (
  | {
      type: QuestionType.YesNo;
      response?: string;
    }
  | {
      type: QuestionType.Number;
      response?: number;
    }
);

export type QuestionWithResponse = Question & QuestionResponse;

export type StoredQuestionResponse = Pick<QuestionWithResponse, 'id' | 'label' | 'response'>;

export type DynamicFormState = {
  questions: Question[];
  stack: QuestionWithResponse[];
  currentQuestion: QuestionWithResponse;
  hasNextQuestion: boolean;
  hasPreviousQuestion: boolean;
  hasSubmitted: boolean;
};

export enum DynamicFormActionType {
  Next = 'NEXT',
  Back = 'BACK',
  Submit = 'SUBMIT',
  AddResponse = 'ADD_RESPONSE',
}

export type NextAction = {
  type: DynamicFormActionType.Next;
};

export type BackAction = {
  type: DynamicFormActionType.Back;
};

export type SubmitAction = {
  type: DynamicFormActionType.Submit;
};

export type AddResponseAction = {
  type: DynamicFormActionType.AddResponse;
  payload: Pick<QuestionWithResponse, 'response'>;
};

export type DynamicFormAction = NextAction | BackAction | SubmitAction | AddResponseAction;
