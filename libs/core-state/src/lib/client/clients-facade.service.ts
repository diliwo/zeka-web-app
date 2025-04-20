import { Injectable } from '@angular/core';
import { ClientService } from '@frontend/core-data';
import { ClientsLookUp, Client, ClientLookUp, MessageType } from '@frontend/api-interface';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { first, take } from 'rxjs/operators';
import { NotificationService } from '../notification/notification.service';
import { MatTableState } from '@frontend/material';

@Injectable({
  providedIn: 'root'
})
export class ClientsFacade {
  private allClientsLookUp = new Subject<ClientsLookUp>();
  private selectedClient = new Subject<Client>();
  private mutations = new Subject();
  private created = new Subject();
  private newClientId = new Subject<number>();
  private spinner = new Subject();
  public beneficiaryState = new MatTableState('name', 'asc', 5);

  allClientsLookUp$ = this.allClientsLookUp.asObservable();
  selectedClient$ = this.selectedClient.asObservable();
  mutations$ = this.mutations.asObservable().pipe(take(1));
  created$ = this.created.asObservable();
  newClientId$ = this.newClientId.asObservable();
  spinner$ = this.spinner.asObservable();

  constructor(
    private clientService: ClientService,
    private notificationService: NotificationService
    ) { }
  reset() {
    this.mutations.next(true);
  }

clientsFounded(){
  this.spinner.next(true);
}

  notifyCreaction(){
    this.created.next(true);
  }

  getNewClientId(id: number){
    this.newClientId.next(id);
  }
  loadClients(){
    this.clientService
    .allClientsLookUp()
    .subscribe((beneficiariesLookUp: ClientsLookUp) =>
      this.allClientsLookUp.next(beneficiariesLookUp)
    );
  }

  selectClient(clientid: number) {
    let idApi : number = null;
    idApi = clientid;
    this.clientService.getclientByClientId(idApi).subscribe((client : Client) =>
      this.selectedClient.next(client)
    );
  }

  getClientBySearch(text:string){
    this.clientService.getClientBySearch(text).subscribe(
      (beneficiariesLookUp:ClientsLookUp) =>{
        console.log(beneficiariesLookUp);
        if (beneficiariesLookUp !== undefined && beneficiariesLookUp !== null) {
          this.allClientsLookUp.next(beneficiariesLookUp)
          this.clientsFounded();
        } else {
          const msg = 'Client not found !';
          this.notificationService.emitMessage({ Type: 'ERROR', Text: msg });
        }
      },
    );
  }

  persist(partner : Client){
    this.clientService.create(partner).subscribe((_) => {
      this.reset()
      this.notificationService.showMessage(
        'Client successfully added !',
        MessageType.Information
      );
    },
    (error) => {
      this.notificationService.showServerErrorNotification(error);
      this.reset()
    });
  }

  updateNativeLanguage(data : any){
    this.clientService.updateLanguage(data.niss, data.nativeLanguage).subscribe(
      (_) => {
        this.reset()
        this.notificationService.showMessage(
          'Native Language updated !',
          MessageType.Information
        );
      },
      (error) => {
        this.notificationService.showServerErrorNotification(error);
      }
      );
  }

  detroy(){
   this.mutations.unsubscribe();
  }
}
