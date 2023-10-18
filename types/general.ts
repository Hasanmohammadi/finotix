export interface ApiResponseI<T> {
  result: T
  hasError: boolean
  message: string | null
}
