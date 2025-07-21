// REST-native HTTP client for Swift Hummingbird backend
// Replaces the broken mock Supabase client with proper TypeScript types

// Environment configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"
const API_TIMEOUT = 30000 // 30 seconds

// HTTP Error class for proper error handling
export class HttpError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    message: string
  ) {
    super(message)
    this.name = "HttpError"
  }
}

// Authentication token management
let authToken: string | null = null

export const setAuthToken = (token: string | null) => {
  authToken = token
}

export const getAuthToken = (): string | null => {
  return authToken
}

// Generic HTTP client interface
export interface HttpClientOptions {
  timeout?: number
  retries?: number
  headers?: Record<string, string>
}

// Response wrapper for consistency with existing code
export interface ApiResponse<T> {
  data: T | null
  error: Error | null
}

// Core HTTP client class
export class RestHttpClient {
  private baseUrl: string
  private timeout: number
  private retries: number
  private defaultHeaders: Record<string, string>

  constructor(options: HttpClientOptions = {}) {
    this.baseUrl = API_BASE_URL
    this.timeout = options.timeout || API_TIMEOUT
    this.retries = options.retries || 3
    this.defaultHeaders = {
      "Content-Type": "application/json",
      ...options.headers
    }
  }

  private async makeRequest<T>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    endpoint: string,
    data?: any,
    options: HttpClientOptions = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`
    const headers = {
      ...this.defaultHeaders,
      ...options.headers
    }

    // Add authentication header if token is available
    if (authToken) {
      headers["Authorization"] = `Bearer ${authToken}`
    }

    const requestConfig: RequestInit = {
      method,
      headers,
      signal: AbortSignal.timeout(this.timeout)
    }

    // Add body for POST/PUT requests
    if (data && (method === "POST" || method === "PUT")) {
      requestConfig.body = JSON.stringify(data)
    }

    let lastError: Error | null = null

    // Retry logic
    for (let attempt = 0; attempt <= this.retries; attempt++) {
      try {
        const response = await fetch(url, requestConfig)

        // Handle HTTP errors
        if (!response.ok) {
          const errorMessage = await response
            .text()
            .catch(() => response.statusText)
          throw new HttpError(
            response.status,
            response.statusText,
            errorMessage || `HTTP ${response.status}: ${response.statusText}`
          )
        }

        // Parse JSON response
        const responseData = await response.json()
        return { data: responseData, error: null }
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error))

        // Don't retry on 4xx errors (client errors)
        if (
          error instanceof HttpError &&
          error.status >= 400 &&
          error.status < 500
        ) {
          break
        }

        // Don't retry on the last attempt
        if (attempt === this.retries) {
          break
        }

        // Exponential backoff for retries
        const delay = Math.pow(2, attempt) * 1000
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }

    return { data: null, error: lastError }
  }

  // GET request
  async get<T>(
    endpoint: string,
    params?: Record<string, any>,
    options?: HttpClientOptions
  ): Promise<ApiResponse<T>> {
    let url = endpoint
    if (params) {
      const searchParams = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value))
        }
      })
      const queryString = searchParams.toString()
      if (queryString) {
        url += `?${queryString}`
      }
    }
    return this.makeRequest<T>("GET", url, undefined, options)
  }

  // POST request
  async post<T>(
    endpoint: string,
    data?: any,
    options?: HttpClientOptions
  ): Promise<ApiResponse<T>> {
    return this.makeRequest<T>("POST", endpoint, data, options)
  }

  // PUT request
  async put<T>(
    endpoint: string,
    data?: any,
    options?: HttpClientOptions
  ): Promise<ApiResponse<T>> {
    return this.makeRequest<T>("PUT", endpoint, data, options)
  }

  // DELETE request
  async delete<T>(
    endpoint: string,
    options?: HttpClientOptions
  ): Promise<ApiResponse<T>> {
    return this.makeRequest<T>("DELETE", endpoint, undefined, options)
  }
}

// Singleton instance for global use
export const httpClient = new RestHttpClient()

// Convenience functions for common patterns
export const apiGet = <T>(endpoint: string, params?: Record<string, any>) =>
  httpClient.get<T>(endpoint, params)

export const apiPost = <T>(endpoint: string, data?: any) =>
  httpClient.post<T>(endpoint, data)

export const apiPut = <T>(endpoint: string, data?: any) =>
  httpClient.put<T>(endpoint, data)

export const apiDelete = <T>(endpoint: string) => httpClient.delete<T>(endpoint)
