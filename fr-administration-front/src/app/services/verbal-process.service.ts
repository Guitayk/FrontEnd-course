import { Injectable } from '@angular/core';
import { forkJoin, from, map, Observable, of, switchMap, tap, timer } from 'rxjs';
import { VerbalProcess } from '../dto/VerbalProcess';
import { ApiHelperService } from './api-helper.service';

@Injectable({
  providedIn: 'root'
})
export class VerbalProcessService {

  constructor(private apiHelper : ApiHelperService) { }

  deleteVerbalProcessesOfAssociation(associationName : String){
    
    const endpointGet = "/verbal-processes/" + associationName
    return from(this.apiHelper.get({endpoint : endpointGet}))
    .pipe(
      map(
      array => {
        const vp = <VerbalProcess[]> array
        var observables : Observable<any>[] = []
        vp.forEach(element => {
          observables.push(from(this.apiHelper.delete({endpoint :"/verbal-processes/" + element.id})))
        });
        observables.push(of(0))
        return observables
      }),
      switchMap(observables => {
        return forkJoin(observables)})
    )
  }

  public creationVerbalProcess(idVoters : number[], content : String, date : String) : Observable<VerbalProcess>{
    const endpoint = "/verbal-processes";
    return from(this.apiHelper.post({endpoint, data : {idVoters : idVoters, content : content, date : date}})).pipe(
      map(object => <VerbalProcess> object)
    )
  }
}
