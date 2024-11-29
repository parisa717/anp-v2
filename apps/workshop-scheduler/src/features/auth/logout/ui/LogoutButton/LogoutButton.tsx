import { Button } from 'primereact/button'
import { useNavigate } from 'react-router-dom'

import { pageUrls } from '@/shared/lib'
import { useAppDispatch } from '@/shared/model'

import { logoutThunk } from '../../model/logoutThunk'

export const LogoutButton = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onLogoutButtonClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    e.preventDefault()

    dispatch(logoutThunk())
      .unwrap()
      .finally(() => {
        navigate(pageUrls.root)
      })
  }

  return <Button label="Logout" onClick={onLogoutButtonClick} />
}
