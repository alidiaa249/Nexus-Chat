import { Routes } from '@angular/router';
import { AuthComponent } from './features/auth/auth';
import { Dashboard } from './features/dashboard/dashboard';

export const routes: Routes = [
  {path: 'auth', component: AuthComponent , pathMatch: 'full'},
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'login', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'signin', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'dash', component:Dashboard, pathMatch: 'full' },
];