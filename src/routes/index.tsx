
import { Navigate, createBrowserRouter } from 'react-router-dom'
import { HOME_ROUTE, PLAN_ROUTE, RESUME_ROUTE } from '../constants'
import { HOME } from '../pages/home'
import { Planes } from '../pages/planes/planes'
import { Resumen } from '../pages/resumen'

export const router = createBrowserRouter([

  {
    path: `/${HOME_ROUTE}`,
    element: <HOME />
  },
  {
    path: `/${PLAN_ROUTE}`,
    element: <Planes />
  },
  {
    path: `/${RESUME_ROUTE}`,
    element: <Resumen />
  },
  {
    path: '*',
    element: <Navigate to={`/${HOME_ROUTE}`} replace />
  }
])
