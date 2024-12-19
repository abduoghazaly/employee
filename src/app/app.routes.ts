import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'employees',
    loadComponent: () =>
      import('./features/list-employees/list-employees.component').then(
        (m) => m.ListEmployeesComponent
      ),
  },
  { path: '**', redirectTo: 'employees' },
];
