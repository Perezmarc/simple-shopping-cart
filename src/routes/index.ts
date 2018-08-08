import { getRoutes as ItemsListRoutes } from '../views/itemsList';
import { getRoutes as ShoppingCartRoutes } from '../views/shoppingCart';

export const routes =
  [
    ...ItemsListRoutes(),
    ...ShoppingCartRoutes(),
    { name: 'notFound', path: '*', redirect: { name: 'items' }}
  ]