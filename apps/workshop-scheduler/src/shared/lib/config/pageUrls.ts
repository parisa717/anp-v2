import { ROUTE_PATHS } from './routePaths'

export const pageUrls = {
  root: ROUTE_PATHS.Root,
  login() {
    return ROUTE_PATHS.Login
  },
  appointments: {
    root() {
      return ROUTE_PATHS.Appointments.Root
    },
    book: {
      root() {
        return ROUTE_PATHS.Appointments.Book.Root
      },
      byStep({ stepNumber }: { stepNumber: string }) {
        return pageUrls.appointments.book.root().concat('/', stepNumber)
      },
    },
  },
  businessStatus: {
    root: () => ROUTE_PATHS.BusinessStatus.Root,
    create: () => ROUTE_PATHS.BusinessStatus.Create,
    createAdditional: () => ROUTE_PATHS.BusinessStatus.CreateAdditional,
    edit: (id: string) => ROUTE_PATHS.BusinessStatus.Edit.replace(':id', id),
    editAdditional: (id: string) => ROUTE_PATHS.BusinessStatus.EditAdditional.replace(':id', id),
    unselectDefault: (id: string) => ROUTE_PATHS.BusinessStatus.UnselectDefault.replace(':id', id),
    unselectDefaultAdditional: (id: string) => ROUTE_PATHS.BusinessStatus.UnselectDefaultAdditional.replace(':id', id),
    changeStatusConfirmation: (id: string) => ROUTE_PATHS.BusinessStatus.ChangeStatusConfirmation.replace(':id', id),
  },
  location: {
    root: () => ROUTE_PATHS.Location.Root,
    details: {
      root: (id: string) => ROUTE_PATHS.Location.Details.Root.replace(':id', id),
      locationWorks: {
        create: (id: string) => ROUTE_PATHS.Location.Details.LocationWorks.create.replace(':id', id),
      },
    },
  },
  businessStatusByLocation: {
    root: () => ROUTE_PATHS.BusinessStatusByLocation.Root,
    create: () => ROUTE_PATHS.BusinessStatusByLocation.Create,
    createAdditional: () => ROUTE_PATHS.BusinessStatusByLocation.CreateAdditional,
  },
  colorSetup: {
    root: () => ROUTE_PATHS.ColorSetup.Root,
    edit: () => ROUTE_PATHS.ColorSetup.Edit,
  },
  work: {
    root: () => ROUTE_PATHS.Work.Root,
    add: () => ROUTE_PATHS.Work.Add,
  },
}
