export enum QuestionType {
  YesNo = 'yes-no',
  Number = 'number',
}

export type GoToQuestionId = string;

export enum ResponseConditionOperation {
  GreaterThan = '>',
  LessThan = '<',
  Equal = '=',
}

export type ResponseCondition = {
  operation: string;
  value: number;
  goToQuestionId: GoToQuestionId;
};

export type Question = {
  id: string;
  label: string;
} & (
  | {
      type: QuestionType.YesNo;
      responseActions: {
        yes?: {
          goToQuestionId: GoToQuestionId;
        };
        no?: {
          goToQuestionId: GoToQuestionId;
        };
      };
    }
  | {
      type: QuestionType.Number;
      responseActions: ResponseCondition[];
    }
);

export const END_QUESTION_ID = 'END';
