import { Injectable } from '@angular/core';
import { CitiesService, TrainingsService } from '@frontend/core-data';
import { Subject } from 'rxjs';
import { NotificationService } from '../notification/notification.service';
import { Cities, City, MessageType } from '@frontend/api-interface';

@Injectable({
  providedIn: 'root'
})
export class CitiesFacadeService {
  private cities = new Subject<Cities>();
  private mutations = new Subject();

  cities$ = this.cities.asObservable();
  mutations$ = this.mutations.asObservable();

  constructor(
    private citiesService : CitiesService,
    private notificationService: NotificationService
  ) {}

  reset() {
    this.mutations.next(true);
  }

  load(pageNumber: number, pageSize: number, filter:string, orderby:string){
    this.citiesService.getAll(pageNumber, pageSize, filter, orderby).subscribe(
      (citiesListVm: Cities) =>{
        console.log(citiesListVm);
        if (citiesListVm !== undefined && citiesListVm !== null) {
          this.cities.next(citiesListVm)
        }
      },
    );
  }

  persist(city : City){
    if(city.id != null){
      this.citiesService.update(city).subscribe((_) =>
      {
        console.log(city.id);
        this.reset()
        this.notificationService.showMessage(
          'city updated !',
          MessageType.Information
        );
      });
    } else {
      this.citiesService.insert(city).subscribe((_) =>
      {
        console.log(city.id);
        this.reset()
        this.notificationService.showMessage(
          'city added !',
          MessageType.Information
        );
      });
    }
  }

  delete(id : number){
    this.citiesService.delete(id).subscribe(
      (_) => {
        this.reset()
      },
      (error) => {
        this.notificationService.showServerErrorNotification(error);
        this.reset()
      });
  }
}
