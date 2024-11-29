import { MessagesMessage as PrimeMessage } from 'primereact/messages'

import { AllRoutePaths } from '@/shared/lib'

export type APPLICATION_MESSAGE_PAGE = AllRoutePaths | 'global'

export enum APPLICATION_MESSAGE_TYPE {
  GENERIC = 'generic',
  FORM = 'form',
  OPERATION = 'operation',
}

export type ApplicationMessage = PrimeMessage & {
  id: string
  page: APPLICATION_MESSAGE_PAGE
  type: APPLICATION_MESSAGE_TYPE
  summary: PrimeMessage['summary']
  detail: PrimeMessage['detail']
}
