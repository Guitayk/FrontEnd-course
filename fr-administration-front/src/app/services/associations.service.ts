import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { Association } from '../dto/Association';
import { AssociationForm } from '../dto/AssociationForm';
import { Membre } from '../dto/Membre';
import { User } from '../dto/User';
import { VerbalProcess } from '../dto/VerbalProcess';
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

  public createAssociation(name : String, idUsers : number[], roles : String[], associationFormId : number, verbalProcessId : number){
    const endpoint = "/associations";
    return from(this.apiHelper.post({endpoint, data : {name: name, idUsers: idUsers, roles: roles, associationFormId: associationFormId, verbalProcessId: verbalProcessId}})).pipe(
      map(object => {
        return <Association> object;
      })
    )
  }

  public createAssociationForm(): Observable<AssociationForm>{
    const endpoint = "/association-forms";
    return from(this.apiHelper.post({endpoint})).pipe(
      map(object => {
        return <AssociationForm> object;
      })
    )
  }

  public validationLegalService(form : AssociationForm):Observable<AssociationForm>{
    const endpoint = "/legal-service/validate";
    return from(this.apiHelper.put({endpoint, data : {associationFormId : form.id}})).pipe(
      map(object => <AssociationForm> object)
    )
  }

  public validationFinancialService(form : AssociationForm):Observable<AssociationForm>{
    const endpoint = "/financial-service/validate";
    return from(this.apiHelper.put({endpoint, data : {associationFormId : form.id}})).pipe(
      map(object => <AssociationForm> object)
    )
  }

  public creationVerbalProcess(idVoters : number[], content : String, date : String) : Observable<VerbalProcess>{
    const endpoint = "/verbal-processes";
    return from(this.apiHelper.post({endpoint, data : {idVoters : idVoters, content : content, date : date}})).pipe(
      map(object => <VerbalProcess> object)
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

  public getAssociationMembers(associationName : string) : Observable<Membre[]>{
    const endpoint = "/associations/" + associationName + "/members";
    return from(this.apiHelper.get({endpoint})).pipe(
      map(object=>{
        return <Membre[]> object;
      })
    )
  }

  private associationInCriteria(association : Association, criteria?: AssociationCriteria) : boolean{
    if(!criteria) return true;

    if(criteria.name){
      if(!association.name.includes(criteria.name)) return false;
    }

    if(criteria.creationDate){
      if(criteria.creationDate != association.dateOfCreation) return false;
    }

    return true;
  }
}
