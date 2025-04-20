import { Component, EventEmitter, OnInit, Output, SimpleChanges } from '@angular/core';
import { CitiesFacadeService, ClientsFacade, NationalitiesFacadeService, PositionFacadeService } from '@frontend/core-state';
import { Observable, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AddClientComponent } from './add-client/add-client.component';
import { Cities, City, Client, Nationality } from '@frontend/api-interface';

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

  cities: City[] = [];
  nationalities: Nationality[] = [];

  @Output() createClientEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    private positionFacadeService: PositionFacadeService,
    private clientsfacade: ClientsFacade,
    private nationalitiesFacadeService: NationalitiesFacadeService,
    private citiesFacadeService: CitiesFacadeService,
    private router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.positionFacadeService.clientId$.subscribe((benefId) => {
      this.isBeneficiarySelected = benefId !== null;
    });
    this.loadCities();
    this.loadNationalities();
  }

  add() {
    const client = new Client();
    const dlg = this.dialog.open(AddClientComponent, { data: { client, nationalities: this.nationalities, cities: this.cities, isNew: true },disableClose: true});
    dlg.beforeClosed().subscribe(res => {
        if (res) {
          console.log(res);
            this.clientsfacade.persist(res);
        }
    });
  }

  loadCities(){
    this.cities = null;
    this.citiesFacadeService.load(1,1000,'','name asc');
    this.citiesFacadeService.cities$.subscribe((data) => {
      this.cities = data.items;
    });
  }

  loadNationalities(){
    this.nationalities = null;
    this.nationalitiesFacadeService.load(1,1000,'','name asc');
    this.nationalitiesFacadeService.nationalities$.subscribe((data) => {
      this.nationalities = data.items;
    });
  }
}
