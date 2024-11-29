import { Button } from 'primereact/button'
import { Message } from 'primereact/message'
import { useState } from 'react'

import * as pack from '../../../package.json'
import { useAppDispatch, useAppSelector } from '../../state'
import { selectIsLoggedIn, setIsLoggedIn } from '../../state/auth'

export const Home = () => {
  const [headline] = useState(pack.name)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const dispatch = useAppDispatch()

  const logIn = () => {
    dispatch(setIsLoggedIn(true))
  }

  const logOut = () => {
    dispatch(setIsLoggedIn(false))
  }

  return (
    <>
      <h1 className="text-3xl text-blue-500 capitalize mb-4">{headline}</h1>
      {isLoggedIn ? (
        <>
          <div className="mb-4">
            <Message text={'Logged in an ready to go!'} />
          </div>
          <Button onClick={logOut}>Log out</Button>
        </>
      ) : (
        <>
          <div className="mb-4">
            <Message severity="warn" text={'You do not seem to be logged in!'} />
          </div>
          <Button onClick={logIn}>Log in</Button>
        </>
      )}
    </>
  )
}
