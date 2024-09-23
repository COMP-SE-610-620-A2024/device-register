import { renderHook, waitFor } from '@testing-library/react';
import { useFetchData } from '../fetch_data';

{/* Testing fetchData with a mocked API call */}



describe('fetchData', () => {
  afterEach(() => {
    fetch.mockClear(); 
  });

  test('return data successfully', async () => {

    const mockData = { name: 'Test User' };
    fetch.mockResolvedValueOnce({json: async () => mockData,});

    const { result } = renderHook(() => useFetchData('/test/'));
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBeNull();

  await waitFor(() => {expect(result.current.loading).toBe(false);});

    expect(result.current.data).toEqual(mockData);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  test('error in retreiving data', async () => {

    const mockError = new Error('Failed to fetch');
    fetch.mockRejectedValue(mockError);

    const { result } = renderHook(() => useFetchData('/test/'));
    expect(result.current.loading).toBe(true); 
    expect(result.current.data).toEqual([]);   
    expect(result.current.error).toBeNull();  

   await waitFor(() => {expect(result.current.loading).toBe(false)}, {timeout: 5000});

    expect(result.current.data).toStrictEqual([]); 
    expect(result.current.loading).toBe(false); 
    expect(result.current.error).toBe(mockError);
  }, 6000);
});