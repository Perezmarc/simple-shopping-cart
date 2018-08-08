const ItemsList = () => import('./ItemsList.component.vue');

export function getRoutes() {
    return [
        { name: 'items', path: '/', component: ItemsList},
    ];
}