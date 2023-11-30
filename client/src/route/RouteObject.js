import RouteWrapper from './RouteWrapper'
import { generatePath } from 'react-router'
import Homepage from '../components/pages'
import GenericLayout from '../components/layouts/GenericLayout'

const getRoutes = () => ({
  home: {
    title: 'Homepage',
    path: '/',
    element: Homepage,
    layout: GenericLayout
  }
})

const getPath = (key, params) => {
  const routes = getRoutes()
  return params ? generatePath(routes[key].path, params) : routes[key].path
}
export default getRoutes

export { getPath, RouteWrapper }
