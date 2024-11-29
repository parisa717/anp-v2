import { LoaderFunctionArgs, redirect } from 'react-router-dom'

// TODO this is a violation of FSD principles for now, but we'll fix it when we store a token in Local Storage
// eslint-disable-next-line no-restricted-imports
import { store } from '@/app/store'

import { pageUrls } from '../config/pageUrls'

export const authRequiredLoader = ({ request }: LoaderFunctionArgs) => {
  const isLoggedIn = store.getState().session.isLoggedIn

  if (isLoggedIn) {
    return true
  }

  /**
   * need to throw() here instead of return
   * Docs for that available at https://reactrouter.com/en/main/route/loader#throwing-in-loaders
   */

  const params = new URLSearchParams()
  params.set('from', new URL(request.url).pathname)

  throw redirect(`${pageUrls.login()}?${params.toString()}`)
}
