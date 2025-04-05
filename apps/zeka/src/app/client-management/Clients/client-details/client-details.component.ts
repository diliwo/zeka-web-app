import { Component, Inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Client} from '@frontend/api-interface';
import { PositionFacadeService, NotificationService, ClientsFacade } from '@frontend/core-state';
import { Console } from 'console';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'frontend-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {
  @Input() client: Client;
  @Output() refreshEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private positionFacadeServices: PositionFacadeService,
    private clientFacade: ClientsFacade,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private route: Router,
  ) {
  }
  ngOnInit(): void {
    this.reset();
  }

  reset() {
    this.positionFacadeServices.getClientId(parseInt(this.client.clientId));
  }
}
