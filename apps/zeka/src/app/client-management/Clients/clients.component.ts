import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { first } from 'lodash';
import { ClientsFacade, PositionFacadeService } from '@frontend/core-state';
import { Client } from '@frontend/api-interface';

@Component({
  selector: 'frontend-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  selectedClient$: Observable<Client> = this.clientsFacade.selectedClient$;
  globalId:number;

  constructor(
      private clientsFacade: ClientsFacade,
      private actRoute: ActivatedRoute,
      private positionFacadeServices: PositionFacadeService
    ) { }

  ngOnInit(): void {
    this.refreshClientPage(true);
    this.clientsFacade.mutations$.subscribe((_) => {
      this.clientsFacade.selectClient(this.globalId);
    });
  }


  refreshClientPage(result : boolean){
    if(result){
      this.actRoute.paramMap.subscribe(params => {
        let id = '';
        id = params.get('id');
        this.globalId = parseInt(id);
        this.clientsFacade.selectClient(this.globalId);
        this.positionFacadeServices.getPosition(id);
      });
    }
  }
}
