import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs } from '@graphql-tools/merge'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { GATEWAY_HEADER_KEY, GATEWAY_HEADER_VALUES } from '@nexus-ui/utils'
import { Request } from 'express'
import path from 'path'

import { GRAPHQL_SCHEMAS_PATH, MOCKED_OPERATIONS, TECHNICAL_ADMIN_URL, WORKSHOP_SCHEDULER_URL } from './consts'

const extractGraphQLOperationName = (queryString: string) => {
  // Match 'query OperationName' or 'mutation OperationName' pattern
  const match = queryString.match(/(query|mutation)\s+([a-zA-Z][a-zA-Z0-9_]*)/)

  return match ? match[2] : null
}

/**
 * Determines the target URL based on the gateway header
 * @param req - The incoming request object containing headers
 * @returns The target URL string based on the gateway header value
 */
export const determineProxyTarget = (req: Request): string => {
  const gatewayHeader = req.headers[GATEWAY_HEADER_KEY]

  if (gatewayHeader === GATEWAY_HEADER_VALUES.TECHNICAL_ADMIN) {
    return TECHNICAL_ADMIN_URL
  }

  if (gatewayHeader === GATEWAY_HEADER_VALUES.WORKSHOP_SCHEDULER) {
    return WORKSHOP_SCHEDULER_URL
  }

  return ''
}

/**
 * Filter function to determine if a request should be proxied or not.
 *
 * @param req The request object.
 * @returns `true` if the request should be proxied, `false` otherwise.
 */
export const proxyFilter = function (req: Request<unknown, unknown, { query: string }>): boolean {
  if (
    req?.body?.query &&
    MOCKED_OPERATIONS.some((operation) => extractGraphQLOperationName(req.body.query) === operation)
  ) {
    return false
  }

  return true
}

/**
 * Get the mocked GraphQL schema.
 *
 * @returns The mocked GraphQL schema.
 */
export const getMockedGraphqlSchema = () => {
  const typesArray = loadFilesSync(path.join(GRAPHQL_SCHEMAS_PATH, './mocked/**/*.graphql'))
  const typeDefs = mergeTypeDefs(typesArray)

  return makeExecutableSchema({ typeDefs })
}
