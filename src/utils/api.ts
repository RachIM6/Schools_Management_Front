// API utility functions for making requests to the backend

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface FetchOptions {
  method?: HttpMethod;
  body?: any;
  headers?: Record<string, string>;
}

export async function fetchApi<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { method = "GET", body, headers = {} } = options;

  const requestOptions: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    credentials: "include",
  };

  if (body) {
    requestOptions.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`/api/${endpoint}`, requestOptions);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API request failed: ${endpoint}`, error);
    throw error;
  }
}

// Convenience methods for common HTTP verbs
export const api = {
  get: <T>(endpoint: string, options: Omit<FetchOptions, "method"> = {}) =>
    fetchApi<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(
    endpoint: string,
    data: any,
    options: Omit<FetchOptions, "method" | "body"> = {}
  ) => fetchApi<T>(endpoint, { ...options, body: data, method: "POST" }),

  put: <T>(
    endpoint: string,
    data: any,
    options: Omit<FetchOptions, "method" | "body"> = {}
  ) => fetchApi<T>(endpoint, { ...options, body: data, method: "PUT" }),

  delete: <T>(endpoint: string, options: Omit<FetchOptions, "method"> = {}) =>
    fetchApi<T>(endpoint, { ...options, method: "DELETE" }),
};
