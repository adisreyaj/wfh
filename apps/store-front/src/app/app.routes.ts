import { Route } from '@angular/router';

export const SHELL_ROUTES: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'products',
    loadChildren: () => import('./pages/products/products.component').then((m) => m.ProductsModule),
  },
  {
    path: 'checkout',
    loadChildren: () => import('./pages/checkout/checkout.component').then((m) => m.CheckoutModule),
  },

  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.component').then((m) => m.ProfileModule),
  },
  {
    path: 'orders',
    loadChildren: () => import('./pages/orders/orders.component').then((m) => m.OrdersModule),
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
