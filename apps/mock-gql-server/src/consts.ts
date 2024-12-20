export const TECHNICAL_ADMIN_URL = 'https://technical-admin-gateway.nexus.dev/graphql'
export const WORKSHOP_SCHEDULER_URL = 'https://workshop-scheduler-gateway.nexus.dev/graphql'

export const GRAPHQL_SCHEMAS_PATH = 'src/schemas'

const MISC_MOCKED_OPERATIONS = ['GetCurrentUser', 'GetLocation', 'GetLocations']

const MOCKED_OPERATIONS_TECHNICAL_ADMIN = [
  'GetAreas',
  'GetDmss',
  'GetCrms',
  'CreateLocation',
  'CreateArea',
  'GetCountries',
]

const MOCKED_OPERATIONS_WORKSHOP_SCHEDULER = [
  'GetAppointments',
  'GetBusinessStatus',
  'GetAdditionalBusinessStatus',
  'GetBusinessStatusesByLocation',
  'GetAdditionalBusinessStatuses',
  'GetAdditionalBusinessStatusesByLocation',
  'CreateBusinessStatuses',
  'CreateAdditionalBusinessStatuses',
  'EditBusinessStatus',
  'AssignBusinessStatusesToLocation',
  'UnassignBusinessStatusFromLocation',
  'AssignAdditionalBusinessStatusesToLocation',
  'UnassignAdditionalBusinessStatusFromLocation',
  'UnassignBusinessStatusFromLocation',
  'EditAdditionalBusinessStatus',
  'ActivateBusinessStatus',
  'ActivateAdditionalBusinessStatus',
  'DeactivateBusinessStatus',
  'DeactivateAdditionalBusinessStatus',
  'ReorderBusinessStatuses',
  'GetAvailabilityColors',
  'UpdateAvailabilityColors',
  'GetWorkshopConnectedLocations',
  'CreateWorkshopConnectedLocations',
  'DeleteWorkshopConnectedLocations',
  'UpdateLocationOverbooking',
  'UpdateLocationMinimalOverbooking',
  'GetLocationOverbooking',
  'GetWorkshopWorks',
  'CreateWorkshopWork',
  'CreateWorkshopLocationWork',
  'GetLocationWorks',
  'GetQualifications',
]

export const MOCKED_OPERATIONS = [
  ...MISC_MOCKED_OPERATIONS,
  ...MOCKED_OPERATIONS_TECHNICAL_ADMIN,
  ...MOCKED_OPERATIONS_WORKSHOP_SCHEDULER,
]
