import { useState } from "react"
import axiosInstance from "@/lib/axiosInstance"

interface UseFetchReturn<T> {
  data: T | null
  loading: boolean
  error: Error | null
  fetch: (url: string, method?: "GET" | "POST" | "PUT" | "DELETE", payload?: unknown) => Promise<T | null>
}

export const useFetch = <T,>(): UseFetchReturn<T> => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetch = async (
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
    payload?: unknown
  ): Promise<T | null> => {
    try {
      setLoading(true)
      setError(null)
      
      const config = {
        method,
        url,
        data: payload,
      }
      
      const response = await axiosInstance(config)
      setData(response.data)
      return response.data
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Request failed")
      setError(error)
      setData(null)
      return null
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, fetch }
}
