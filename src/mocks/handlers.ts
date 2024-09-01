import { http, HttpResponse } from 'msw';

export const handlers = [
  // An example handler
  http.get('/api/user', () => HttpResponse.json({ name: 'John Maverick' })),
];
