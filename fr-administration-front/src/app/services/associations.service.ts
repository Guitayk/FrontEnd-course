import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { Association } from '../dto/Association';
import { ApiHelperService } from './api-helper.service';
import { AssociationCriteria } from './criteria/AssociationCriteria';

@Injectable({
  providedIn: 'root'
})
export class AssociationsService {

  constructor(private apiHelper : ApiHelperService) { }

  public getAssociationByName(associationName : string) : Observable<Association>{
    const endpoint = "/associations/" + associationName;
    return from(this.apiHelper.get({endpoint})).pipe(
      map(object =>{
        return <Association> object;
      })
    )
  }

  public searchAssociations(associationCriteria? : AssociationCriteria) : Observable<Association[]>{
    const endpoint = "/associations";
    return from(this.apiHelper.get({endpoint})).pipe(
      map(object =>{
        return <Association[]> object;
      })
    )
  }
}
