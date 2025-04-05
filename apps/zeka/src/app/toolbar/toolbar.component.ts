import { Component, EventEmitter, OnInit, Output, SimpleChanges } from '@angular/core';
import { ClientsFacade, PositionFacadeService } from '@frontend/core-state';
import { Observable, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AddClientComponent } from './add-client/add-client.component';
import { Client } from '@frontend/api-interface';

@Component({
  selector: 'frontend-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  //allBeneficiariesLookUp$: Observable<BeneficiariesLookUp> = this.beneficiariesFacade.allBeneficiariesLookUp$;
  position$: Observable<string> = this.positionFacadeService.position$;
  benefId$: Observable<number> = this.positionFacadeService.clientId$;
  public version = environment.AppVersion;
  public showVersion = environment.ShowVersion;
  isBeneficiarySelected: boolean;
  public currentUserDecodedToken: string[];

  @Output() createClientEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    private positionFacadeService: PositionFacadeService,
    private clientsfacade: ClientsFacade,
    private router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.positionFacadeService.clientId$.subscribe((benefId) => {
      this.isBeneficiarySelected = benefId !== null;
    });
  }

  add() {
    const client = new Client();
    const dlg = this.dialog.open(AddClientComponent, { data: { client, isNew: true },disableClose: true});
    dlg.beforeClosed().subscribe(res => {
        if (res) {
          console.log(res);
            this.clientsfacade.persist(res);
        }
    });
  }

}
