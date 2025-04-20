import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Cities, Nationality } from "@frontend/api-interface";
import { CitiesService } from "@frontend/core-data";
import { BehaviorSubject, Observable } from "rxjs";

export class NationalityDataSource implements DataSource<Nationality> {

  private citiesSubject = new BehaviorSubject<Nationality[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private numberOfCities = new BehaviorSubject<number>(0);

  public loading$ = this.loadingSubject.asObservable();
  public nbrOftrainings$ = this.numberOfCities.asObservable();

  constructor(private citiesService: CitiesService) {}

  connect(collectionViewer: CollectionViewer): Observable<Nationality[] | readonly Nationality[]> {
    return this.citiesSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.citiesSubject.complete();
    //this.loadingSubject.complete();
  }

  load(pageNumber: number = 1, pageSize: number = 3, filter:string= '', orderby:string=''){
    this.citiesService.getAll(pageNumber, pageSize, filter,orderby).subscribe(
      (cities :Cities) =>{
        console.log(cities);
        if (cities !== undefined && cities !== null) {
          this.citiesSubject.next(cities.items)
          this.numberOfCities.next(cities.totalCount);
        }
      },
    );
  }

}
