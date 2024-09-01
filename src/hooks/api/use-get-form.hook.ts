import { Question } from '@/models/question';
import { useQuery } from './use-query.hook';

export type GetFormResponse = {
  questions: Question[];
};

export function useGetForm() {
  return useQuery<unknown, GetFormResponse>(() => fetch('/api/form').then((res) => res.json()));
}
