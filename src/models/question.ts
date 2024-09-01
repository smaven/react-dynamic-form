export enum QuestionType {
  YesNo = 'yes-no',
  Number = 'number',
}

export type GoToQuestionId = string | null;

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
