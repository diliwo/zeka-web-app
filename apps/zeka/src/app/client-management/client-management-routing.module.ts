import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientManagementComponent } from './client-management.component';
import { ClientsComponent } from './Clients/clients.component';

const routes: Routes = [
  {
    path:'',component: ClientManagementComponent,
    children: [
      { path: ':id', component: ClientsComponent}
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {
  static components = [
    ClientManagementComponent,
    ClientsComponent
    ];
}
