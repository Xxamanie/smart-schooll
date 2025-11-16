import { AxiosError } from 'axios';

export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode?: number,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const errorCodes = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  AUTH_ERROR: 'AUTH_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const;

export function handleApiError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof AxiosError) {
    const statusCode = error.response?.status;
    
    if (statusCode === 401 || statusCode === 403) {
      return new AppError(
        'Authentication failed. Please log in again.',
        errorCodes.AUTH_ERROR,
        statusCode,
        error
      );
    }

    if (statusCode === 400) {
      return new AppError(
        'Invalid request. Please check your input.',
        errorCodes.VALIDATION_ERROR,
        statusCode,
        error
      );
    }

    if (statusCode && statusCode >= 500) {
      return new AppError(
        'Server error. Please try again later.',
        errorCodes.SERVER_ERROR,
        statusCode,
        error
      );
    }

    if (error.message === 'Network Error') {
      return new AppError(
        'Network error. Please check your connection.',
        errorCodes.NETWORK_ERROR,
        undefined,
        error
      );
    }
  }

  return new AppError(
    'An unexpected error occurred.',
    errorCodes.UNKNOWN_ERROR,
    undefined,
    error instanceof Error ? error : undefined
  );
}

export function logError(error: unknown): void {
  const appError = error instanceof AppError ? error : handleApiError(error);
  
  // In development, log the full error
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', {
      message: appError.message,
      code: appError.code,
      statusCode: appError.statusCode,
      originalError: appError.originalError,
    });
    return;
  }

  // In production, we might want to send this to an error reporting service
  // TODO: Integrate with an error reporting service like Sentry
  console.error('Error:', {
    message: appError.message,
    code: appError.code,
    statusCode: appError.statusCode,
  });
}