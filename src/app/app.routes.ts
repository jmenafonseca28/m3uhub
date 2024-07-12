import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'homepage', loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage)
  },
  {
    path: 'login', loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'register', loadComponent: () => import('./pages/register/register.page').then(m => m.RegisterPage)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  }
];
