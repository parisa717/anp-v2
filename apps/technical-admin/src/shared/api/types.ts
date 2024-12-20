import type { DefinitionsFromApi, OverrideResultType, TagTypesFromApi } from '@reduxjs/toolkit/query'

/**
 * The below is based on the following answers in Redux Toolkit Github issue tracker:
 *
 * - https://github.com/reduxjs/redux-toolkit/issues/3901#issuecomment-1820995408
 * - https://github.com/reduxjs/redux-toolkit/pull/2953#issuecomment-1521935399
 *
 * We need all these types to define transformResponse() for the API generated by @graphql-codegen/typescript-rtk-query
 *
 * Maintainers of RTK included the better API for this in their plans for RTK version 3
 * See https://github.com/reduxjs/redux-toolkit/pull/3485
 */

export type ApiWithTransformResponse<
  ApiType,
  EndpointNames extends Array<keyof DefinitionsFromApi<ApiType>>,
  EntityType extends { [K in EndpointNames[number]]: unknown },
> = {
  TagTypes: TagTypesFromApi<ApiType> | string
  ApiEndpointDefinitions: Omit<DefinitionsFromApi<ApiType>, keyof EntityType> & {
    [P in keyof EntityType]: P extends keyof DefinitionsFromApi<ApiType>
      ? OverrideResultType<DefinitionsFromApi<ApiType>[P], EntityType[P]>
      : never
  }
}
