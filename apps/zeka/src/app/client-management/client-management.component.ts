import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ClientsFacade, PositionFacadeService } from '@frontend/core-state';
import { Observable } from 'rxjs';
import { ClientsComponent } from './Clients/clients.component';

@Component({
  selector: 'frontend-client-management',
  templateUrl: './client-management.component.html',
  styleUrls: ['./client-management.component.scss']
})
export class ClientManagementComponent {
  public clientInfoIsActive = false;
  position$: Observable<string> = this.positionFacadeService.position$;
  clientId$: Observable<number> = this.positionFacadeService.clientId$;

  constructor(
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public route: ActivatedRoute,
    private positionFacadeService: PositionFacadeService,
    ) {
  }

  onRouterOutletActivate(componentRef: Event) {
    if (componentRef instanceof ClientsComponent) {
      this.clientInfoIsActive = true;
    }
  }

}
