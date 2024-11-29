import {
  ActivateBusinessStatusMutation,
  CreateBusinessStatusesMutation,
  DeactivateBusinessStatusMutation,
  EditBusinessStatusMutation,
  GetBusinessStatusesQuery,
  GetBusinessStatusQuery,
} from '@/entities/businessStatus/api/BusinessStatus.generated'

export const CREATE_BUSINESS_STATUSES_OPERATION_DEFAULT_RESPONSE: CreateBusinessStatusesMutation = {
  createBusinessStatuses: {
    status: true,
  },
}

export const EDIT_BUSINESS_STATUS_OPERATION_DEFAULT_RESPONSE: EditBusinessStatusMutation = {
  updateWorkshopAppointmentBusinessStatus: {
    status: true,
  },
}

export const ACTIVATE_BUSINESS_STATUS_OPERATION_DEFAULT_RESPONSE: ActivateBusinessStatusMutation = {
  activateWorkshopAppointmentBusinessStatus: {
    status: true,
  },
}

export const DEACTIVATE_BUSINESS_STATUS_OPERATION_DEFAULT_RESPONSE: DeactivateBusinessStatusMutation = {
  deactivateWorkshopAppointmentBusinessStatus: {
    status: true,
  },
}

export const GET_BUSINESS_STATUS_OPERATION_DEFAULT_RESPONSE: GetBusinessStatusQuery = {
  getWorkshopAppointmentBusinessStatus: {
    id: '1',
    name: 'Open',
    isActive: true,
    isDefault: false,
  },
}

export const GET_BUSINESS_STATUSES_OPERATION_DEFAULT_RESPONSE: GetBusinessStatusesQuery = {
  getWorkshopAppointmentBusinessStatuses: {
    businessStatuses: [
      {
        id: '1',
        name: 'Open',
        isActive: true,
        isDefault: true,
      },
      {
        id: '2',
        name: 'Arrived',
        isActive: true,
        isDefault: false,
      },
      {
        id: '3',
        name: 'In Progress',
        isActive: true,
        isDefault: false,
      },
      {
        id: '4',
        name: 'Finished',
        isActive: true,
        isDefault: false,
      },
      {
        id: '5',
        name: 'Blocked',
        isActive: false,
        isDefault: false,
      },
    ],
  },
}
