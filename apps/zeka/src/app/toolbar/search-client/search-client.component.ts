import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger, MatAutocomplete } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ClientLookUp, ClientsLookUp } from '@frontend/api-interface';
import { ClientsFacade, NotificationService } from '@frontend/core-state';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'frontend-search-client',
  templateUrl: './search-client.component.html',
  styleUrls: ['./search-client.component.scss']
})
export class SearchClientComponent implements OnInit {
  @Input() clients: any[] = [];
  allClientsLookUp$: Observable<ClientsLookUp> = this.clientsFacade.allClientsLookUp$;
  myControl = new FormControl();
  filteredOptions: Observable<ClientLookUp[]>;
  options : ClientLookUp[];
  component:string;
  public clientLoading = false;

  constructor(
    private clientsFacade : ClientsFacade,
    private router: Router,
    public dialog: MatDialog,
    public notificationService: NotificationService,
    public snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.clientsFacade.spinner$.subscribe((_) => {
      this.stopSpinner();
    });

    this.myControl.valueChanges
     .pipe (
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        filter ((value) => value.length > 2)
     ).subscribe((value) => {
       console.log(value);
       this.clientLoading = true;
      this.clientsFacade.getClientBySearch(value);
     });
  }

  displayFn(client: ClientLookUp): string {
    return client && client.clientId ? client.clientId : '';
  }

  stopSpinner(){
    this.clientLoading = false;
  }

  onSelectClient() {
    this.router.navigate(['/client',this.myControl.value.clientId]);
    this.myControl.setValue('');
  }
}
