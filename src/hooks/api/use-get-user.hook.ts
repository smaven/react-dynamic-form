import { useQuery } from './use-query.hook';

export type GetUserResponse = {
  name: string;
};

export function useGetUser() {
  return useQuery<unknown, GetUserResponse>(() => fetch('/api/user').then((res) => res.json()));
}
