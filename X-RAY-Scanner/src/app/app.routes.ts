import { Routes } from '@angular/router';

export const routes: Routes = [
    {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
   {
    path: 'login',
    loadComponent: () =>
      import('./modules/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'inicio',
    loadComponent: () =>
      import('./modules/Inicio/inicio/inicio.component').then((i) => i.InicioComponent),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./modules/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'configuracion',
    loadComponent: () =>
      import('./modules/configuracion/configuracion/configuracion.component').then((c) => c.ConfiguracionComponent),
  },
  {
    path: '**',
    redirectTo: 'login', // por si ponen una ruta inválida
  },
];
