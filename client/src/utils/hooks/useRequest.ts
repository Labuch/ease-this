export type Endpoint = string;
export type Payload = unknown;
export type Method = string;

const API_URL = 'http://localhost:3000'

// Hook for API call without cache
function useRequest<Data, Error = unknown>(): (
  endpoint: Endpoint,
  payload?: Payload,
  method?: Method
) => Promise<any> {

  async function request(
    endpoint: Endpoint,
    
    payload?: Payload,
    method: Method = 'POST'
  ) {

    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
       
        
    }

    try {
      const data = await fetch(`${API_URL}${endpoint}`, {
        ...(payload ? { body: JSON.stringify(payload) } : null),
        method,
        headers,
       
      });

      return { data };
    } catch (error) {

      return { error: error as Error };
    }
  }

  return request;
}

export default useRequest;
