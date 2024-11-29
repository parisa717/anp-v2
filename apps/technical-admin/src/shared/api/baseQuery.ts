import { GATEWAY_HEADER_KEY, GATEWAY_HEADER_VALUES } from '@nexus-ui/utils'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'

export const baseQuery = graphqlRequestBaseQuery({
  url: import.meta.env.VITE_API_ENDPOINT,
  prepareHeaders: (headers, { getState }) => {
    const { accessToken } = (getState() as RootState).session

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`)
    }

    headers.set(GATEWAY_HEADER_KEY, GATEWAY_HEADER_VALUES.TECHNICAL_ADMIN)

    return headers
  },
})
