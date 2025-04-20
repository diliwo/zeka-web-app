import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Cities, City } from "@frontend/api-interface";
import { CitiesService } from "@frontend/core-data";
import { BehaviorSubject, Observable } from "rxjs";

export class CityDataSource implements DataSource<City> {

  private citiesSubject = new BehaviorSubject<City[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private numberOfCities = new BehaviorSubject<number>(0);

  public loading$ = this.loadingSubject.asObservable();
  public nbrOftrainings$ = this.numberOfCities.asObservable();

  constructor(private citiesService: CitiesService) {}

  connect(collectionViewer: CollectionViewer): Observable<City[] | readonly City[]> {
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
