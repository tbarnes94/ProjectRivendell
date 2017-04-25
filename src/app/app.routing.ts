import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewDataComponent } from 'app/view-data/view-data.component';
import { UpdateDataComponent } from 'app/update-data/update-data.component';

const routes: Routes = [
  {
    path: 'view-data',
    component: ViewDataComponent
  },
  {
    path: 'update-data',
    component: UpdateDataComponent
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
