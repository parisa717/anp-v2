import { Country as GeneratedApiType } from '@/shared/api/types.generated'

import { GetCountriesQuery } from './Country.generated'

export type CountryDTO = GeneratedApiType
export type QueryCountries = GetCountriesQuery['countries']
