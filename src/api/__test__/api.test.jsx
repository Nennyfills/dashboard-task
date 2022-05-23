import Http from '../axios';

describe('HTTP client', () => {
  it('should have a base url attached', () => {
    expect(Http.defaults.baseURL).toBeDefined();
  });

  it('should attach the authentication token', () => {
    Http.defaults.headers.Authorization = 'Bearer token';
    Http.interceptors.request.handlers[0].fulfilled(Http.defaults);

    expect(Http.defaults.headers.Authorization).toBe('Bearer token');
  });

  it('should return the axios response data', () => {
    const response = Http.interceptors.response.handlers[0].fulfilled({
      data: { data: [] },
    });
    expect(response).toEqual({ data: { data: [] } });
  });
});
