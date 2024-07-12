import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
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
    path: 'playlist', loadComponent: () => import('./pages/playlist/playlist.page').then(m => m.PlaylistPage)
  },
  {
    path: 'channel-list/:id',
    loadComponent: () => import('./pages/channel-list/channel-list.page').then( m => m.ChannelListPage)
  },
  {
    path: 'channel-view',
    loadComponent: () => import('./pages/channel-view/channel-view.page').then( m => m.ChannelViewPage)
  }
];
