import { GqlLocationObjectType as GeneratedLocationType } from '@/shared/api/types.generated'

import { GetLocationsQuery, GetWorkshopConnectedLocationsQuery } from './Location.generated'

export type LocationDTO = GeneratedLocationType
export type QueryLocations = GetLocationsQuery['getLocations']
export type QueryWorkshopConnectedLocations = GetWorkshopConnectedLocationsQuery['getWorkshopConnectedLocations']
