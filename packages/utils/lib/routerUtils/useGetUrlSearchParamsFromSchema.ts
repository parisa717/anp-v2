import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

export const useGetUrlSearchParamsFromSchema = <T>(schema: z.Schema<T>) => {
  const [urlSearchParams] = useSearchParams()

  return schema.parse(Object.fromEntries(urlSearchParams.entries()))
}
