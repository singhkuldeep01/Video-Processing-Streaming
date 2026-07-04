import { useState } from "react"
import axiosInstance from "@/lib/axiosInstance"

interface UsePostReturn<T> {
  data: T | null
  loading: boolean
  error: Error | null
  post: (url: string, payload: unknown) => Promise<T | null>
}

export const usePost = <T,>(): UsePostReturn<T> => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const post = async (url: string, payload: unknown): Promise<T | null> => {
    try {
      setLoading(true)
      setError(null)
      const response = await axiosInstance.post<T>(url, payload)
      setData(response.data)
      return response.data
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to post")
      setError(error)
      setData(null)
      return null
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, post }
}
