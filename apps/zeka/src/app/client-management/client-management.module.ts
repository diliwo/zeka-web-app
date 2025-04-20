import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreDataModule, API_BASE_URL } from '@frontend/core-data';
import { CoreStateModule } from '@frontend/core-state';
import { MaterialModule } from '@frontend/material';
import { environment } from '../../environments/environment';
import { SharedModule} from '@frontend/shared';
import { NgxEditorModule } from 'ngx-editor';
import { ClientRoutingModule } from './client-management-routing.module';
import { ClientDetailsComponent } from './Clients/client-details/client-details.component';

@NgModule({
  declarations: [
    ClientDetailsComponent
  ],
  imports: [
    SharedModule,
    CoreDataModule,
    CoreStateModule,
    MaterialModule,
    ClientRoutingModule,
    NgxEditorModule
  ],
  providers: [
    { provide: API_BASE_URL, useValue: environment.ApiBaseUrl }
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class ClientManagementModule { }
