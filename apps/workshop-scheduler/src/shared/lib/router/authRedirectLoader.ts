import { redirect } from 'react-router-dom'

// TODO this is a violation of FSD principles for now, but we'll fix it when we store a token in Local Storage
// eslint-disable-next-line no-restricted-imports
import { store } from '@/app/store'

import { pageUrls } from '../config/pageUrls'

export const authRedirectLoader = () => {
  const isLoggedIn = store.getState().session.isLoggedIn

  if (isLoggedIn) {
    return redirect(pageUrls.root)
  }

  return null
}
