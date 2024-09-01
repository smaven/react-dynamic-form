import { QuestionWithResponse } from '@/components/Form/use-dynamic-form.hook';

export enum StorageKey {
  Responses = 'responses',
}

export type StoredQuestionResponse = Pick<QuestionWithResponse, 'id' | 'label' | 'response'>;

export type StoredResponse = {
  date: string;
  responses: StoredQuestionResponse[];
};

export interface StorageValueByKey {
  [StorageKey.Responses]: StoredResponse[];
}

class LocalStorage {
  getItem<K extends keyof StorageValueByKey>(key: K): StorageValueByKey[K] | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  setItem<K extends keyof StorageValueByKey>(key: K, value: StorageValueByKey[K]) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export const lStorage = new LocalStorage();
