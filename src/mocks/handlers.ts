import { http, HttpResponse } from 'msw';
import { questions } from './form.mocks';

export const handlers = [http.get('/api/form', () => HttpResponse.json({ questions }))];
