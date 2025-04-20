import { Injectable } from '@angular/core';
import { NationalitiesService } from '@frontend/core-data';
import { Subject } from 'rxjs';
import { NotificationService } from '../notification/notification.service';
import { Nationalities, Nationality, MessageType } from '@frontend/api-interface';

@Injectable({
  providedIn: 'root'
})
export class NationalitiesFacadeService {
  private nationalities = new Subject<Nationalities>();
  private mutations = new Subject();

  nationalities$ = this.nationalities.asObservable();
  mutations$ = this.mutations.asObservable();

  constructor(
    private nationalitiesService : NationalitiesService,
    private notificationService: NotificationService
  ) {}

  reset() {
    this.mutations.next(true);
  }

  load(pageNumber: number, pageSize: number, filter:string, orderby:string){
    this.nationalitiesService.getAll(pageNumber, pageSize, filter, orderby).subscribe(
      (citiesListVm: Nationalities) =>{
        console.log(citiesListVm);
        if (citiesListVm !== undefined && citiesListVm !== null) {
          this.nationalities.next(citiesListVm)
        }
      },
    );
  }

  persist(nationality : Nationality){
    if(nationality.id != null){
      this.nationalitiesService.update(nationality).subscribe((_) =>
      {
        console.log(nationality.id);
        this.reset()
        this.notificationService.showMessage(
          'nationality updated !',
          MessageType.Information
        );
      });
    } else {
      this.nationalitiesService.insert(nationality).subscribe((_) =>
      {
        console.log(nationality.id);
        this.reset()
        this.notificationService.showMessage(
          'nationality added !',
          MessageType.Information
        );
      });
    }
  }

  delete(id : number){
    this.nationalitiesService.delete(id).subscribe(
      (_) => {
        this.reset()
      },
      (error) => {
        this.notificationService.showServerErrorNotification(error);
        this.reset()
      });
  }
}
