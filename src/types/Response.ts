export type Response<T> = {
  items: T[]
  limit: number
  offset: number
  total: number
  count: number
}

