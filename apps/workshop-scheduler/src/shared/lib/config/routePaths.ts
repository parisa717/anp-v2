export const ROUTE_PATHS = {
  Root: '/',
  Login: '/login',
  Appointments: {
    Root: '/appointments',
    Book: {
      Root: '/appointments/book-appointment',
      ByStep: '/appointments/book-appointment/:stepNumber',
    },
  },
  BusinessStatus: {
    Root: '/business-status',
    Create: '/business-status/create',
    Edit: '/business-status/:id/edit',
    CreateAdditional: '/business-status/create-additional',
    EditAdditional: '/business-status/:id/edit-additional',
    UnselectDefault: '/business-status/:id/unselect-default',
    UnselectDefaultAdditional: '/business-status/:id/unselect-default-additional',
    ChangeStatusConfirmation: '/business-status/:id/change-status-confirmation',
  },
  Location: {
    Root: '/location',
    Details: {
      Root: '/location/:id/details',
      LocationWorks: {
        create: `/location/:id/details/services/create`,
      },
    },
  },
  BusinessStatusByLocation: {
    Root: '/business-status-by-location',
    Create: '/business-status-by-location/create',
    CreateAdditional: '/business-status-by-location/create-additional',
  },
  ColorSetup: {
    Root: '/color-setup',
    Edit: '/color-setup/edit',
  },
  Work: {
    Root: '/work',
    Add: '/work/add',
  },
} as const
