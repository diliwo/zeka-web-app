import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { ClientLookUp } from "@frontend/api-interface";
import { ClientService } from "@frontend/core-data";
import { BehaviorSubject, Observable } from "rxjs";

export class BeneficiaryDataSource implements DataSource<ClientLookUp> {

  private ClientsSubject = new BehaviorSubject<ClientLookUp[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private nbrOfClients = new BehaviorSubject<number>(0);

  public loading$ = this.loadingSubject.asObservable();
  public nbrOfClients$ = this.nbrOfClients.asObservable();

  constructor(private clientsService: ClientService) {}

  connect(collectionViewer: CollectionViewer): Observable<ClientLookUp[] | readonly ClientLookUp[]> {
    return this.ClientsSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.ClientsSubject.complete();
    //this.loadingSubject.complete();
  }
}
