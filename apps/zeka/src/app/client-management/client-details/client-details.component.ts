import { Component, Inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Client} from '@frontend/api-interface';
import { PositionFacadeService, ClientFacade, NotificationService } from '@frontend/core-state';
import { ClientLanguageBoxComponent } from './client-language-box/client-language-box.component';
import { Console } from 'console';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'frontend-beneficiaries-details',
  templateUrl: './beneficiaries-details.component.html',
  styleUrls: ['./beneficiaries-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {
  @Input() client: ClientDetail;
  @Output() refreshEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private positionFacadeServices: PositionFacadeService,
    private clientFacade: ClientFacade,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private route: Router,
    @Inject("GIPSY_URL") public gipsyUrl: string
  ) {
  }
  ngOnInit(): void {
    this.reset();
  }

  reset() {
    this.positionFacadeServices.getClientId(parseInt(this.client.beneficiaryId));
  }



  // openAssessmentManagment() {
  //   const client = this.client;
  //   const dlg = this.dialog.open(BilanManagementComponent, {
  //     data: { client },
  //     maxWidth: '100vw',
  //     maxHeight: '100vh',
  //     height: '100%',
  //     width: '100%'
  //   });
  // }

  refresh(benefNiss: string) {
    console.log('beneficiaries-details.components -> refresh : ' + benefNiss);
    this.clientFacade.importClient(benefNiss, false);
  }

  goToClientLink(niss: string) {
    return window.open(
      `${this.gipsyUrl}client/${niss}`,
      "_blank"
    );
  }

  checkIfIbisNumberIsConsistent(newNumber : string, oldNumber: string){
    return (newNumber.length > 20) ? oldNumber : newNumber;
  }
}
