import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { routesConfig } from './routesConfig'

export const Router = () => {
  const router = createBrowserRouter(routesConfig)

  return <RouterProvider router={router} />
}
