import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewDataComponent } from 'app/view-data/view-data.component';
import { AddEntryComponent } from 'app/add-entry/add-entry.component';

const routes: Routes = [
  {
    path: 'view-data',
    component: ViewDataComponent
  },
  {
    path: 'add-entry',
    component: AddEntryComponent
  },
  {
    path: 'generate-report',
    component: ViewDataComponent
  },
  {
    path: '',
    redirectTo: '/view-data',
    pathMatch: 'full'
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
