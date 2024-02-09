import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => {
  const originalModule = jest.requireActual<typeof import('lodash')>('lodash');
  return {
    __esModule: true,
    ...originalModule,
    throttle: jest.fn((fn) => fn),
  };
});

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const mockedAxiosInstance: Pick<AxiosInstance, 'get'> = {
      get: jest.fn().mockResolvedValue({ data: '' }),
    };
    (axios.create as jest.MockedFunction<typeof axios.create>).mockReturnValue(
      mockedAxiosInstance as unknown as AxiosInstance,
    );
    await throttledGetDataFromApi('relativePath');
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockedAxiosInstance: Pick<AxiosInstance, 'get'> = {
      get: jest.fn().mockResolvedValue({ data: 'test data' }),
    };
    (axios.create as jest.MockedFunction<typeof axios.create>).mockReturnValue(
      mockedAxiosInstance as AxiosInstance,
    );

    await throttledGetDataFromApi('relativePath');
    expect(mockedAxiosInstance.get).toHaveBeenCalledWith('relativePath');
  });

  test('should return response data', async () => {
    const mockedAxiosInstance: unknown = {
      get: jest.fn().mockResolvedValue({ data: 'test data' }),
    };
    (axios.create as jest.MockedFunction<typeof axios.create>).mockReturnValue(
      mockedAxiosInstance as AxiosInstance,
    );

    const response = await throttledGetDataFromApi('relativePath');

    expect(response).toEqual('test data');
  });
});
