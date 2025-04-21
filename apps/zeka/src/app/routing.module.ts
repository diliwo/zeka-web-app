import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, PreloadAllModules, NoPreloading } from '@angular/router';
import { PreloadModulesStrategy } from '@frontend/core-state';
import { AdminAreaManagementModule } from './admin-area-management/admin-area-management.module';
import { DashboardComponent } from './dahsboard/dashboard.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent
  },
  {
    path: 'client',
    loadChildren: () => import('./client-management/client-management.module').then(m => m.ClientManagementModule)
  },
  {
    path: 'client/:id', data: { preload: true },
    loadChildren: () => import('./client-management/client-management.module').then(m => m.ClientManagementModule)
  },
  { path: 'admin',
    loadChildren: () => import('./admin-area-management/admin-area-management.module').then(m => m.AdminAreaManagementModule),
  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes,{ preloadingStrategy: PreloadModulesStrategy})
  ],
  exports: [RouterModule],
 providers: [PreloadModulesStrategy]
})
export class RoutingModule { }
