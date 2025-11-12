import { AppError, errorCodes, handleApiError } from '../utils/error-handling';
import { AxiosError } from 'axios';

describe('Error Handling', () => {
  describe('AppError', () => {
    it('creates an error with correct properties', () => {
      const error = new AppError('Test error', errorCodes.VALIDATION_ERROR, 400);
      
      expect(error.message).toBe('Test error');
      expect(error.code).toBe(errorCodes.VALIDATION_ERROR);
      expect(error.statusCode).toBe(400);
      expect(error.name).toBe('AppError');
    });
  });

  describe('handleApiError', () => {
    it('handles authentication errors', () => {
      const axiosError = new AxiosError(
        'Unauthorized',
        '401',
        {},
        {},
        {
          status: 401,
          data: { message: 'Authentication failed' },
        } as any
      );

      const error = handleApiError(axiosError);
      
      expect(error).toBeInstanceOf(AppError);
      expect(error.code).toBe(errorCodes.AUTH_ERROR);
      expect(error.statusCode).toBe(401);
    });

    it('handles validation errors', () => {
      const axiosError = new AxiosError(
        'Bad Request',
        '400',
        {},
        {},
        {
          status: 400,
          data: { message: 'Invalid input' },
        } as any
      );

      const error = handleApiError(axiosError);
      
      expect(error).toBeInstanceOf(AppError);
      expect(error.code).toBe(errorCodes.VALIDATION_ERROR);
      expect(error.statusCode).toBe(400);
    });

    it('handles server errors', () => {
      const axiosError = new AxiosError(
        'Server Error',
        '500',
        {},
        {},
        {
          status: 500,
          data: { message: 'Internal server error' },
        } as any
      );

      const error = handleApiError(axiosError);
      
      expect(error).toBeInstanceOf(AppError);
      expect(error.code).toBe(errorCodes.SERVER_ERROR);
      expect(error.statusCode).toBe(500);
    });

    it('handles network errors', () => {
      const axiosError = new AxiosError(
        'Network Error',
        '',
        {},
        {},
        undefined
      );

      const error = handleApiError(axiosError);
      
      expect(error).toBeInstanceOf(AppError);
      expect(error.code).toBe(errorCodes.NETWORK_ERROR);
    });

    it('handles unknown errors', () => {
      const unknownError = new Error('Unknown error');
      
      const error = handleApiError(unknownError);
      
      expect(error).toBeInstanceOf(AppError);
      expect(error.code).toBe(errorCodes.UNKNOWN_ERROR);
    });
  });
});