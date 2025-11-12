import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ReactElement } from 'react';

// Custom render function that includes providers
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, {
    wrapper: ({ children }) => (
      <BrowserRouter>
        {children}
      </BrowserRouter>
    ),
    ...options,
  });
}

// Mock user data for testing
export const mockUser = {
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  role: 'teacher' as const,
};

// Mock auth token
export const mockToken = 'mock-jwt-token';

// Helper to simulate authenticated state
export function setupAuthenticatedTest() {
  localStorage.setItem('auth_token', mockToken);
  localStorage.setItem('user_data', JSON.stringify(mockUser));
}