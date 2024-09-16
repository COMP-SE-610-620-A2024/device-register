import { renderHook, act } from '@testing-library/react';
import fetchData from '../fetch_data';

{/* Testing fetchData with a mocked API call */}

global.fetch = jest.fn();

describe('fetchData', () => {
  afterEach(() => {
    fetch.mockClear(); 
  });

  test('return data successfully', async () => {
    // Create mock data
    const mockData = { name: 'John Doe' };
    fetch.mockResolvedValueOnce({
      json: async () => mockData,
    });
    // Start test
    const { result, waitForNextUpdate } = renderHook(() => fetchData('/api/user'));
    // Wait for response
    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();
    // Expected results
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  test('error in retreiving data', async () => {
    // Create error
    const mockError = new Error('Failed to fetch');
    fetch.mockRejectedValueOnce(mockError);
    // Start test
    const { result, waitForNextUpdate } = renderHook(() => fetchData('/api/user'));
    // Wait for results
    expect(result.current.loading).toBe(true);
    await waitForNextUpdate(); // Wait for the hook to handle the error
    // Expected results
    expect(result.current.loading).toBe(false); 
    expect(result.current.data).toBe([]); 
    expect(result.current.error).toBe(mockError);
  });
});