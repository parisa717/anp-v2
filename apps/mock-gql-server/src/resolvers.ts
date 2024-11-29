import {
  additionalBusinessStatuses,
  additionalBusinessStatusesByLocation,
  addresses,
  appointments,
  areas,
  availabilityColors,
  businessStatuses,
  businessStatusesByLocation,
  countries,
  crms,
  currentUser,
  dmss,
  locationOverbooking,
  locations,
  locationWorks,
  MockedGqlWorkshopWork,
  qualifications,
  simplifiedBrands,
  works,
  workshopBrands,
  workshopConnectedLocations,
  workshopQualifications,
  workshopWorks,
} from './mockData'
import { Address, Area, Location } from './types'

interface CreateAreaInput {
  code: string
  name: string
  address: {
    country: {
      id: string
    }
    postCode: string
    city: string
    address: string
  }
  isActive: boolean
}

interface GqlCreateLocationInputType {
  areaId: string
  id: string
  name: string
  zipCode: string
  city: string
  address: string
  brandIds: string[]
  isActive: boolean
}

const getCountryByAddress = (parent: Address) => countries.find((country) => country.id === parent.countryId)

const getAddressById = (addressId: string) => {
  const address = addresses.find((address) => address.id === addressId)
  if (!address) return null

  const country = countries.find((country) => country.id === address.countryId)

  return {
    ...address,
    country: country ? { id: country.id, name: country.name } : { id: '0', name: 'Unknown' },
  }
}

const getDmsById = (dmsId: string) => {
  const dms = dmss.find((dms) => dms.id === dmsId)
  return dms ? { id: dms.id, name: dms.name } : null
}

const getCrmById = (crmId: string) => {
  const crm = crms.find((crm) => crm.id === crmId)
  return crm ? { id: crm.id, name: crm.name } : null
}

export const resolverMap = {
  Query: {
    appointments() {
      return appointments
    },
    currentUser() {
      return currentUser
    },
    areas() {
      return areas
    },
    getArea(_: unknown, { id }: { id: string }) {
      const area = areas.find((area) => area.id === id)

      if (!area) return null

      return {
        id: area.id,
        code: area.code,
        name: area.name,
        isActive: area.isActive,
        address: getAddressById(area.addressId),
        dms: getDmsById(area.dmsId),
        crm: getCrmById(area.crmId),
      }
    },
    getLocation(_: unknown, { id }: { id: string }) {
      return locations[parseInt(id)]
    },
    getLocations() {
      return {
        locations,
      }
    },
    addresses() {
      return addresses
    },
    countries() {
      return countries
    },
    dmss() {
      return dmss
    },
    crms() {
      return crms
    },
    getWorkshopAppointmentBusinessStatus() {
      return businessStatuses[0]
    },
    getWorkshopAppointmentAdditionalBusinessStatus() {
      return additionalBusinessStatuses[0]
    },
    getWorkshopAppointmentAdditionalBusinessStatuses() {
      return {
        additionalBusinessStatuses,
      }
    },
    getLocationWorkshopAppointmentBusinessStatuses() {
      return {
        businessStatuses: businessStatusesByLocation,
      }
    },
    getLocationWorkshopAppointmentAdditionalBusinessStatuses() {
      return {
        additionalBusinessStatuses: additionalBusinessStatusesByLocation,
      }
    },
    getWorkshopConnectedLocations() {
      return {
        workshopConnectedLocations: workshopConnectedLocations,
      }
    },
    getAvailabilityColors() {
      return {
        availabilityColors,
      }
    },
    getLocationOverbooking(_: unknown) {
      return {
        locationOverbooking: locationOverbooking[0],
      }
    },
    getQualifications() {
      return {
        qualifications: qualifications,
      }
    },
    getWorkshopWorks(_: unknown) {
      return {
        works: workshopWorks,
      }
    },
    getLocationWorks(_: unknown) {
      return {
        locationWorks,
      }
    },
  },
  Mutation: {
    createArea: (_: unknown, { area }: { area: CreateAreaInput }) => ({
      id: 'mocked-area-id',
      code: area.code,
    }),
    createLocation: (_: unknown, { location }: { location: GqlCreateLocationInputType }) => ({
      operationId: 'mocked-location-id',
      ...location,
      status: true,
    }),
    createBusinessStatuses: () => ({
      operationId: 'mocked-business-statuses-id',
      status: true,
    }),
    createAdditionalBusinessStatuses: () => ({
      operationId: 'mocked-additional-business-statuses-id',
      status: true,
    }),
    createWorkshopConnectedLocations: (
      _: unknown,
      {
        connectedLocationId,
      }: {
        connectedLocationId: string
      },
    ) => ({
      operationId: 'mocked-create-workshop-connected-location-id',
      connectedLocationId,
      status: true,
    }),
    createWorkshopWork: () => {
      return {
        operationId: 'mocked-create-workshop-work',
        works,
      }
    },
    deleteWorkshopConnectedLocations: () => ({
      operationId: 'mocked-delete-workshop-connected-location-id',
      status: true,
    }),
    updateWorkshopAppointmentBusinessStatus: () => ({
      operationId: 'mocked-edit-business-status-id',
      status: true,
    }),
    updateWorkshopAppointmentAdditionalBusinessStatus: () => ({
      operationId: 'mocked-edit-additional-business-status-id',
      status: true,
    }),
    activateWorkshopAppointmentBusinessStatus: () => ({
      operationId: 'mocked-activate-business-status-id',
      status: true,
    }),
    activateWorkshopAppointmentAdditionalBusinessStatus: () => ({
      operationId: 'mocked-activate-additional-business-status-id',
      status: true,
    }),
    deactivateWorkshopAppointmentBusinessStatus: () => ({
      operationId: 'mocked-deactivate-business-status-id',
      status: true,
    }),
    deactivateWorkshopAppointmentAdditionalBusinessStatus: () => ({
      operationId: 'mocked-deactivate-additional-business-status-id',
      status: true,
    }),
    assignLocationWorkshopAppointmentBusinessStatus: () => ({
      operationId: 'mocked-assign-business-statuses-to-location',
      status: true,
    }),
    unassignLocationWorkshopAppointmentBusinessStatus: () => ({
      operationId: 'mocked-unassign-business-statuses-to-location',
      status: true,
    }),
    assignLocationWorkshopAppointmentAdditionalBusinessStatus: () => ({
      operationId: 'mocked-assign-additional-business-statuses-to-location',
      status: true,
    }),
    unassignLocationWorkshopAppointmentAdditionalBusinessStatus: () => ({
      operationId: 'mocked-unassign-additional-business-statuses-from-location',
      status: true,
    }),
    reorderWorkshopAppointmentBusinessStatuses: () => ({
      operationId: 'mocked-reorder-business-statuses',
      status: true,
    }),
    updateAvailabilityColors: () => ({
      operationId: 'mocked-update-availability-color',
      status: true,
    }),
    updateLocationOverbooking: () => {
      return {
        operationId: 'mocked-update-location-overbooking',
        status: true,
      }
    },
    updateLocationMinimalOverbooking: () => {
      return {
        operationId: 'mocked-update-location-minimal-overbooking',
        status: true,
      }
    },
    createWorkshopLocationWork: () => {
      return {
        operationId: 'mocked-create-workshop-location-work',
        locationWorks: [{ id: '1' }, { id: '2' }],
      }
    },
  },
  Area: {
    country: (parent: Area) => {
      return countries.find((country) => country.id === parent.countryId)
    },
    address: (parent: Area) => {
      return addresses.find((address) => address.id === parent.addressId)
    },
    dms: (parent: Area) => {
      return dmss.find((dms) => dms.id === parent.dmsId)
    },
    crm: (parent: Area) => {
      return crms.find((crm) => crm.id === parent.crmId)
    },
  },
  Address: {
    country: (parent: Address) => {
      return getCountryByAddress(parent)
    },
  },
  GqlLocationObjectType: {
    address: (parent: Location) => {
      const address = addresses.find((address) => address.id === parent.addressId)

      if (!address) {
        return {
          id: 0,
          country: {
            id: 0,
            name: 'Unknown',
          },
          postCode: 'N/A',
          city: 'Unknown',
          address: 'Unknown',
        }
      }

      return {
        ...address,
        country: getCountryByAddress(address),
      }
    },
    area: (parent: Location) => {
      return areas.find((area) => area.id === parent.areaId)
    },
    brands: (parent: Location) => {
      return simplifiedBrands.filter((brand) => parent.brandIds.includes(brand.id))
    },
  },
  GqlWorkObjectType: {
    qualification: (parent: MockedGqlWorkshopWork) => {
      return workshopQualifications.find((qualification) => qualification.id === parent.qualificationId)
    },
    brands: (parent: MockedGqlWorkshopWork) => {
      return workshopBrands.filter((brand) => parent.brandIds.includes(brand.id))
    },
  },
}
