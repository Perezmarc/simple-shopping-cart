const ShoppingCart = () => import('./ShoppingCart.component.vue');

export function getRoutes() {
    return [
        { name: 'shopping-cart', path: '/shopping-cart', component: ShoppingCart},
    ];
}