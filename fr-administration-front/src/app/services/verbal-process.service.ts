import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { VerbalProcess } from '../dto/VerbalProcess';
import { ApiHelperService } from './api-helper.service';

@Injectable({
  providedIn: 'root'
})
export class VerbalProcessService {

  constructor(private apiHelper : ApiHelperService) { }

  deleteVerbalProcessesOfAssociation(associationName : String){
    const endpointGet = "/verbal-processes/" + associationName
    from(this.apiHelper.get({endpoint : endpointGet}))
    .pipe(
      map(x => <VerbalProcess[]> x),
    
      map(
      array => {
        array.forEach(element => {
          this.apiHelper.delete({endpoint :"/verbal-processes/" + element.id})
        });
      }
      )
    )
  }

  public creationVerbalProcess(idVoters : number[], content : String, date : String) : Observable<VerbalProcess>{
    const endpoint = "/verbal-processes";
    return from(this.apiHelper.post({endpoint, data : {idVoters : idVoters, content : content, date : date}})).pipe(
      map(object => <VerbalProcess> object)
    )
  }
}
