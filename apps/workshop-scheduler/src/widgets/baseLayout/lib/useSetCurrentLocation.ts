import { useEffect } from 'react'

import { setCurrentLocation, useGetLocationsQuery } from '@/entities/location'
import { selectIsLoggedIn } from '@/entities/session'
import { useAppDispatch, useAppSelector } from '@/shared/model'

export const useSetCurrentLocation = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const dispatch = useAppDispatch()

  //TODO: Add error handling
  const { data: locations } = useGetLocationsQuery(undefined, {
    skip: !isLoggedIn,
  })

  useEffect(() => {
    if (locations?.length) {
      dispatch(setCurrentLocation(locations[0]))
    }
  }, [dispatch, locations])
}
