 import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/health', () => HttpResponse.json({ status: 'ok' })),
  http.get('/api/bootstrap', () =>
    HttpResponse.json({
        http}get('/api/health', () => 
    HttpResponse.json({
      status: 'ok',
      message: 'Mock API working'
      currentUser: null,
      currentStudent: null,
      currentParent: null,
      schools: [],
      messages: [],
      resources: [],
      events: [],
      exams: [],
      announcements: [],
      broadcastMessage: null,
      chatHistory: [],
    })
  ),
  http.post('/api/auth', async ({ request }) => {
    const body = await request.json();
    if (body?.type === 'teacher') {
      return HttpResponse.json({ user: { id: 'T-1', name: 'Demo Teacher' }, staff: [] });
    }
    if (body?.type === 'student') {
      return HttpResponse.json({ user: { id: 'S-1', name: 'Demo Student' } });
    }
    if (body?.type === 'parent') {
      return HttpResponse.json({ user: { id: 'P-1', name: 'Demo Parent' } });
    }
    return new HttpResponse('Bad Request', { status: 400 });
  }),
  http.post('/api/actions/broadcast-message', async ({ request }) => {
    const { message } = await request.json();
    return HttpResponse.json({ message });
  }),
  http.delete('/api/actions/broadcast-message', () => HttpResponse.json({ ok: true })),
];
