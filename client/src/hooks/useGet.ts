import { useState, useEffect } from "react"
import axiosInstance from "@/lib/axiosInstance"

interface UseGetReturn<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

export const useGet = <T,>(url: string): UseGetReturn<T> => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await axiosInstance.get<T>(url)
        setData(response.data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch"))
        setData(null)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  return { data, loading, error }
}
