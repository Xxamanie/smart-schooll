import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Login } from '../ui/views/login';
import { useAuthStore } from '../store/auth';

// Mock the auth store
jest.mock('../store/auth', () => ({
  useAuthStore: jest.fn(),
}));

describe('Login Component', () => {
  const mockLogin = jest.fn();
  
  beforeEach(() => {
    (useAuthStore as jest.Mock).mockImplementation(() => ({
      login: mockLogin,
      isLoading: false,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders login form', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('handles successful login', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });

  it('shows error message on invalid input', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);

    const errorMessage = await screen.findByText(/email is required/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('shows loading state during authentication', () => {
    (useAuthStore as jest.Mock).mockImplementation(() => ({
      login: mockLogin,
      isLoading: true,
    }));

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getByRole('button', { name: /loading/i })).toBeInTheDocument();
  });
});