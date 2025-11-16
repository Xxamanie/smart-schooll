import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

// Automatically clear mocks between every test
beforeEach(() => {
  jest.clearAllMocks();
});

// Cleanup after each test case
afterEach(() => {
  cleanup();
});