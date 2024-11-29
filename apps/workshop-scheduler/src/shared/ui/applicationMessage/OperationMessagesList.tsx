import { MessagesList } from '@nexus-ui/ui'
import { MessagesProps as PrimeMessagesProps } from 'primereact/messages'
import { memo, useEffect, useRef } from 'react'

import { useAppDispatch, useAppSelector } from '@/shared/model'

import {
  removeApplicationMessageById,
  selectApplicationMessagesByPageAndType,
} from '../../model/applicationMessage/slice'
import { APPLICATION_MESSAGE_PAGE, APPLICATION_MESSAGE_TYPE } from '../../model/applicationMessage/types'

const TYPE = APPLICATION_MESSAGE_TYPE.OPERATION

export type OperationMessagesListProps = PrimeMessagesProps & {
  page: APPLICATION_MESSAGE_PAGE
}

export const OperationMessagesList = memo(({ page, ...otherProps }: OperationMessagesListProps) => {
  const applicationMessages = useAppSelector(selectApplicationMessagesByPageAndType(page, TYPE))
  const dispatch = useAppDispatch()

  const currentMessageIdsRef = useRef<string[]>([])

  useEffect(() => {
    currentMessageIdsRef.current = applicationMessages.map((message) => message.id)

    return () => {
      currentMessageIdsRef.current.forEach((id) => {
        dispatch(removeApplicationMessageById(id))
      })
    }
  }, [applicationMessages, dispatch])

  return <MessagesList {...otherProps} messages={applicationMessages} className="my-9" />
})

OperationMessagesList.displayName = 'OperationMessagesList'
