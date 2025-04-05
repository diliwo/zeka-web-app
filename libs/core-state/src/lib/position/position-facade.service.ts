import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PositionFacadeService {
  private position = new Subject<string>();
  private clientId = new Subject<number>();

  position$ = this.position.asObservable();
  clientId$ = this.clientId.asObservable();

  constructor() { }

  getPosition(pos: string){
    setTimeout(() => {
      this.position.next(pos);
    }, 0);
  }

  getClientId(id:number){
    setTimeout(() => {
      this.clientId.next(id);
    }, 0);
  }
}
