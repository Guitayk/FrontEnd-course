import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { Association } from '../dto/Association';
import { User } from '../dto/User';
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
      }),
      map(associations => {
        return associations.filter(asso => this.associationInCriteria(asso, associationCriteria))
      })
    )
  }

  public createAssociation(association : Association){
    const endpoint = "/associations";
    return from(this.apiHelper.post({endpoint, data : association})).pipe(
      map(object => {
        return <Association> object;
      })
    )
  }

  public updateAssociation(associationName : string, association : Association) : Observable<Association>{
    const endpoint = "/associations/" + associationName;
    return from(this.apiHelper.put({endpoint, data : association})).pipe(
      map(object => {
        return <Association> object;
      })
    )
  }

  public deleteAssociation(associationName : string) : Observable<void>{
    const endpoint = "/associations/" + associationName;
    return from(this.apiHelper.delete({endpoint}))
  }

  public getAssociationMembers(associationName : string) : Observable<User[]>{
    const endpoint = "/associations/" + associationName + "/members";
    return from(this.apiHelper.get({endpoint})).pipe(
      map(object=>{
        return <User[]> object;
      })
    )
  }

  private associationInCriteria(association : Association, criteria?: AssociationCriteria) : boolean{
    if(!criteria) return true;

    if(criteria.name){
      if(!association.name.includes(criteria.name)) return false;
    }

    if(criteria.creationDate){
      if(criteria.creationDate != association.creationDate) return false;
    }

    return true;
  }
}
