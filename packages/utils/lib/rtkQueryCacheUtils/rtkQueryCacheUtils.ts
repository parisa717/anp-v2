import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

/**
 * This file is based on the RTQK documentation:
 * https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#advanced-invalidation-with-abstract-tag-ids
 * https://gist.github.com/Shrugsy/6b6af02aef1f783df9d636526c1e05fa
 */

// This type is copied directly from the "rtk-query/graphql-request-base-query" package since it's not exported
type ErrorResponse = {
  message: string
  stack: string
  name: string
}

type FetchError = ErrorResponse | FetchBaseQueryError

/**
 * Default tags used by the cacher helpers
 */
const defaultTags = ['UNAUTHORIZED', 'UNKNOWN_ERROR'] as const
type DefaultTags = (typeof defaultTags)[number]

const concatErrorCache = <T, ID>(existingCache: CacheList<T, ID>, error: FetchError | undefined): CacheList<T, ID> => {
  if (error && 'status' in error && error.status === 401) {
    // unauthorized error
    return [...existingCache, 'UNAUTHORIZED']
  }

  // unknown error
  return [...existingCache, 'UNKNOWN_ERROR']
}

const isValidStringId = (value: unknown): value is string =>
  value != null && typeof value === 'string' && value.length > 0

/**
 * An individual cache item
 */
export type CacheItem<T, ID> = { type: T; id: ID }

/**
 * A list of cache items, including a LIST entity cache
 */
export type CacheList<T, ID> = (CacheItem<T, 'LIST'> | CacheItem<T, ID> | DefaultTags)[]

/**
 * Inner function returned by `providesList` to be passed to the `provides` property of a query
 */
type InnerProvidesList<T> = <Results extends { id: unknown }[], Error extends FetchError>(
  results: Results | undefined,
  error: Error | undefined,
) => CacheList<T, Results[number]['id']>

/**
 * HOF to create an entity cache to provide a LIST,
 * depending on the results being in a common format.
 *
 * Will not provide individual items without a result.
 *
 * @example
 * ```ts
 * const results = [
 *   { id: 1, message: 'foo' },
 *   { id: 2, message: 'bar' }
 * ]
 * providesList('Todo')(results)
 * // [
 * //   { type: 'Todo', id: 'List'},
 * //   { type: 'Todo', id: 1 },
 * //   { type: 'Todo', id: 2 },
 * // ]
 * ```
 */
export const providesList =
  <T extends string>(type: T): InnerProvidesList<T> =>
  (results, error) => {
    // is result available?
    if (results) {
      // successful query
      return [{ type, id: 'LIST' }, ...results.map(({ id }) => ({ type, id }) as const)]
    }
    // Received an error, include an error cache item to the cache list
    return concatErrorCache([{ type, id: 'LIST' }], error)
  }

type InnerProvidesListWithCustomId<T> = <Results extends Record<string, unknown>[], Error extends FetchError>(
  results: Results | undefined,
  error: Error | undefined,
) => CacheList<T, string>

/**
 * HOF to create an entity cache to provide a LIST with a custom id property,
 * depending on the results being in a common format.
 *
 * @example
 * ```ts
 * const results = [
 *   { userId: 1, message: 'foo' },
 *   { userId: 2, message: 'bar' }
 * ]
 * providesListWithCustomId('Todo', 'userId')(results)
 * // [
 * //   { type: 'Todo', id: 'List'},
 * //   { type: 'Todo', id: 1 },
 * //   { type: 'Todo', id: 2 },
 * // ]
 * ```
 */
export const providesListWithCustomId =
  <T extends string>(type: T, idProperty: T): InnerProvidesListWithCustomId<T> =>
  (results, error) => {
    // is result available?
    if (results) {
      // successful query
      return [
        { type, id: 'LIST' },
        ...results.flatMap((item) => {
          const id = item[idProperty]
          return isValidStringId(id) ? [{ type, id } as const] : []
        }),
      ]
    }

    // Received an error, include an error cache item to the cache list
    return concatErrorCache([{ type, id: 'LIST' }], error)
  }

/**
 * HOF to create an entity cache to invalidate a LIST.
 *
 * Invalidates regardless of result.
 *
 * @example
 * ```ts
 * invalidatesList('Todo')()
 * // [{ type: 'Todo', id: 'List' }]
 * ```
 */
export const invalidatesList =
  <T extends string>(type: T) =>
  (): readonly [CacheItem<T, 'LIST'>] =>
    [{ type, id: 'LIST' }] as const

type InnerProvidesNestedList<T> = <Results extends { data: { id: unknown }[] }, Error extends FetchError>(
  results: Results | undefined,
  error: Error | undefined,
) => CacheList<T, Results['data'][number]['id']>

/**
 * Similar to `providesList`, but for data located at a nested property,
 * e.g. `results.data` in a paginated response.
 * The property is hard coded, so re-create a version of this function based
 * on a data shape your API returns for best results.
 */
export const providesNestedList =
  <T extends string>(type: T): InnerProvidesNestedList<T> =>
  (results, error) => {
    // is result available?
    if (results) {
      // successful query
      return [{ type, id: 'LIST' }, ...results.data.map(({ id }) => ({ type, id }) as const)]
    }
    // Received an error, include an error cache item to the cache list
    return concatErrorCache([{ type, id: 'LIST' }], error)
  }

/**
 * HOF to create an entity cache for a single item using the query argument as the ID.
 *
 * @example
 * ```ts
 * cacheByIdArg('Todo')({ id: 5, message: 'walk the fish' }, undefined, 5)
 * // returns:
 * // [{ type: 'Todo', id: 5 }]
 * ```
 */
export const cacheByIdArg =
  <T extends string>(type: T) =>
  <ID, Result = undefined, Error = undefined>(_result: Result, _error: Error, id: ID): readonly [CacheItem<T, ID>] =>
    [{ type, id }] as const

/**
 * HOF to create an entity cache for a single item using the id property from the query argument as the ID.
 *
 * @example
 * ```ts
 * cacheByIdArgProperty('Todo')(undefined, { id: 5, message: 'sweep up' })
 * // returns:
 * // [{ type: 'Todo', id: 5 }]
 * ```
 */
export const cacheByIdArgProperty =
  <T extends string>(type: T) =>
  <Arg extends { id: unknown }, Result = undefined, Error = undefined>(
    _result: Result,
    _error: Error,
    arg: Arg,
  ): readonly [CacheItem<T, Arg['id']>] | [] =>
    [{ type, id: arg.id }] as const

/**
 * HOF to invalidate the 'UNAUTHORIZED' type cache item.
 */
export const invalidatesUnauthorized =
  () =>
  <Arg = undefined, Result = undefined, Error = undefined>(
    _result: Result,
    _error: Error,
    _arg: Arg,
  ): ['UNAUTHORIZED'] => ['UNAUTHORIZED']

/**
 * HOF to invalidate the 'UNKNOWN_ERROR' type cache item.
 */
export const invalidatesUnknownErrors =
  () =>
  <Arg = undefined, Result = undefined, Error = undefined>(
    _result: Result,
    _error: Error,
    _arg: Arg,
  ): ['UNKNOWN_ERROR'] => ['UNKNOWN_ERROR']

/**
 * Utility helpers for common provides/invalidates scenarios
 */
export const cacher = {
  defaultTags,
  providesList,
  invalidatesList,
  providesNestedList,
  cacheByIdArg,
  cacheByIdArgProperty,
  invalidatesUnauthorized,
  invalidatesUnknownErrors,
  providesListWithCustomId,
}
